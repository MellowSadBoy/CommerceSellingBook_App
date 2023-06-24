import React, { useState } from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import ProfileItem from '../components/shop/ProfileItem';
const width = Dimensions.get('window').width;
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import LeftIcon from '../components/icons/LeftIcon';
import { Colors } from '../constants/Colors';
const textPrimaryColor = `rgb(${Colors.text.primary})`;
const primaryColor = `rgb(${Colors.primary})`;
import { goBack } from '../uitls/naviation'
import { connect, useDispatch } from 'react-redux';
import storage from '@react-native-firebase/storage';
import { updateAvatarShop } from '../redux/auth/action';

function AccountInformation({ navigation, auth }) {
  const [isUploading, setUploading] = useState(false)

  const dispatch = useDispatch()
  const formatDate = (date) => {
    setFullDate(
      date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear(),
    );
  };

  const choseImage = async () => {
    try {
      setUploading(true)
      const result = await launchImageLibrary({ mediaType: 'photo' });
      const reference = storage().ref(`shop.png`);
      await reference.putFile(result.assets[0].uri);
      const urlAvt = await reference.getDownloadURL()
      dispatch(updateAvatarShop(urlAvt))
      setUploading(false)
    } catch (error) {
      setUploading(false)
    }
  }
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
          <Text style={styles.titleHeader}>Shop</Text>
        </View>
        <View style={styles.container}>
          <ScrollView style={{ flex: 1 }}>
            <TouchableOpacity activeOpacity={0.6} onPress={choseImage}>
              <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                <Image style={styles.avatar}
                  source={{ uri: auth.shop.urlAvt }} />
                {isUploading ? <Text style={{ textAlign: 'center', color: `rgb(${Colors.primary})`, position: 'absolute', bottom: -15, width: '100%' }}>uploading...</Text> : null}
              </View>
            </TouchableOpacity>

            <View style={styles.item}>
              <ProfileItem
                name="Tên shop"
                content={auth.shop.name}
                onPress={() =>
                  navigation.navigate('EditNameShop')
                }
              />
            </View>

            <View style={styles.item}>
              <ProfileItem
                name="Điện thoại"
                content={auth.shop.phone ? auth.shop.phone : 'Chưa thêm số điện thoại'}
                onPress={() =>
                  navigation.navigate('EditPhoneShop')
                }
              />
            </View>
            <View style={{ height: 30 }}></View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView >
  );
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
export default connect(mapStateToProps)(AccountInformation);


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
  item: {
    // marginTop: 15,
    color: '#696969',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "white",
    // marginRight: 20,
  },
});
