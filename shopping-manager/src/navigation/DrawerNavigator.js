import React, { useEffect } from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  useWindowDimensions
} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomerNavigator from './CustomerNavigator';
import Entypo from 'react-native-vector-icons/Entypo';

import Icon from '../components/icons/LightIcons';
import { Colors } from '../constants/Colors';
import OrdersScreen from '../screens/OrdersScreen';
import ProductManagerNavigator from './ProductManagerNavigator';
import ChatsNavigator from './ChatsNavigator';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import ProfileNavigator from './ProfileNavigator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import { getUser } from '../redux/auth/action';
import { connect, useDispatch } from 'react-redux'


const textColor = `rgba(${Colors.text.primary}, 0.7)`;
const Drawer = createDrawerNavigator();

const CartIcon = ({ color }) => <Icon name="cart-o" size={20} color={color} />;
const ShopIcon = ({ color }) => <Icon name="shop-o" size={20} color={color} />;
const userIcon = ({ color }) => <Icon name="user-o" size={20} color={color} />;
const starIcon = ({ color }) => <Icon name="star-o" size={20} color={color} />;
const productIcon = ({ color }) => (
  <Icon name="fries-odd" size={20} color={color} />
);

const drawerContentOpts = {
  activeTintColor: `rgb(${Colors.primary})`,
  inactiveTintColor: `rgba(${Colors.text.primary}, 0.7)`,
  labelStyle: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
  },
  itemStyle: {
    borderRadius: 10,
    paddingLeft: 10,
    marginTop: 0,
  },
};
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

const drawerEdgeWidth = Dimensions.get('window').width / 4;

const CustomTabBarButton = ({ children, onPress }) => (
  <TouchableOpacity
    style={{
      top: -20,
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={onPress}>
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#9370DB',
        borderColor: '#f1f6f0',
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {children}
    </View>
  </TouchableOpacity>
);

const DrawerNavigator = (props) => {
  const { common, auth } = props
  const dispatch = useDispatch()
  const widthScreen = useWindowDimensions().width
  useEffect(() => {
    dispatch(getUser(auth.user.id))
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          // color:'blue',
          // fontSize: 20,
        },
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: `rgb(${Colors.primary})`,
        tabBarInactiveTintColor: 'gray',
        tabBarIconStyle: {
          // fontSize: 20,
          width:40
        },

        tabBarStyle: {
          // fontSize: 40,
          height: 60,
          paddingBottom: 5,
          paddingTop: 0,
          backgroundColor: '#f1f6f0',
          borderTopWidth: 2,
          borderTopColor: '#f1f6e0',
          display: common.isShowTabbar ? 'flex' : 'none'
        },
      }}>

      <Tab.Screen
        name="Order"
        component={OrdersScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="clipboard-text-outline"
              color={color}
              size={size + 7}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Customer"
        component={CustomerNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather
              name="users"
              color={color}
              size={size + 4}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProductManager"
        component={ProductManagerNavigator}
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <Entypo name="plus" color="white" size={size + 10} />
          ),
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="ChatsNavigator"
        component={ChatsNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo
              name="new-message"
              color={color}
              size={size + 3}
            />
          ),
          title: 'Chats',
        }}
      />

      <Tab.Screen
        name="ProfileNavigator"
        component={ProfileNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-outline" color={color} size={size + 10} />
          ),
          title: 'Profile',
        }}
      />

      {/* <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Profile" component={Profile} /> */}
    </Tab.Navigator>
  );
};

const mapStateToProps = state => {
  return {
    common: state.common,
    auth: state.auth
  };
};

export default connect(mapStateToProps)(DrawerNavigator);

const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor: 'white',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Lato-Bold',
    color: `rgb(${Colors.text.secondary})`,
    marginVertical: 20,
    marginLeft: 10,
  },

});
