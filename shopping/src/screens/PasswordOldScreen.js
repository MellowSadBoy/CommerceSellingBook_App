import {
  Text,
  StyleSheet,
  View,
  TextInput,
  StatusBar,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
  ScrollView
} from 'react-native';
import React, { useState, useEffect } from 'react';
import LeftIcon from '../components/icons/LeftIcon';
import { Colors } from '../constants/Colors';
const textPrimaryColor = `rgb(${Colors.text.primary})`;
const primaryColor = `rgb(${Colors.primary})`;
import { goBack } from '../uitls/naviation'
const primary = `rgb(${Colors.primary})`;

const PasswordOldScreen = ({ navigation }) => {
  const [color, setColor] = useState('#BEBEBE');
  const [pwd, setPwd] = useState(' ');
  const [backgroundColor, setBackgroundColor] = useState('#D3D3D3');
  const [disabled, setDisabled] = useState(true)
  useEffect(() => {
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setColor('#BEBEBE');
    });

    return () => {
      hideSubscription.remove();
    };
  }, []);
  const changeBorderColor = () => {
    setColor(primary);
  };
  const changeText = (value) => {
    setPwd(value)
    if (value) {
      setBackgroundColor(primary);
      setDisabled(false)
    }else{
      setBackgroundColor('#D3D3D3');
      setDisabled(true)
    }
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
          <Text style={styles.titleHeader}>Đổi mật khẩu</Text>
        </View>
        <View style={styles.container}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.screen}>
              <View>
                <TextInput
                  onFocus={() => changeBorderColor()}
                  secureTextEntry={true}
                  placeholder="Mật khẩu cũ"
                  onChangeText={changeText}
                  style={{ ...styles.inputEdit, borderBottomColor: color }}
                  placeholderTextColor={`rgb(${Colors.text.secondary})`}
                />
              </View>
              <TouchableOpacity disabled={disabled} onPress={() => navigation.navigate('ChangePassword',pwd)} style={{ ...styles.acceptContainer, backgroundColor: backgroundColor }}>
                <Text style={{ ...styles.buttonAccept }}>TIẾP THEO</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView >
  );
};

export default PasswordOldScreen;

const styles = StyleSheet.create({
  editContainer: { paddingTop: 20 },
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
    // position: 'absolute',
    // right: 20
  },
  txtButton: {
    color: `rgb(${Colors.primary})`,
    fontSize: 20
  },
  // inputEdit: {
  //   backgroundColor: '#fff',
  //   flexDirection: 'row',
  //   paddingHorizontal: 20,
  //   paddingVertical: 10,
  //   alignItems: 'center',
  //   color: `rgb(${Colors.text.primary})`
  // },
});
