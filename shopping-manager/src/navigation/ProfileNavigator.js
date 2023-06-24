import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';


import Profile from '../screens/Profile';
import SettingScreen from '../screens/SettingScreen';
import AccountInformationScreen from '../screens/AccountInformationScreen';
import ShopInformationScreen from '../screens/ShopInformationScreen';
import EditNameScreen from '../screens/EditNameScreen';
import EditNameShopScreen from '../screens/EditNameShop';
import EditEmailScreen from '../screens/EditEmailScreen';
import EditPhoneScreen from '../screens/EditPhoneScreen';
import EditPhoneShopScreen from '../screens/EditPhoneShopScreen';
import EditAddressScreen from '../screens/EditAddressScree';

import ChangePassword from '../screens/ChangePassword';
import PasswordOldScreen from '../screens/PasswordOldScreen';
import Icon from '../components/icons/LightIcons';
import { Colors } from '../constants/Colors';

const Stack = createStackNavigator();
const screenOptions = {
  headerTitleStyle: {
    fontFamily: 'Lato-Black',
    fontSize: 28,
    marginLeft: 20,
  },
  headerStyle: {
    height: 120,
  },
};

const ProfileNavigator = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({ navigation }) => ({
          headerShown: false
        })}
      />

      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AccountInformation"
        component={AccountInformationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ShopInformation"
        component={ShopInformationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditName"
        component={EditNameScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditNameShop"
        component={EditNameShopScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditPhone"
        component={EditPhoneScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditPhoneShop"
        component={EditPhoneShopScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditEmail"
        component={EditEmailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="OldPassword"
        component={PasswordOldScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditAddress"
        component={EditAddressScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;

const styles = StyleSheet.create({
  backButton: {
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: `rgb(${Colors.text.primary})`,
  },

  leftIcon: {
    marginLeft: 20,
  },
});
