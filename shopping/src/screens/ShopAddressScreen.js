import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import { goBack } from '../uitls/naviation'
import { Colors } from '../constants/Colors';
import LeftIcon from '../components/icons/LeftIcon';
const textPrimaryColor = `rgb(${Colors.text.primary})`;
const primaryColor = `rgb(${Colors.primary})`;
import { hideTabbar, showTabbar } from '../redux/common/action';
import { connect, useDispatch } from 'react-redux';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';


export default function Setting(props) {
  const { navigation } = props;
  const widthScreen = useWindowDimensions().width
  const [loading, setLoading] = useState('true')
  const dispatch = useDispatch()
  const [region, setRegion] = useState({
    "latitude": 10.776174906550146,
    "latitudeDelta": 0.0005800092300258797,
    "longitude": 106.70603139325976,
    "longitudeDelta": 0.0005481764674328815
  })
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(hideTabbar())
    });

    const unsubscribe2 = navigation.addListener('blur', () => {
      dispatch(showTabbar())
    });

    firestore()
      .collection('shop')
      .doc('shop')
      .get()
      .then(doc => {
        if (typeof doc._data?.addressMap == "object") {
          if (Object.keys(doc._data?.addressMap).length !== 0) {
            setRegion(prev => { return { ...prev, latitude: doc._data?.addressMap?.latitude, longitude: doc._data?.addressMap?.longitude } })
          }
        }
        setLoading(false)
      })
    return () => {
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
            <Text style={{ fontSize: 29, color: 'black', fontWeight: 'bold', marginLeft: 10 }}>Địa chỉ shop</Text>
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
          <Text style={styles.titleHeader}>Địa chỉ shop</Text>
        </View>
        <View style={styles.container}>
          {/* <ScrollView> */}
          <MapView
            style={{ flex: 1 }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation
            initialRegion={region}
            onRegionChange={(r) => console.log(r)}
          >
            <Marker coordinate={region} />
          </MapView>
          {/* </ScrollView> */}
        </View>
      </View>
    </SafeAreaView >
  );
}
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
    backgroundColor: '#F5F5F5',
    height: '100%',
    marginTop: 15,
    flex: 1
  },

});
