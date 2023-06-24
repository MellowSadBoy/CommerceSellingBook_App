import React, { useState, useEffect } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import { Colors } from '../../constants/Colors';
import LabledInput from './LabledInput';
// import ErrorModal from './ErrorModal';
import FormSubmitButton from './FormSubmitButton';
import { showMessage } from 'react-native-flash-message';

const CustomerForm = ({ submitButtonTitle, onSubmit, customer }) => {


  const [formIsValid, setFormIsValid] = useState(false);
  const [actionDisabled, setActionDisabled] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigation = useNavigation();
  const date = new Date(customer.birthday?.seconds ? customer.birthday?.seconds * 1000 : 10000000)
  const [name, setName] = useState(customer.name ? customer.name : '')
  const [ID, setID] = useState(customer.id ? customer.id : '')
  const [urlAvt, setUrlAvt] = useState(customer.urlAvt ? customer.urlAvt : '')
  const [address, setAddress] = useState(customer.address ? customer.address : '')
  const [email, setEmail] = useState(customer.email ? customer.email : '')
  const [gender, setGender] = useState(customer.gender ? customer.gender : '')
  const [birthday, setbirthday] = useState(date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear())
  const [phone, setPhone] = useState(customer.phone ? customer.phone : '')



  const [isValidName, setValidName] = useState(true)
  const [isValidUrlAvt, setValidUrlAvt] = useState(true)
  const [isValidAddress, setValidAddress] = useState(true)
  const [isValidEmail, setValidEmail] = useState(true)
  const [isValidGender, setValidGender] = useState(true)
  const [isValidBirthday, setValidBirthday] = useState(true)
  const [isValidPhone, setValidPhone] = useState(true)




  const emailValidator = text => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!regex.test(String(text).toLocaleLowerCase())) {
      return { isValid: false, error: 'Vui lòng nhập email hợp lệ' };
    }
    return { isValid: true };
  };


  useEffect(() => {
    return () => {

    }
  }, []);

  const formSubmitHandler = () => {
    var parts = birthday.split('-'); //d/m/y
    // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
    // January - 0, February - 1, etc.
    var mydate = new Date(parts[2], parts[1] - 1, parts[0]);
    console.log(mydate.toDateString())
    if(isValidName && isValidPhone && isValidAddress && isValidBirthday && isValidEmail &&
      isValidGender && isValidUrlAvt){
        setLoading(true)
        firestore()
        .collection('customer')
        .doc(customer.id)
        .update({
          email,
          name,
          urlAvt,
          birthday: firestore.Timestamp.fromDate(mydate),
          address,
          phone,
          gender
        })
        .then(() => {
          setLoading(false)
          showMessage({
            message: 'Lưu thành công',
            type: 'success',
            position: { top: StatusBar.currentHeight, left: 0 },
          })
        })
        .catch(e => {
          setLoading(false)
          showMessage({
            message: 'Lưu không thành công',
            type: 'danger',
            position: { top: StatusBar.currentHeight, left: 0 },
          })
        })
      }
  };

  const toggleAlert = () => {
    setAlert(value => !value);
  };

  return (
    <View style={styles.form}>
       <LabledInput
        borderRadius={5}
        placeholder="ID *"
        required
        autoCapitalize="sentences"
        value={ID}
        label="ID *"
        // onChangeText={setName}
        isValid={true}
        // setIsValid={setValidName}
        editable={false}
      />
      <LabledInput
        borderRadius={5}
        placeholder="Tên Khách hàng *"
        required
        autoCapitalize="sentences"
        value={name}
        label="Tên Khách hàng *"
        onChangeText={setName}
        isValid={isValidName}
        setIsValid={setValidName}
      />
      <LabledInput
        borderRadius={5}
        placeholder="Link hình ảnh"
        autoCapitalize="none"
        value={urlAvt}
        label="Link hình ảnh"
        onChangeText={setUrlAvt}
        isValid={isValidUrlAvt}
        setIsValid={setValidUrlAvt}
      />
      <LabledInput
        borderRadius={5}
        placeholder="Địa chỉ"
        autoCapitalize="sentences"
        value={address}
        label="Địa chỉ"
        onChangeText={setAddress}
        isValid={isValidAddress}
        setIsValid={setValidAddress}
      />
      <LabledInput
        borderRadius={5}
        placeholder="Email *"
        required
        autoCapitalize="sentences"
        value={email}
        label="Email *"
        onChangeText={setEmail}
        validators={[emailValidator]}
        isValid={isValidEmail}
        setIsValid={setValidEmail}
      />
      <LabledInput
        borderRadius={5}
        placeholder="Nam/Nữ"
        autoCapitalize="sentences"
        value={gender}
        label="Giới tính"
        onChangeText={setGender}
        isValid={isValidGender}
        setIsValid={setValidGender}
      />
      <LabledInput
        borderRadius={5}
        placeholder="dd/mm/yyyy"
        autoCapitalize="sentences"
        value={birthday}
        label="Ngày sinh (dd/mm/yyyy)"
        onChangeText={setbirthday}
        isValid={isValidBirthday}
        setIsValid={setValidBirthday}
      />
      <LabledInput
        borderRadius={5}
        placeholder="Số điện thoại"
        value={phone}
        label="Số điện thoại"
        keyboardType="numeric"
        onChangeText={setPhone}
        isValid={isValidPhone}
        setIsValid={setValidPhone}
      />

      <FormSubmitButton
        // shallowAppearance={!formIsValid}
        // disabled={!formIsValid || actionDisabled}
        title={submitButtonTitle}
        isSubmitting={isLoading}
        submitHandler={formSubmitHandler}
      />
      {/* <ErrorModal
        isVisible={alert}
        title="Oops"
        message="Please check your internet connection"
        buttonTitle="Try Again"
        onCancel={() => toggleAlert()}
        Icon={() => (
          <Feather
            name="wifi-off"
            size={32}
            color={`rgba(${Colors.primary}, 0.8)`}
          />
        )}
      /> */}
    </View>
  );
};

export default CustomerForm;

const styles = StyleSheet.create({
  form: {
    paddingTop: 10,
    paddingHorizontal: 25,
  },
});
