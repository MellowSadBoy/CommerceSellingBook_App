import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';

import Icon from '../components/icons/LightIcons';
import { Colors } from '../constants/Colors';
import FriesOddIcon from '../components/icons/FriesOddIcon';
import PlusIcon from '../components/icons/PlusIcon';
import LeftIcon from '../components/icons/LeftIcon';
import MessageScreen from '../screens/MessageScreen';

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

const ProductManagerNavigator = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Message"
        component={MessageScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ProductManagerNavigator;

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
