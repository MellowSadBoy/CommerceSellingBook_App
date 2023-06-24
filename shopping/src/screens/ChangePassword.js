import {
  Text,
  StyleSheet,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '../constants/Colors';
const primary = `rgb(${Colors.primary})`;
import LeftIcon from '../components/icons/LeftIcon';
const textPrimaryColor = `rgb(${Colors.text.primary})`;
import { goBack } from '../uitls/naviation'
import { showMessage } from 'react-native-flash-message';

import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';


const ChangePassword = (props) => {
  const [colorTop, setColorTop] = useState('#BEBEBE');
  const [colorBottom, setColorBottom] = useState('#BEBEBE');
  const [newPassword, setNewPassword] = useState(' ');
  const [comfirmPassword, setComfirmPassword] = useState(' ');
  const [backgroundColor, setBackgroundColor] = useState('#D3D3D3');
  const [error, setError] = useState('')
  const [disabled, setDisabled] = useState(true)
  const [isLoading, setLoading] = useState(false)
  const currentPassword = props.route?.params ? props.route?.params : ""
  useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setColorTop('#BEBEBE');
      setColorBottom('#BEBEBE');
    });

    return () => {
      hideSubscription.remove();
    };
  }, []);

  const changeBorderColor = (top, bottom) => {
    if (top === true) {
      setColorTop(primary);
      setColorBottom('#BEBEBE');
    }
    if (bottom === true) {
      setColorTop('#BEBEBE');
      setColorBottom(primary);
    }
  };

  const reauthenticate = (currentPassword) => {
    var user = auth().currentUser;
    var cred = auth.EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    return user.reauthenticateWithCredential(cred);
  }
  const sumitPwd = () => {
    setLoading(true)
    reauthenticate(currentPassword).then(() => {
      var user = auth().currentUser;
      user.updatePassword(newPassword)
        .then(() => {
          showMessage({
            message: 'Đổi mật khẩu thành công',
            type: 'success',
            position: { top: StatusBar.currentHeight, left: 0 },
          })
          setLoading(false)
        })
        .catch(error => {
          setLoading(false)
          if (error.code == 'auth/weak-password') {
            showMessage({
              message: 'Mật khẩu quá yếu',
              type: 'danger',
              position: { top: StatusBar.currentHeight, left: 0 },
            })
          }
        });
      // const response = firebase.database().ref("Users").child(user.uid);
    }).catch(error => {
      setLoading(false)
      if (error.code == 'auth/wrong-password') {
        showMessage({
          message: 'Mật khẩu cũ sai',
          type: 'danger',
          position: { top: StatusBar.currentHeight, left: 0 },
        })
      }
    })
  };
  const onChangeNewPassword = (value) => {
    setNewPassword(value)
    if (value != comfirmPassword) {
      setError('Mật khẩu không khớp')
      setDisabled(true)
      setBackgroundColor('#D3D3D3')
    } else {
      setError('')
      setDisabled(false)
      setBackgroundColor(primary);
    }
  }

  const onChangeComfirmPassword = (value) => {
    setComfirmPassword(value)
    if (value != newPassword) {
      setError('Mật khẩu không khớp')
      setDisabled(true)
      setBackgroundColor('#D3D3D3')
    } else {
      setError('')
      setDisabled(false)
      setBackgroundColor(primary);
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
          <Text style={styles.titleHeader}>Đổi mật khẩu</Text>
        </View>
        <View style={styles.container}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.screen}>
              <StatusBar barStyle="dark-content" />
              <View>
                <TextInput
                  onFocus={() => changeBorderColor(true, false)}
                  secureTextEntry={true}
                  placeholder="Mật khẩu mới"
                  onChangeText={onChangeNewPassword}
                  placeholderTextColor={`rgb(${Colors.text.secondary})`}
                  style={{ ...styles.inputEdit, borderBottomColor: colorTop }}
                />
              </View>
              <View style={styles.editContainer}>
                <TextInput
                  onFocus={() => changeBorderColor(false, true)}
                  onChangeText={onChangeComfirmPassword}
                  placeholderTextColor={`rgb(${Colors.text.secondary})`}
                  secureTextEntry={true}
                  placeholder="Xác nhận mật khẩu"
                  style={{ ...styles.inputEdit, borderBottomColor: colorBottom }}
                />
                <Text style={{ fontSize: 13, color: 'red', marginLeft: 20 }}>{error}</Text>
              </View>
              <TouchableOpacity onPress={sumitPwd} disabled={disabled}>
                <View
                  style={{ ...styles.acceptContainer, backgroundColor: backgroundColor }}>
                  {isLoading ? <ActivityIndicator color='white' size='small' /> : <Text style={{ ...styles.buttonAccept }}>Xác nhận</Text>}
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView >
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  inputEdit: {
    backgroundColor: `rgb(${Colors.background})`,
    flexDirection: 'row',
    marginHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    // width: '100%',
    borderBottomWidth: 1,
    fontSize: 16,
    color:`rgb(${Colors.text.primary})`
  },
  acceptContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginHorizontal: 20,
    paddingVertical: 10,
    borderRadius:25,
    height:50
  },
  buttonAccept: {
    alignContent: 'center',
    color: '#ffff',
    fontSize: 18,
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
    marginTop: 15,
    flex: 1,
  },
  button: {
    position: 'absolute',
    right: 20
  },
  txtButton: {
    color: `rgb(${Colors.primary})`,
    fontSize: 20
  },
});
