import React, { useEffect, useRef, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { View, StyleSheet, FlatList, ScrollView, Image, ActivityIndicator, Text, Dimensions, TextInput, SafeAreaView, RefreshControl, useWindowDimensions } from 'react-native';

import { goBack } from '../uitls/naviation'
import { useNavigation } from "@react-navigation/native"

import { TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import LeftIcon from '../components/icons/LeftIcon';
import { Colors } from '../constants/Colors';
import { hideTabbar, showTabbar } from '../redux/common/action';
const textPrimaryColor = `rgb(${Colors.text.primary})`;
const primaryColor = `rgb(${Colors.primary})`;

import firestore from '@react-native-firebase/firestore';
import { sendMessage } from '../redux/message/services'

function MessageScreen(props) {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const { auth, route } = props
  const [messageData, setMessageData] = useState([])
  const [message, setMessage] = useState('')
  const scrollViewRef = useRef();
  const [loading, setLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [limit, setLimit] = useState(10)
  const widthScreen = useWindowDimensions().width
  const [width, setWidth] = useState(widthScreen)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(hideTabbar())
    });

    const unsubscribe2 = navigation.addListener('blur', () => {
      dispatch(showTabbar())
    });
    function fetchMyAPI() {
      // get message


      return subscriber;
    }
    const subscriber = firestore()
      .collection('messages')
      .doc(route.params.partnerMessageKey)
      .collection('messages')
      .limit(limit)
      .orderBy('createdAt', 'desc')
      .onSnapshot(onResult => {
        const temp = []
        onResult.forEach(documentSnapshot => {
          temp.push(documentSnapshot.data())
        });
        setMessageData(temp.reverse())
        setLoading(false)
      }, err => err);
    // const subscriber = fetchMyAPI()
    setWidth(widthScreen)

    return () => {
      subscriber();
      unsubscribe();
      unsubscribe2();
    };
  }, [navigation, auth.user.id, limit, widthScreen]);


  const send = () => {
    if (message) {
      sendMessage(route.params.partnerMessageKey,
        {
          message: message,
          ownerId: auth.user.id
        }
      )
      firestore()
        .collection('listchats')
        .doc(auth.user.id)
        .collection('listchats')
        .doc(route.params.id)
        .set({
          newMessage: message,
          ownerIdMessage: auth.user.id,
          partnerMessageKey: route.params.partnerMessageKey,
          createdAt: firestore.Timestamp.now(),
          name: auth.user.name,
          urlAvt: auth.user.urlAvt
        })
      firestore()
        .collection('listchats')
        .doc(route.params.id)
        .collection('listchats')
        .doc(auth.user.id)
        .set({
          newMessage: message,
          ownerIdMessage: auth.user.id,
          partnerMessageKey: route.params.partnerMessageKey,
          createdAt: firestore.Timestamp.now(),
          name: auth.user.name,
          urlAvt: auth.user.urlAvt
        })
      setMessage('')
    }

  }

  const on = (t) => {
    setMessage(t)
  }

  if (loading) return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        {/* <Text style={styles.titleHeader}>Chats</Text> */}
      </View>

      <View style={styles.containerFull}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => goBack()}
          >
            <LeftIcon
              height={42}
              width={42}
              weight={1.3}
              color={textPrimaryColor}
            />
          </TouchableOpacity>
          <UserChat item={route.params} />
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size='small' color={primaryColor} />
        </View>
      </View>
      <View style={styles.viewInput}>
        <SimpleLineIcons type='simple-line-icon' name='emotsmile' size={20} color="#828282" onPress={() => { }} />
        <TextInput style={{ width: width - 140 - 18 * 2, marginLeft: 10 }} placeholder="Nhập tin nhắn..." placeholderTextColor="#A2A2A2" onChangeText={on} value={message} returnKeyType="next" />
        <View style={{ marginLeft: 10 }}><Feather type='feather' name='camera' size={20} color="#828282" onPress={() => { }} /></View>
        <View style={{ marginLeft: 10 }}><Entypo type='entypo' name='attachment' size={20} color="#828282" onPress={() => { }} /></View>
        <TouchableOpacity activeOpacity={0.5} onPress={send} style={{ marginLeft: 10, padding: 10, borderRadius: 20 }}><FontAwesome type='font-awesome' name='send' size={20} color={`rgba(${Colors.primary},0.6)`} /></TouchableOpacity>
      </View>
    </SafeAreaView >

  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        {/* <Text style={styles.titleHeader}>Chats</Text> */}
      </View>

      <View style={styles.containerFull}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => goBack()}
          >
            <LeftIcon
              height={42}
              width={42}
              weight={1.3}
              color={textPrimaryColor}
            />
          </TouchableOpacity>
          <UserChat item={route.params} />
        </View>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={isRefreshing}
                onRefresh={() => {
                  setLimit(pre => pre + 30)
                }}
                tintColor={primaryColor}
                colors={[primaryColor]}
              />
            }
            snapToEnd={true}
            scrollsToTop={false}
            ref={scrollViewRef}
            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}
          >

            {messageData.map((item, index) =>
              item.ownerId == auth.user.id ? <ItemRight item={item} key={index} /> : <ItemLeft item={item} key={index} userChat={route.params} />)}

          </ScrollView>
        </View>
      </View>
      <View style={styles.viewInput}>
        <SimpleLineIcons type='simple-line-icon' name='emotsmile' size={20} color={`rgba(${Colors.primary},0.9)`} onPress={() => { }} />
        <TextInput style={{ width: width - 140 - 18 * 2, marginLeft: 10, color: 'black' }} placeholder="Nhập tin nhắn..." placeholderTextColor="#A2A2A2" onChangeText={on} value={message} returnKeyType="next" />
        <View style={{ marginLeft: 10 }}><Feather type='feather' name='camera' size={20} color={`rgba(${Colors.primary},0.9)`} onPress={() => { }} /></View>
        <View style={{ marginLeft: 10 }}><Entypo type='entypo' name='attachment' size={20} color={`rgba(${Colors.primary},0.9)`} onPress={() => { }} /></View>
        <TouchableOpacity activeOpacity={0.5} onPress={send} style={{ marginLeft: 10, padding: 10, borderRadius: 20 }}><FontAwesome type='font-awesome' name='send' size={20} color={`rgba(${Colors.primary},0.9)`} /></TouchableOpacity>
      </View>
    </SafeAreaView >

  );
};
const ItemLeft = ({ item, userChat }) => {
  const time = new Date(item.createdAt.seconds * 1000)
  return (
    <View style={styles.item}>
      <Image
        source={{ uri: userChat.urlAvt }}
        style={styles.avatar}
      />
      <View style={{ flex: 1 }}>
        {/* <Text style={styles.name}></Text> */}
        <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
          <Text style={{ ...styles.message }}>{item?.message}</Text>
        </View>
        <View style={styles.viewTime}>
          <Text style={styles.time}>{time.getDate()}-{time.getMonth() + 1}-{time.getFullYear()} {time.getHours() > 9 ? time.getHours() : ('0' + time.getHours())}:{time.getMinutes() > 9 ? time.getMinutes() : ('0' + time.getMinutes())}</Text>
        </View>
      </View>

    </View>
  );
}

const ItemRight = ({ item }) => {
  const time = new Date(item.createdAt.seconds * 1000)

  return (
    <View style={styles.itemRight}>
      <View >
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <Text style={{
            ...styles.message,
            borderBottomRightRadius: 0, borderTopLeftRadius: 15, backgroundColor: `rgba(${Colors.primary},0.9)`, color: 'white'
          }}
          >{item?.message}</Text>
        </View>
        <Text style={styles.time}>{time.getDate()}-{time.getMonth() + 1}-{time.getFullYear()} {time.getHours() > 9 ? time.getHours() : ('0' + time.getHours())}:{time.getMinutes() > 9 ? time.getMinutes() : ('0' + time.getMinutes())}</Text>
      </View>
    </View>
  );
}


const UserChat = ({ item }) => {
  return (
    <View style={styles.center}>
      <Image
        source={{ uri: item.urlAvt }}
        style={styles.avatar}
      />
      <View>
        <Text style={styles.nameTittle}>{item.name}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.isOnline}>Online</Text>
        </View>
      </View>
    </View>
  )
}



const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(MessageScreen);

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
  header: {
    marginHorizontal: 22,
    marginTop: 25,
    marginVertical: 10
  },
  titleHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black'
  },
  containerFull: {
    flex: 1
  },
  backButton: {
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
  rightIcon: {
    marginRight: 30,
  },
  leftIcon: {
    marginLeft: 20,
  },
  center: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    marginLeft: 10
  },
  avatar: {
    // width: width * 15 / 120,
    // height: width * 15 / 120,
    // borderRadius: width * 10 / 120,
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#E5E5E5'
  },
  nameTittle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  },
  isOnline: {
    backgroundColor: `rgba(${Colors.primary},0.6)`,
    paddingHorizontal: 9,
    paddingVertical: 3,
    borderRadius: 15,
    color: 'white',
    marginTop: 5,
    fontSize: 14,
    lineHeight: 17
  },
  container: {
    marginTop: 8,
    borderTopColor: "#E5E5E5",
    borderTopWidth: 5,
    paddingHorizontal: 18,
    flex: 1,
  },
  item: {
    flexDirection: "row",
    padding: 0
    // alignItems: "center",
    // justifyContent: 'center',
    // paddingVertical: padding.small,
    // marginTop: 5
  },
  itemRight: {
    justifyContent: 'center',
    // marginTop: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2
  },
  message: {
    backgroundColor: `rgba(${Colors.primary},0.9)`,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    color: 'white'
  },
  viewTime: {
    alignItems: 'flex-start',
  },
  time: {
    fontSize: 11,
    color: '#828282',
    textAlign: 'right',
    marginBottom: 10
  },

  viewInput: {
    width: '100%',
    flexDirection: 'row',
    height: 60,
    paddingVertical: 10,
    // position: 'absolute',
    // bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopColor: '#D6DFE3',
    borderTopWidth: 1,
    paddingHorizontal: 12
  },
  typing: {
    backgroundColor: 'rgba(52, 52, 52)',
    position: 'absolute',
    bottom: 0,
    left: 12
  }
});



