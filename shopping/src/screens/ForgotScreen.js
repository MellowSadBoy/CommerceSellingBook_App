import React, { useState } from 'react';
import { Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, View, StatusBar } from 'react-native';
import LabledInput from '../components/shop/LabledInput';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LeftIcon from '../components/icons/LeftIcon';
import { Colors } from '../constants/Colors';
const textPrimaryColor = `rgb(${Colors.text.primary})`;
const primaryColor = `rgb(${Colors.primary})`;
import { goBack } from '../uitls/naviation'
import auth from '@react-native-firebase/auth'
import { showMessage } from 'react-native-flash-message';


export default function ForgotScreen({ navigation }) {

  const [email, setEmail] = useState("")
  const [emailIsValid, setEmailIsValid] = useState(false)
  const [triggerValidation, setTriggerValidation] = useState(false);
  const [isLoading, setLoading] = useState(false)

  const sendResetPasswordEmail = () => {
    if (emailIsValid) {
      setLoading(true)
      console.log("ok");
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          showMessage({
            message: `Đã gửi một email tới ${email}`,
            type: 'success',
            position: { top: StatusBar.currentHeight, left: 0 },
            duration:2000
          })
          setLoading(false)
        })
        .catch(error => {
          console.log(error);
          setLoading(false)
          if (error.code == 'auth/user-not-found') {
            showMessage({
              message: `Email ${email} chưa được đăng kí!`,
              type: 'danger',
              position: { top: StatusBar.currentHeight, left: 0 },
              duration:2000
            })
            return
          }
          showMessage({
            message: 'Vui lòng thử lại!',
            type: 'warning',
            position: { top: StatusBar.currentHeight, left: 0 },
            duration:2000
          })
        })
    }
  };

  const emailValidator = text => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!regex.test(String(text).toLocaleLowerCase())) {
      return { isValid: false, error: 'Vui lòng nhập email hợp lệ' };
    }
    return { isValid: true };
  };
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
          <Text style={styles.titleHeader}>Quên mật khẩu</Text>
        </View>
        <View style={styles.container}>
          <Text style={styles.description}>Bạn sẽ nhận được email để khôi phục mật khẩu!</Text>
          <LabledInput
            required
            placeholder="somebody@example.com"
            Icon={({ color }) => (
              <MaterialCommunityIcons name="email" size={20} color={primaryColor} />
            )}
            borderRadius={140}
            autoCapitalize="none"
            value={email}
            isValid={emailIsValid}
            validators={[emailValidator]}
            triggerValidation={triggerValidation}
            // error={state.email.error}
            onChangeText={text => setEmail(text)}
            setIsValid={setEmailIsValid}
          />

          <TouchableOpacity style={styles.button} onPress={sendResetPasswordEmail}>
            <Text style={styles.txtButton}>Gửi email</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView >
  );
}
const styles = StyleSheet.create({
  textResetPwd: {
    fontSize: 21,
    color: '#560CCE',
    fontWeight: 'bold',
    paddingVertical: 12,
  },
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
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 15,
    borderRadius: 140
  },
  txtButton: {
    color: 'white',
    fontSize: 20
  },
  description: {
    color: `rgb(${Colors.text.secondary})`,
    textAlign: 'center'
  }
});
