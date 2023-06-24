import React, { useState } from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import ProfileItem from '../components/shop/ProfileItem';
const width = Dimensions.get('window').width;
import DatePicker from 'react-native-date-picker';
import RNPickerSelect from 'react-native-picker-select';
import LeftIcon from '../components/icons/LeftIcon';
import { Colors } from '../constants/Colors';
const textPrimaryColor = `rgb(${Colors.text.primary})`;
const primaryColor = `rgb(${Colors.primary})`;
import { goBack } from '../uitls/naviation'
import { connect, useDispatch } from 'react-redux';
import { updateGender,updateBirthday } from '../redux/auth/action';

function AccountInformation({ navigation, auth }) {
  const [date, setDate] = useState(new Date(auth.user.birthday?.seconds ? auth.user.birthday?.seconds*1000: 10000000));
  const [open, setOpen] = useState(false);
  const [gender, setGender] = useState(auth.user.gender);
  const [fullDate, setFullDate] = useState(date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear(),);
  const dispatch = useDispatch()
  const formatDate = (date) => {
    setFullDate(
      date.getDate() + '-' + (date.getMonth() + 1) + '-' + date.getFullYear(),
    );
  };

  const onChangeGender = (value) => {
    setGender(value)
    dispatch(updateGender(auth.user.id, value))
  }

  const onDateChange = (date) => {
    dispatch(updateBirthday(auth.user.id, date))
    setOpen(false);
    setDate(date);
    formatDate(date);
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.header}>
        {/* <Text style={styles.titleHeader}></Text> */}
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
          <Text style={styles.titleHeader}>Sửa hồ sơ</Text>
        </View>
        <View style={styles.container}>
          <ScrollView style={{ flex: 1 }}>
            <View style={styles.item}>
              <ProfileItem
                name="Tên"
                content={auth.user.name}
                onPress={() =>
                  navigation.navigate('EditName')
                }
              />
            </View>

            <View style={styles.item}>
              <ProfileItem
                name="Điện thoại"
                content={auth.user.phone ? auth.user.phone : 'Chưa thêm số điện thoại'}
                onPress={() =>
                  navigation.navigate('EditPhone')
                }
              />
              <ProfileItem
                name="Email"
                content={auth.user.email}
                onPress={() =>
                  navigation.navigate('EditEmail')
                }
              />
              <RNPickerSelect
                placeholder={{
                  label: 'Giới Tính',
                  value: gender,
                }}
                useNativeAndroidPickerStyle={false}
                onValueChange={onChangeGender}
                items={[
                  { label: 'Nam', value: 'Nam' },
                  { label: 'Nữ', value: 'Nữ' },
                ]}>
                <ProfileItem name="Giới tính" content={gender} />
              </RNPickerSelect>
              <ProfileItem
                name="Ngày sinh"
                content={fullDate}
                onPress={() => setOpen(true)}
              />
              <DatePicker
                modal
                open={open}
                date={date}
                mode="date"
                onConfirm={date => {
                  onDateChange(date)
                }}
                onCancel={() => {
                  setOpen(false);
                }}
                // textColor={primaryColor}
                // fadeToColor={'red'}
                style={{ backgroundColor: 'red' }}
              />
              <ProfileItem name="Tài khoản mạng xã hội" />
            </View>

            <View style={styles.item}>
              <ProfileItem
                onPress={() => navigation.navigate('OldPassword')}
                name="Thay đổi mật khẩu"
              />
            </View>
            <View style={{ height: 30 }}></View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView >
  );
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};
export default connect(mapStateToProps)(AccountInformation);


const styles = StyleSheet.create({
  header: {
    marginHorizontal: 22,
    marginTop: 25,
    marginVertical: 10
  },
  titleHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 10
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
  center: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'center',
    marginLeft: 10
  },
  container: {
    backgroundColor: `rgb(${Colors.background})`,
    marginTop: 15,
    flex: 1,
  },
  name: {
    fontSize: 22,
    color: '#000000',
    fontWeight: '600',
  },

  itemContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
  },
  itemText: {
    flex: 1,
    color: '#1e1e1e',
  },
  item: {
    // marginTop: 15,
    color: '#696969',
  },
});
