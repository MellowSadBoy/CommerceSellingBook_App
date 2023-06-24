import React from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { goBack } from '../uitls/naviation'

import { Colors } from '../constants/Colors';
import ProfileItem from '../components/shop/ProfileItem';
import LeftIcon from '../components/icons/LeftIcon';
const textPrimaryColor = `rgb(${Colors.text.primary})`;
const primaryColor = `rgb(${Colors.primary})`;

const primaryLightColor = `rgba(${Colors.primary}, 0.8)`;
const width = Dimensions.get('window').width;


export default function Setting(props) {
  const { navigation } = props;
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        {/* <Text style={styles.titleHeader}></Text> */}
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
          <Text style={styles.titleHeader}>Cài đặt</Text>
        </View>
        <View style={styles.container}>
          <ScrollView>
            {/*list thông tin */}
            <Text style={styles.itemName}>Tài khoản của tôi </Text>
            <ProfileItem name="Hồ sơ của tôi" onPress={() => navigation.navigate("AccountInformation")} />
            <ProfileItem name="Địa chỉ" onPress={() => navigation.navigate("EditAddress")} />
            <ProfileItem name="Tài khoản Ngân hàng" />
            <Text style={styles.itemName}> Cài Đặt</Text>
            <ProfileItem name="Cài đặt thông báo " />
            <ProfileItem name="Ngôn ngữ" />
            {/* nút đăng xuất*/}
            {/* <View style={styles.buttonstyle}>
              <TouchableOpacity>
                <Text style={styles.btnName}>Đăng xuất</Text>
              </TouchableOpacity>
            </View> */}
          </ScrollView>
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
    marginLeft:10
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
    marginTop:15,
    flex:1
  },
  name: {
    fontSize: 22,
    color: '#000000',
    fontWeight: '600',
  },

  itemContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  itemText: {
    flex: 1,
    color: '#1e1e1e',
  },
  itemName: {
    margin: 10,
    color: '#696969',
  },
  buttonstyle: {
    backgroundColor: primaryLightColor,
    margin: 30,
    paddingVertical: 13,
  },
  btnName: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
});
