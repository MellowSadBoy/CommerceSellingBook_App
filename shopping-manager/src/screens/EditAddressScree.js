import { Text, StyleSheet, View, TextInput, StatusBar, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';

import LeftIcon from '../components/icons/LeftIcon';
import { Colors } from '../constants/Colors';
const textPrimaryColor = `rgb(${Colors.text.primary})`;
const primaryColor = `rgb(${Colors.primary})`;
import { goBack } from '../uitls/naviation'
import { connect, useDispatch } from 'react-redux';
import { updateAddress } from '../redux/auth/action'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { hideTabbar, showTabbar } from '../redux/common/action';
import firestore from '@react-native-firebase/firestore';


const EditAddressScreen = ({ route, navigation, auth }) => {
  const [address, setAddress] = useState(auth.shop?.addressString)
  const dispatch = useDispatch()
  const onSave = () => {
    dispatch(updateAddress(address, region))
    goBack()
  }
  const [loading, setLoading] = useState('true')

  const [region, setRegion] = useState({
    "latitude": 10.776174906550146,
    "latitudeDelta": 0,
    "longitude": 106.70603139325976,
    "longitudeDelta": 0
  })
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(hideTabbar())
    });

    const unsubscribe2 = navigation.addListener('blur', () => {
      dispatch(showTabbar())
    });
    auth.shop?.addressMap
    if (typeof auth.shop?.addressMap == "object" ) {
      if(Object.keys(auth.shop?.addressMap).length !== 0){
        setRegion(prev=> {return {...prev,latitude:auth.shop?.addressMap.latitude ,longitude:auth.shop?.addressMap.longitude }} )
      }
    }
    setLoading(false)
    // firestore()
    //   .collection('shop')
    //   .doc('shop')
    //   .get()
    //   .then(doc => {
    //     if(doc._data?.address == "object")  setRegion(doc._data.address)
    //     setLoading(false)
    //   })

    // fetchMyAPI()
    return () => {
      // subscriber();
      unsubscribe();
      unsubscribe2();
    };
  }, [navigation]);

  if (loading)
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
            <Text style={{ fontSize: 29, color: 'black', fontWeight: 'bold', marginLeft: 10 }}>Địa chỉ</Text>
          </View>
          <View style={styles.container}>
            <View style={{ flex: 1 }}>
              <ActivityIndicator size='small' color={primaryColor} />
            </View>
          </View>
        </View>


      </SafeAreaView >
    );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        {/* <Text style={styles.titleHeader}></Text> */}
      </View>
      <View style={styles.containerFull}>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
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
          <Text style={styles.titleHeader}>Địa chỉ</Text>
          <TouchableOpacity style={styles.button} onPress={onSave}>
            <Text style={styles.txtButton}>Lưu</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <View style={{ flex: 1 }}>
            <TextInput style={styles.inputEdit} placeholder={'Địa chỉ shop'}
              onChangeText={text => setAddress(text)}
              value={address}
              placeholderTextColor={`rgb(${Colors.text.secondary})`}
            />
            <MapView
              style={{ flex: 1 }}
              provider={PROVIDER_GOOGLE}
              showsUserLocation
              initialRegion={region}
              onPress={(r) => setRegion(r.nativeEvent.coordinate)}
            >
              <Marker
                coordinate={region}
                onPress={(r) => console.log(r)}
              />
            </MapView>
          </View>
        </View>
      </View>
    </SafeAreaView >
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
export default connect(mapStateToProps)(EditAddressScreen);

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 22,
    marginTop: 25,
    marginVertical: 10
  },
  titleHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10
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
  container: {
    backgroundColor: `rgb(${Colors.background})`,
    marginTop: 15,
    flex: 1,
  },
  button: {
    position: 'absolute',
    right: 20
  },
  txtButton: {
    color: `rgb(${Colors.primary})`,
    fontSize: 20,
    fontWeight: 'bold'
  },
  inputEdit: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    color: `rgb(${Colors.text.primary})`
    // marginHorizontal:15
  },
});
