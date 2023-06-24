import React, { useState } from 'react';
import { Text, View, Image, Dimensions, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ProfileItem from '../components/shop/ProfileItem';
import { LOGOUT } from '../redux/auth/constants';
import { Colors } from '../constants/Colors';
const primaryColor = `rgb(${Colors.primary})`;
import { connect, useDispatch } from 'react-redux'
import { SafeAreaView } from 'react-native-safe-area-context';
const primaryLightColor = `rgba(${Colors.primary}, 0.8)`;
import storage from '@react-native-firebase/storage';
import { updateAvatar } from '../redux/auth/action';

const width = Dimensions.get('window').width

export const Profile = (props) => {
  const { navigation, auth } = props;
  const { name, urlAvt, email } = auth.user
  const dispatch = useDispatch();
  const [isUploading, setUploading] = useState(false)
  const choseImage = async () => {
    try {
      setUploading(true)
      const result = await launchImageLibrary({ mediaType: 'photo' });
      const reference = storage().ref(`${auth.user.id}.png`);
      await reference.putFile(result.assets[0].uri);
      const urlAvt = await reference.getDownloadURL()
      dispatch(updateAvatar(auth.user.id, urlAvt))
      setUploading(false)
    } catch (error) {
      setUploading(false)
    }
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/*Cá nhân */}
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <TouchableOpacity activeOpacity={0.6} onPress={choseImage} style={{ marginRight: 10 }}>
                <Image style={styles.avatar}
                  source={{ uri: urlAvt }} />
                {isUploading ? <Text style={{ textAlign: 'center', color: `rgb(${Colors.text.secondary})`, position: 'absolute', bottom: -15, width: '100%' }}>uploading...</Text> : null}
              </TouchableOpacity>
              <View style={styles.txtname}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.userInfo}>{email}</Text>
                <Text style={styles.userInfo}>Admin</Text>
              </View>
            </View>
          </View>
          <View style={{ height: 0.3, borderWidth: 0.3, borderColor: 'white' }}></View>
          <View style={styles.container}>
            <ScrollView>
              {/*list thông tin */}
              <Text style={styles.itemName}>Tài khoản của tôi </Text>
              <ProfileItem name="Hồ sơ của tôi" onPress={() => navigation.navigate("AccountInformation")} />
              {/* <ProfileItem name="Địa chỉ" onPress={() => navigation.navigate("EditAddress")} /> */}
              <ProfileItem name="Tài khoản Ngân hàng" />
              <Text style={styles.itemName}>Shop</Text>
              <ProfileItem name="Hồ sơ shop" onPress={() => navigation.navigate("ShopInformation")} />
              <ProfileItem name="Địa chỉ" onPress={() => navigation.navigate("EditAddress")} />
              <Text style={styles.itemName}> Cài Đặt</Text>
              <ProfileItem name="Cài đặt thông báo " />
              <ProfileItem name="Ngôn ngữ" />
              {/* nút đăng xuất*/}
              <View style={styles.buttonstyle}>
                <TouchableOpacity onPress={() => dispatch({ type: LOGOUT })} >
                  <Text style={styles.btnName}>Đăng xuất</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};


const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.background,
  },
  headerContent: {
    flexDirection: 'row',
    paddingVertical: 30,
    paddingHorizontal: 15
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "white",
    // marginRight: 20,
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: '600',
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: '600',
  },
  body: {
    backgroundColor: "#778899",
    height: 500,
    alignItems: 'center',
  },
  itemName: {
    margin: 10,
    color: '#696969',
  },
  buttonstyle: {
    backgroundColor: primaryLightColor,
    margin: 30,
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
    marginBottom: 50
  },
  btnName: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
});


