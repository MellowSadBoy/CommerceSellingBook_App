import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomerForm from '../components/shop/CustomerForm';
import LeftIcon from '../components/icons/LeftIcon';
import { Colors } from '../constants/Colors';
import { goBack } from '../uitls/naviation'
const textPrimaryColor = `rgb(${Colors.text.primary})`;
const primaryColor = `rgb(${Colors.primary})`;
import { useNavigation } from "@react-navigation/native"
import { hideTabbar, showTabbar } from '../redux/common/action';
import { connect, useDispatch } from 'react-redux';

const EditCustomerScreen = ({ route }) => {
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const customer = route.params
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
          <Text style={{ fontSize: 29, color: 'black', fontWeight: 'bold', marginLeft: 10 }}>Xem khách hàng</Text>
        </View>
        <View style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <KeyboardAwareScrollView>
                <CustomerForm
                  submitButtonTitle="Lưu"
                  // onSubmit={submit}
                  customer = {customer}
                />
                <View style={{height:100}}></View>
              </KeyboardAwareScrollView>
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView >
  );
};

export default EditCustomerScreen;

const styles = StyleSheet.create({
  header: {
    marginHorizontal: 22,
    // marginVertical: 10,
    marginTop: 5
  },
  titleHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black'
  },
  containerFull: {
    flex: 1
  },
  container:{
    marginTop:10,
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
  center: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    marginLeft: 10
  },
});