import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import ChatsScreen from '../screens/ChatsScreen';
import FriesOddIcon from '../components/icons/FriesOddIcon';
import {Colors} from '../constants/Colors';
import MessagesList from '../screens/messages-list';

const Stack = createStackNavigator();
const screenOpts = {
  headerTitleStyle: {
    fontFamily: 'Lato-Black',
    fontSize: 28,
    marginLeft: 20,
  },
  headerStyle: {
    height: 120,
  },
};
const textColor = `rgba(${Colors.text.primary}, 0.7)`;
const textPrimaryColor = `rgb(${Colors.text.primary})`;

const ChatsNavigator = ({navigation}) => {
  return (
    <Stack.Navigator screenOptions={screenOpts}>
      <Stack.Screen
        name="MessagesList"
        component={MessagesList}
        options={{
          headerShown:false
        }}
      />
      <Stack.Screen
        name="Message-detail"
        component={ChatsScreen}
        options={{
          headerShown:false
        }}
      />
    </Stack.Navigator>
  );
};

export default ChatsNavigator;

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
});
