import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect, useDispatch } from 'react-redux'
import SplashScreen from 'react-native-splash-screen'
const DeleteIcon = () => <Icon name="trash-o" size={20} color="white" />;
import ProductItem from '../components/shop/ProductItem';
import { Colors } from '../constants/Colors';
const primaryColor = `rgb(${Colors.primary})`;
const textSecondaryColor = `rgba(${Colors.text.secondary}, 0.7)`;
import { TouchableOpacity } from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native"


const textPrimaryColor = `rgb(${Colors.text.primary})`;
const width = Dimensions.get('window').width
import PlusIcon from '../components/icons/PlusIcon';

const ProductsScreen = ({ auth }) => {
  const navigation = useNavigation()
  const [isLoading, setLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isShowSearch, setShowSearch] = useState(false);
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')

  const favoritesLoaded = useRef(false);
  const [limit, setLimit] = useState(50)
  const widthScreen = useWindowDimensions().width
  const [width, setWidth] = useState(widthScreen) 

  const onSearch = () => {
    setLoading(true)
    firestore()
      .collection('products')
      .get()
      .then(res => {
        const temp = []
        res.forEach(doc => {
          if (doc.data().title.toUpperCase().indexOf(search.toUpperCase()) > -1) temp.push(doc.data())
        })
        setData(temp)
        setLoading(false)
      }).catch(err => {
        setLoading(false)
        setData([])
      })
  }

  const loadData = () => {
    setLoading(true);
    const unsubcrible = firestore()
      .collection('products')
      .limit(limit)
      .orderBy('createdAt', 'desc')
      .onSnapshot(querySnapshot => {
        const temp = []
        querySnapshot.forEach(doc => {
          temp.push(doc.data())
        })
        setData(temp)
        setLoading(false)
      })
    return unsubcrible;
  };
  const dispatch = useDispatch()
  useEffect(() => {
    SplashScreen.hide();
    setWidth(widthScreen)
    const unsubcrible = loadData();
    return ()=>{
      unsubcrible;
    }
  }, [limit,widthScreen]);

  const renderItem = useCallback(
    ({ item }) => (
      <ProductItem
        product={item}
        navigationRoute="EditProduct"
        ActionIcon={DeleteIcon}
        actionTitle="Xóa sản phẩm"
      />
    ),
    [],
  );
  const goToCreateProduct = () => {
    navigation.navigate('CreateProduct')
  }

  const refreshControl = useCallback(() => {
    return (
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={async () => {
          // setIsRefreshing(true);
          setLimit(v => v + 50)
          // await loadData();
          setIsRefreshing(false);
        }}
        tintColor={primaryColor}
        colors={[primaryColor]}
      />
    );
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={() => { setShowSearch(false) }} accessible={false}>
          <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={{ ...styles.header, }}>
              {isShowSearch ?
                <TextInput autoFocus={true} style={{...styles.inputSearch,width: width - 22 * 2 - 26 - 50,}}onChangeText={text => setSearch(text)} onSubmitEditing={onSearch} />
                : <Text style={styles.titleHeader}>Sản phẩm</Text>}
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                {isShowSearch ?
                  null
                  : <TouchableOpacity onPress={onPressIconSearch} style={{ marginRight: 10 }}>
                    <FontAwesome name="search" color="black" size={26} />
                  </TouchableOpacity>}

                <TouchableOpacity onPress={goToCreateProduct}>
                  <PlusIcon height={42} width={42} weight={2} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.centered}>
              <ActivityIndicator size="large" color={primaryColor} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }

  const onPressIconSearch = () => {
    setShowSearch(true)
  }


  if (data.length == 0) {
    return (
      <SafeAreaView>
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss; setShowSearch(false) }} accessible={false}>
          <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={{ ...styles.header, }}>
              {isShowSearch ?
                <TextInput returnKeyType='search' autoFocus={true} style={{...styles.inputSearch,width: width - 22 * 2 - 26 - 50,}} placeholder='Tìm kiếm' placeholderTextColor='gray' value={search} onChangeText={text => setSearch(text)} onSubmitEditing={onSearch} />
                : <Text style={styles.titleHeader}>Sản phẩm</Text>}
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

                {isShowSearch ?
                  null
                  : <TouchableOpacity onPress={onPressIconSearch} style={{ marginRight: 10 }}>
                    <FontAwesome name="search" color="black" size={26} />
                  </TouchableOpacity>}

                <TouchableOpacity onPress={goToCreateProduct}>
                  <PlusIcon height={42} width={42} weight={2} />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.centered}>
              <MaterialCommunityIcons
                name="emoticon-sad-outline"
                size={26}
                color={`rgba(${Colors.text.secondary}, 0.6)`}
              />
              <Text style={styles.errorMessage}>Không có sản phẩm</Text>
              <TouchableOpacity style={{ width: 60, marginTop: 15 }} onPress={loadData}>
                <Text style={{ color: `rgba(${Colors.text.secondary}, 0.6)`, textAlign: 'center', fontSize: 20, fontWeight: 'bold' }}>Tải lại</Text>
              </TouchableOpacity>
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
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss; setShowSearch(false) }} accessible={false}>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <View style={{ ...styles.header, }}>
            {isShowSearch ?
              <TextInput returnKeyType='search' autoFocus={true} style={{...styles.inputSearch,width: width - 22 * 2 - 26 - 50,}} placeholder='Tìm kiếm' placeholderTextColor='gray' value={search} onChangeText={text => setSearch(text)} onSubmitEditing={onSearch} />
              : <Text style={styles.titleHeader}>Sản phẩm</Text>}
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>

              {isShowSearch ?
                null
                : <TouchableOpacity onPress={onPressIconSearch} style={{ marginRight: 10 }}>
                  <FontAwesome name="search" color="black" size={26} />
                </TouchableOpacity>}

              <TouchableOpacity onPress={goToCreateProduct}>
                <PlusIcon height={42} width={42} weight={2} />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            numColumns={2}
            // centerContent = {true}
            columnWrapperStyle={{ justifyContent: 'flex-start' }}
            refreshControl={refreshControl()}
            data={data}
            contentContainerStyle={styles.list}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </TouchableWithoutFeedback>

    </SafeAreaView>

  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(ProductsScreen);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginTop: StatusBar.length,
    height: '100%'
  },
  header: {
    marginHorizontal: 22,
    marginTop: 20,
    marginVertical: 5,
    // borderLeftWidth: 0,
    paddingLeft: 10,
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
    // width: width - 22 * 2 - 26 - 50,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    paddingVertical: 0,
    paddingTop: 5,
    color: 'black',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 100,
  },
  errorMessage: {
    fontFamily: 'Lato-Bold',
    color: textSecondaryColor,
    fontSize: 16,
    marginTop: 10,
  },
  list: {

  },
});
