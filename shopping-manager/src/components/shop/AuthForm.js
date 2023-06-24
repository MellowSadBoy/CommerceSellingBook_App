import React, { useEffect, useReducer, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import { Colors } from '../../constants/Colors';
import ErrorModal from './ErrorModal';
import FormSubmitButton from './FormSubmitButton';
import LabledInput from './LabledInput';
import Icon from '../icons/LightIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux'
const primaryColor = `rgb(${Colors.primary})`;
const labelDefaultColor = `rgb(${Colors.text.secondary})`;



const emailValidator = text => {
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  if (!regex.test(String(text).toLocaleLowerCase())) {
    return { isValid: false, error: 'Vui lòng nhập email hợp lệ' };
  }
  return { isValid: true };
};
const passValidator = text => {
  if (text.length < 6) {
    return {
      isValid: false,
      error: 'Mật khẩu phải lớn hơn 6 kí tự',
    };
  }
  return { isValid: true };
};


const AuthForm = (props) => {
  const { buttonTitle, onSubmit, auth } = props

  const [email, setEmail] = useState("")
  const [passowrd, setPassword] = useState("")

  const [emailIsValid, setEmailIsValid] = useState(false)
  const [passwordIsValid, setPasswordIsValid] = useState(false)

  const [alert, setAlert] = useState(false);
  const [actionDisabled, setActionDisabled] = useState(false);
  const [triggerValidation, setTriggerValidation] = useState(false);

  const toggleAlert = () => {
    setAlert(value => !value);
  };

  const formSubmitHandler = () => {
    // if(emailIsValid && passwordIsValid){
    onSubmit(email, passowrd)
    // }
  };

  useEffect(() => {
    if (triggerValidation) {
      setTriggerValidation(false);
    }
  }, [triggerValidation]);

  return (
    <View style={{ marginTop: 20 }}>
      <View style={{justifyContent:'center', alignItems:'center'}}>
        <Text style={{textAlign:'center', color:'red'}}>{auth.login_error}</Text>
      </View>
      <LabledInput
        required
        placeholder="somebody@example.com"
        Icon={({ color }) => (
          <FontAwesome name="user" size={22} color={primaryColor} />
        )}
        borderRadius={140}
        autoCapitalize="none"
        value={email}
        isValid={emailIsValid}
        validators={[emailValidator]}
        triggerValidation={triggerValidation}
        // error={state.email.error}
        onChangeText={text => setEmail(text)}
        setIsValid={setEmailIsValid}
      />
      <LabledInput
        required
        secure
        placeholder="Enter your passowrd"
        Icon={({ color }) => (
          <FontAwesome name="lock" size={22} color={primaryColor} />
        )}
        borderRadius={140}
        autoCapitalize="none"
        value={passowrd}
        isValid={passwordIsValid}
        validators={[passValidator]}
        triggerValidation={triggerValidation}
        // error={state.password.error}
        setIsValid={setPasswordIsValid}
        onChangeText={text => setPassword(text)}
      />

      <FormSubmitButton
        disabled={actionDisabled}
        title={buttonTitle}
        isSubmitting={auth.isLoading}
        submitHandler={formSubmitHandler}
      />
      {/* <ErrorModal
        isVisible={alert}
        title="Oops"
        message="Please check your internet connection"
        buttonTitle="Try Again"
        onCancel={() => toggleAlert()}
        Icon={() => (
          <Icon
            name="wifi-off"
            size={32}
            color={`rgba(${Colors.primary}, 0.7)`}
          />
        )}
      /> */}
    </View>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(AuthForm);

const styles = StyleSheet.create({});
