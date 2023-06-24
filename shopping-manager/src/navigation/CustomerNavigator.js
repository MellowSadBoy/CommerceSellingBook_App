import React, { useEffect} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import CustomerScreen from '../screens/CustomerScreen';
import EditCustomerScreen from '../screens/EditCustomerScreen';
import {Colors} from '../constants/Colors';
// import CartIcon from '../components/shop/CartIconComponent';
// import FriesOddIcon from '../components/icons/FriesOddIcon';

const Stack = createStackNavigator();

const textPrimaryColor = `rgb(${Colors.text.primary})`;

const screenOptions = {
  headerTitleStyle: {
    fontFamily: 'Lato-Black',
    fontSize: 28,
    marginLeft: 20,
  },
  headerStyle: {
    // height: 120,
  },
};

const CustomerNavigator = () => {

  useEffect(() => {
    return () => {
    };
  }, []);
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="CustomerS"
        component={CustomerScreen}
        options={({navigation}) => ({
          headerShown:false,
        })}
      />
      <Stack.Screen
        name="EditCustomer"
        component={EditCustomerScreen}
        options={{
          headerShown:false,
        }}
      />
    </Stack.Navigator>
    
  );
};

export default CustomerNavigator;

const styles = StyleSheet.create({
  backButton: {
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    borderWidth: 1,
    borderRadius: 10,
  },
  rightIcon: {
    marginRight: 30,
  },
  leftIcon: {
    marginLeft: 20,
  },
  cart: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
