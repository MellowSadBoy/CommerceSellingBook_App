import { Text, StyleSheet, View, TextInput, StatusBar, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';

import LeftIcon from '../components/icons/LeftIcon';
import { Colors } from '../constants/Colors';
const textPrimaryColor = `rgb(${Colors.text.primary})`;
const primaryColor = `rgb(${Colors.primary})`;
import { goBack } from '../uitls/naviation'
import { connect, useDispatch } from 'react-redux';
import { updatPhone, updatPhoneShop } from '../redux/auth/action'
import { set } from 'react-native-reanimated';

var vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;


const EditPhoneShopScreen = ({ route, navigation, auth }) => {
  const dispatch = useDispatch()
  const [phone, setPhone] = useState(auth.shop?.phone)
  const [error, setError] = useState('')

  const onSave = () => {
    if (!error) {
      dispatch(updatPhoneShop(phone))
      goBack()
    }
    // if (phone !== '') {
    //   if (vnf_regex.test(phone) === false) {
    //     console.log(phone);
    //     setError('Số điện thoại không hợp lệ!')
    //   } else {
    //     setError('')
    //     dispatch(updatPhoneShop(phone))
    //     goBack()
    //   }
    // } else {
    //   setError('Bạn chưa điền số điện thoại!')
    // }
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
          <Text style={styles.titleHeader}>Số điện thoại</Text>
          <TouchableOpacity style={styles.button} onPress={onSave}>
            <Text style={styles.txtButton}>Lưu</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.screen}>
              <View style={styles.editContainer}>
                <TextInput style={styles.inputEdit}
                  placeholder={'Số điện thoại'}
                  onChangeText={text => {
                    setPhone(text)
                    if (text !== '') {
                      if (vnf_regex.test(text) === false) {
                        console.log(text);
                        setError('Số điện thoại không hợp lệ!')
                      } else {
                        setError('')
                      }
                    } else {
                      setError('Bạn chưa điền số điện thoại!')
                    }
                  }}
                  value={phone}
                  placeholderTextColor={`rgb(${Colors.text.secondary})`}
                />
                <Text style={{ color: `rgb(${Colors.danger})`, fontSize: 13, marginLeft: 20 }}>{error}</Text>
              </View>
            </View>
          </ScrollView>
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
export default connect(mapStateToProps)(EditPhoneShopScreen);

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
  },
});
