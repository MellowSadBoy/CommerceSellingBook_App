import React, {useContext, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  AppState,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AuthForm from '../components/shop/AuthForm';
import {Colors} from '../constants/Colors';
import Banner from '../components/icons/SvgLoginIcon';
import { connect, useDispatch } from 'react-redux'
import {login} from '../redux/auth/action'



const textColor = `rgb(${Colors.text.primary})`;
const primaryLightColor = `rgba(${Colors.primary}, 0.8)`;

const LoginScreen = (props) => {
  const {navigation} = props

  useEffect(() => {
    const subscription = AppState.addEventListener('change', () => {});
    return () => {
      subscription.remove();
    };
  }, []);
  const dispatch = useDispatch()
  const submit = (email,password)=>{
    dispatch(login({email,password}))
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="dark-content" />
      <View>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{paddingTop:50}}>
          <Banner />
          <AuthForm
            buttonTitle="Đăng nhập"
            onSubmit={submit}
          />
         <View style={{height:80}}></View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

// export default LoginScreen;

const mapStateToProps = state => {
  return {
      auth : state.auth
  };
};

export default connect(mapStateToProps)(LoginScreen);

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: 30,
    flex: 1,
  },
  linkContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 30,
  },
  linkText: {
    fontFamily: 'Lato-Regular',
    fontSize: 16,
    color: textColor,
  },
  link: {
    fontFamily: 'Lato-Bold',
    fontSize: 16,
    color: primaryLightColor,
  },
  forgotContainer: {
    alignItems: 'center',
    margin: 5,
  },
  textForgot: {
    color: primaryLightColor,
    fontSize: 17,
  },
});
