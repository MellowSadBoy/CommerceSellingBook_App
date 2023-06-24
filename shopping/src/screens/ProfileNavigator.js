import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Text,
  Keyboard,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useTheme} from '@react-navigation/native';

import RecentProduct from './RecentProduct';
import FavoritesScreen from '../screens/FavoritesScreen';

import Profile from '../screens/Profile';
import Icon from '../components/icons/LightIcons';
import {Colors} from '../constants/Colors';
import FriesOddIcon from '../components/icons/FriesOddIcon';
import PlusIcon from '../components/icons/PlusIcon';
import SettingScreen from './SettingScreen';
import AddressScreen from './AddressScreen'
import AccountInformationScreen from './AccountInformationScreen';
import BackButton from '../components/shop/BackButton';
import HeaderEdit from '../components/shop/HeaderEdit';
import EditNameScreen from './EditNameScreen';
import EditEmailScreen from './EditEmailScreen';
import EditPhoneScreen from './EditPhoneScreen';
import EditAddressScreen from './EditAddressScree';
import ShopAddressScreen from './ShopAddressScreen';


import ChangePassword from './ChangePassword';
import PasswordOldScreen from './PasswordOldScreen';
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
  const {colors} = useTheme();

  return (
    <Stack.Navigator screenOptions={screenOptions}  >
    
      <Stack.Screen  
        name="Profile"
        component={Profile}
        options={{ 
          headerShown: false,
          title: '',
        }}
      /> 
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="recent-product"
        component={RecentProduct}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="ShopAddress"
        component={ShopAddressScreen}
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
        name="EditName"
        component={EditNameScreen}
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
      <Stack.Screen  
        name="Address"
        component={AddressScreen}
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
