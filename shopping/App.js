import React from 'react';
import  { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import { enableScreens } from 'react-native-screens';

import { Colors } from './src/constants/Colors';

import OneSignal from 'react-native-onesignal';

import store from './src/store'

import { navigationRef } from './src/uitls/naviation';

// import { LogBox } from "react-native";

// LogBox.ignoreLogs(["EventEmitter.removeListener"]);

// OneSignal.setLogLevel(6, 0);
// OneSignal.setAppId('95ee0575-c468-4644-a3c6-c2e1b0379b0d');

// enableScreens();   

const App = () => {
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={{
        colors: {
          background: `rgb(${Colors.background})`,
          text: `rgb(${Colors.text.primary})`,
        },
      }}>
      <Provider store={store}>
        <RootNavigator />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
