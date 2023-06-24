import React, { useReducer, useState, useEffect } from 'react';
import { StatusBar, StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import firestore from '@react-native-firebase/firestore';
import { showMessage } from 'react-native-flash-message';

import { RadioButton } from 'react-native-paper';

import { Colors } from '../../constants/Colors';
import LabledInput from './LabledInput';

// import ErrorModal from './ErrorModal';
import FormSubmitButton from './FormSubmitButton';

const priceValidator = text => {
  if (isNaN(text) || parseFloat(text) < 0) {
    return { isValid: false, error: 'Giá không hợp lệ' };
  }
  return { isValid: true };
};

const availableValidator = text => {
  const d = ''
  d.toLowerCase
  if (!(text.toLowerCase() == 'false' || text.toLowerCase() == 'true')) {
    return { isValid: false, error: '"true" hoặc "false"' };
  }
  return { isValid: true };
};


const ProductForm = ({ submitButtonTitle, product, onSubmit, isEdit }) => {


  const [isLoading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const navigation = useNavigation();

  const [title, setTitle] = useState(product?.title ? product?.title : '')
  const [imageUrl, setImageUrl] = useState(product?.imageUrl ? product?.imageUrl : '')
  const [price, setprice] = useState(product?.price ? "" + product?.price : '')
  const [available, setAvailable] = useState(product?.available ? product?.available + '' : 'true')
  const [description, setDescription] = useState(product?.description ? product?.description : '')

  const [isValidTitle, setValidTitle] = useState(true)
  const [isValidImageUrl, setValidImageUrl] = useState(true)
  const [isValidPrice, setValidPrice] = useState(true)
  const [isValidDescriptin, setValidDescriptin] = useState(true)
  const [isValidAvailable, setValidAvailable] = useState(true)


  useEffect(() => {
  }, []);

  const formSubmitHandler = () => {
    if (isValidTitle && isValidPrice && isValidImageUrl && isValidDescriptin && isValidAvailable &&
      title && imageUrl && price && available && description
    ) {
      setLoading(true)
      if (isEdit) {
        firestore()
          .collection('products')
          .doc(product.id)
          .update({
            title,
            price: parseFloat(price),
            imageUrl,
            available: available.toLowerCase(),
            description,
            updatedAt: firestore.Timestamp.now()
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
      } else {
        const ref = firestore().collection('products').doc()
        const id = ref.id
        firestore()
          .collection('products')
          .doc(id)
          .set({
            id,
            title,
            price: parseFloat(price),
            imageUrl,
            available: available.toLowerCase(),
            description,
            createdAt: firestore.Timestamp.now()
          })
          .then(() => {
            setLoading(false)
            showMessage({
              message: 'Tạo thành công',
              type: 'success',
              position: { top: StatusBar.currentHeight, left: 0 },
            })
          })
          .catch(e => {
            setLoading(false)
            showMessage({
              message: 'Tạo không thành công',
              type: 'danger',
              position: { top: StatusBar.currentHeight, left: 0 },
            })
          })
      }
    }
  };

  const toggleAlert = () => {
    setAlert(value => !value);
  };

  return (
    <View style={styles.form}>
      <LabledInput
        borderRadius={5}
        placeholder="Tên sản phẩm"
        required
        autoCapitalize="sentences"
        value={title}
        label="Tên sản phẩm"
        onChangeText={setTitle}
        isValid={isValidTitle}
        setIsValid={setValidTitle}
      />
      <LabledInput
        borderRadius={5}
        placeholder="Link hình ảnh"
        required
        autoCapitalize="none"
        value={imageUrl}
        label="Link hình ảnh"
        onChangeText={setImageUrl}
        isValid={isValidImageUrl}
        setIsValid={setValidImageUrl}
      />
      <LabledInput
        borderRadius={5}
        placeholder="Giá bán"
        required
        value={price}
        label="Giá"
        keyboardType="numeric"
        validators={[priceValidator]}
        onChangeText={setprice}
        isValid={isValidPrice}
        setIsValid={setValidPrice}
      />
      {/* <LabledInput
        borderRadius={5}
        placeholder="Có sẵn"
        required
        value={available}
        label="Có sẵn"
        // keyboardType=""
        validators={[availableValidator]}
        onChangeText={setAvailable}
        isValid={isValidAvailable}
        setIsValid={setValidAvailable}
      /> */}
      <Text style={{ marginTop: 8, fontFamily: 'Lato-Bold', fontSize: 16, color: `rgb(${Colors.text.secondary})` }}>Có sẵn</Text>
      <View style={{ flexDirection: 'row',padding: 0,marginTop:-2,marginBottom:-6 }}>
      <View style={{ flexDirection: 'row', marginLeft:-5,}}>
          <RadioButton
            value="true"
            status={available === 'true' ? 'checked' : 'unchecked'}
            color={`rgb(${Colors.primary})`}
            onPress={() => setAvailable('true')}
          />
          <Text style={{ marginTop: 8, fontFamily: 'Lato-Bold', fontSize: 15, color: `rgb(${Colors.text.secondary})` }}>Còn hàng</Text>
        </View>
        <View style={{ flexDirection: 'row'}}>
          <RadioButton
            value="false"
            status={available === 'false' ? 'checked' : 'unchecked'}
            color={`rgb(${Colors.primary})`}
            onPress={() => setAvailable('false')}
          />
          <Text style={{ marginTop: 8, fontFamily: 'Lato-Bold', fontSize: 15, color: `rgb(${Colors.text.secondary})` }}>Hết hàng</Text>
        </View>

      </View>
      <LabledInput
        placeholder="Mô tả sản phẩm"
        required
        multiline
        large
        autoCapitalize="sentences"
        value={description}
        borderRadius={5}
        label="Mô tả sản phẩm"
        onChangeText={setDescription}
        isValid={isValidDescriptin}
        setIsValid={setValidDescriptin}
      />
      <FormSubmitButton
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

export default ProductForm;

const styles = StyleSheet.create({
  form: {
    paddingTop: 10,
    paddingHorizontal: 25,
  },
});
