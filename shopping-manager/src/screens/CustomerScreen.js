import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Image,
  StyleSheet,
  FlatList,
  View,
  StatusBar,
  ActivityIndicator,
  Text,
  RefreshControl,
  TextInput, Dimensions, TouchableWithoutFeedback, Keyboard,
  useWindowDimensions
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '../components/icons/LightIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



import ProductItem from '../components/shop/ProductItem';
import { Colors } from '../constants/Colors';
import { NO_PRODUCTS, REQUEST_NETWORK_ERROR } from '../context/product/types';
import ErrorScreen from '../components/shop/ErrorScreen';
import { Context as AuthContext } from '../context/auth/AuthContext';

const primaryColor = `rgb(${Colors.primary})`;
const textSecondaryColor = `rgba(${Colors.text.secondary}, 0.7)`;
const CartIcons = () => <Icon name="cart-o" color="white" size={20} />;
import CartIcon from '../components/shop/CartIconComponent';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';


const textPrimaryColor = `rgb(${Colors.text.primary})`;
const width = Dimensions.get('window').width
import firestore from '@react-native-firebase/firestore';


const CustomerScreen = ({ props, navigation }) => {
  // const {navigation} = props;
  const [isLoading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isShowSearch, setShowSearch] = useState(false);
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')
  const widthScreen = useWindowDimensions().width
  const [width, setWidth] = useState(widthScreen)

  const loadData = async () => {
  };

  const onSearch = () => {
    setLoading(true)
    firestore()
      .collection('customer')
      .get()
      .then(res => {
        const temp = []
        res.forEach(doc => {
          if (doc.data().name.toUpperCase().indexOf(search.toUpperCase()) > -1) temp.push(doc.data())
        })
        setData(temp)
        setLoading(false)
      }).catch(err => {
        setLoading(false)
        setData([])
      })
  }
  const error = ''
  useEffect(() => {
    setLoading(true);
    const unsubscribe = firestore()
      .collection('customer')
      .orderBy('name', 'asc')
      .onSnapshot(onResult => {
        const temp = []
        onResult.forEach(doc => {
          temp.push(doc.data())
        })
        setLoading(false)
        setData(temp)
        setLoading(false)
      })

    return () => {
      unsubscribe()
    }

  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadData);
    setWidth(widthScreen)
    return unsubscribe;
  }, [widthScreen]);



  const refreshControl = useCallback(() => {
    return (
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={async () => {
          setIsRefreshing(true);
          await loadData();
          setIsRefreshing(false);
        }}
        tintColor={primaryColor}
        colors={[primaryColor]}
      />
    );
  }, []);
  const onPressIconSearch = () => {
    setShowSearch(true)
  }

  if (isLoading) {
    return (
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss; setShowSearch(false) }} accessible={false}>
          <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={{ ...styles.header, }}>
              {isShowSearch ?
                <TextInput autoFocus={true} returnKeyType='search' style={{ ...styles.inputSearch, width: width - 22 * 2 - 26 - 50, }} placeholderTextColor='gray' placeholder='Tìm kiếm' onChangeText={text => setSearch(text)} onSubmitEditing={onSearch} />
                : <Text style={styles.titleHeader}>Khách hàng</Text>}
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                {isShowSearch ?
                  null
                  : <TouchableOpacity onPress={onPressIconSearch}>
                    <FontAwesome name="search" color="black" size={26} />
                  </TouchableOpacity>}
              </View>
            </View>
            <View style={styles.centered}>
              <ActivityIndicator size='large' color={primaryColor} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
  const Item = ({ customer, index }) => {
    return (
      <View style={styles.row}>
        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
          <View style={{ width: 50, height: 50, borderRadius: 13, justifyContent: 'center', alignItems: 'center', marginRight: 5 }}>
            <Image source={{ uri: customer.urlAvt }} resizeMode='cover' style={{  width: 46,height: 46, borderRadius: 23, }} />
          </View>
          <View style={styles.customer}>
            <Text style={{ ...styles.name, fontWeight: 'bold' }}>{customer?.name}</Text>
            <Text style={styles.name}>{customer?.email}</Text>
            <Text style={styles.name} numberOfLines={1}>{customer?.phone}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("EditCustomer", customer)} style={{marginLeft:5}}>
          <FontAwesome color={primaryColor} name="edit" size={26} />
        </TouchableOpacity>
      </View>
    )
  }
  if (data.length == 0) {
    return (
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss; setShowSearch(false) }} accessible={false}>
          <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={{ ...styles.header, }}>
              {isShowSearch ?
                <TextInput autoFocus={true} returnKeyType='search' style={{ ...styles.inputSearch, width: width - 22 * 2 - 26 - 50, }} placeholderTextColor='gray' placeholder='Tìm kiếm' onChangeText={text => setSearch(text)} onSubmitEditing={onSearch} />
                : <Text style={styles.titleHeader}>Khách hàng</Text>}
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                {isShowSearch ?
                  null
                  : <TouchableOpacity onPress={onPressIconSearch}>
                    <FontAwesome name="search" color="black" size={26} />
                  </TouchableOpacity>}
              </View>
            </View>
            <View style={styles.centered}>
              <MaterialCommunityIcons
                name="emoticon-sad-outline"
                size={26}
                color={`rgba(${Colors.text.secondary}, 0.6)`}
              />
              <Text style={styles.errorMessage}>Chưa có khách hàng</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }

  // if (error.type === REQUEST_NETWORK_ERROR && !products.length) {
  //   return <ErrorScreen errorMessage={error.message} onRetry={loadData} />;
  // }




  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss; setShowSearch(false) }} accessible={false}>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <View style={{ ...styles.header, }}>
            {isShowSearch ?
              <TextInput autoFocus={true} returnKeyType='search' style={{ ...styles.inputSearch, width: width - 22 * 2 - 26 - 50, }} placeholderTextColor='gray' placeholder='Tìm kiếm' onChangeText={text => setSearch(text)} onSubmitEditing={onSearch} />
              : <Text style={styles.titleHeader}>Khách hàng</Text>}
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

              {isShowSearch ?
                null
                : <TouchableOpacity onPress={onPressIconSearch}>
                  <FontAwesome name="search" color="black" size={26} />
                </TouchableOpacity>}
            </View>
          </View>
          <ScrollView style={{ marginTop: 15 }} showsVerticalScrollIndicator={false} scrollEnabled={true}>
            {data.map((item, index) => <Item customer={item} key={index} index={index + 1} />)}
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>

    </SafeAreaView>

  );
};

export default CustomerScreen;

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  header: {
    marginHorizontal: 22,
    marginTop: 20,
    marginVertical: 5,
    // borderLeftWidth: 0,
    // borderLeftColor: primaryColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black'
  },
  inputSearch: {
    // width: width - 22 * 2,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    paddingVertical: 0,
    color:'black'
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMessage: {
    fontFamily: 'Lato-Bold',
    color: textSecondaryColor,
    fontSize: 16,
    marginTop: 8,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#dcdcdc',
    borderWidth: 1,
    justifyContent: 'space-between',
    marginHorizontal: 22,
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: '#eaeded',
    borderRadius: 12,
    marginBottom: 10
  },
  name: {
    color: `rgb(${Colors.text.secondary})`,
    fontSize: 15,
  },
  item: {
    flexDirection: 'column',
  },
  icon: {
    height: 28,
  },
});
