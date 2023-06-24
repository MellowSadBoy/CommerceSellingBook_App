import React, { useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { goBack } from '../uitls/naviation'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import { SafeAreaView } from 'react-native-safe-area-context';
import LeftIcon from '../components/icons/LeftIcon';
import { Colors } from '../constants/Colors';
import { hideTabbar, showTabbar } from '../redux/common/action';
const textPrimaryColor = `rgb(${Colors.text.primary})`;
const primaryColor = `rgb(${Colors.primary})`;
import ProductForm from '../components/shop/ProductForm';
import { connect, useDispatch } from 'react-redux';
import { useNavigation } from "@react-navigation/native"

const CreateProductScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(hideTabbar())
    });

    const unsubscribe2 = navigation.addListener('blur', () => {
      dispatch(showTabbar())
    });

    return () => {
      unsubscribe();
      unsubscribe2();
    };
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        {/* <Text style={styles.titleHeader}>Chats</Text> */}
      </View>

      <View style={styles.containerFull}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => goBack()}
          >
            <LeftIcon
              height={42}
              width={42}
              weight={1.3}
              color={textPrimaryColor}
            />
          </TouchableOpacity>
          <Text style={{ fontSize: 29, color: 'black', fontWeight: 'bold', marginLeft: 10 }}>Tạo sản phẩm</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <KeyboardAwareScrollView>
            <ProductForm
              submitButtonTitle="Tạo sản phẩm"
              isEdit={false}
            />
            <View style={{ height: 100, width: 1 }}></View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </SafeAreaView >
  );
};

export default CreateProductScreen;

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 22,
    marginTop: 25,
    marginVertical: 10
  },
  titleHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black'
  },
  containerFull: {
    flex: 1
  },
  backButton: {
    height: 42,
    width: 42,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    borderWidth: 1,
    borderRadius: 10,
  },
  rightIcon: {
    marginRight: 30,
  },
  leftIcon: {
    marginLeft: 20,
  },
});
