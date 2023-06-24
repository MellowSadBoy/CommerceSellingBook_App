import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screens/LoginScreen';
import {Colors} from '../constants/Colors';
import {abs} from 'react-native-reanimated';
const Stack = createStackNavigator();
const textColor = `rgb(${Colors.text.primary})`;

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={({navigation}) => ({
          header: () => (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View
                style={{
                  ...styles.headerStyle,
                  justifyContent: 'space-around',
                }}>
                <View style={styles.topHearder}>
                  <Image
                    style={{...styles.topImageSvg, left: -10, top: -20}}
                    source={require('../assets/images/auth/main_top.png')}
                  />
                  <Text style={styles.textTop}>LOGIN</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          ),
        })}
      />
      
    </Stack.Navigator>
  );
};
export default AuthNavigator;

const styles = StyleSheet.create({
  headerStyle: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
  },
  textHeaderStart: {
    width: '70%',
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    paddingTop: 30,
  },
  backButton: {
    height: 42,
    width: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: textColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {
    fontFamily: 'Lato-Black',
    fontSize: 40,
    color: 'black',
    lineHeight: 60,
  },
  topHearder: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  topImageSvg: {
    width: '30%',
    height: 120,
    resizeMode: 'contain',
  },
  textTop: {
    width: '70%',
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    paddingTop: 30,
    left: 46,
    color:'black'
  },
});
