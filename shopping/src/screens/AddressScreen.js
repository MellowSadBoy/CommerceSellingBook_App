import React, { useState }  from 'react';
import { Text, View, StyleSheet,  TextInput,TouchableOpacity,ScrollView, Switch} from 'react-native';
import {Colors} from '../constants/Colors';

const primaryLightColor = `rgba(${Colors.primary}, 0.8)`;

const AddressItem = ({name,key} ) => (
    <View style={styles.itemContainer}>
      <TextInput    
                    style={styles.itemText}
                    placeholder = {name}
                    autoCapitalize = "none"
                />
    </View>

);

export default function Address(props) {
  const {navigation} = props;
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  return (
    <View style={styles.container}>
        <ScrollView>
            <Text style={styles.itemName}>Liên hệ  </Text>
            <AddressItem  name="Họ và tên"/>
            <View style={styles.itemContainer}>
            <TextInput    
                    style={styles.itemText}
                    placeholder = 'số điện thoại'
                    keyboardType = 'numeric'
                    autoCapitalize = "none"
                />
            </View>
            <Text style={styles.itemName}> Địa chỉ</Text>
            <AddressItem  name="Tỉnh/Thành phố, Quận huyện " />
            <AddressItem  name="Tên đường, Toà nhà, Số nhà" />
            <Text style={styles.itemName}> Cài đặt </Text>
            <View style={styles.itemContainer}>
                <Text style={styles.txtSetting}>Đặc làm địa chỉ mặc định </Text>
                <Switch
                    trackColor={{ false: "#767577", true: "#9ACD32" }}
                    thumbColor={isEnabled ? "#f4f3f4" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
             </View>

        {/* nút đăng xuất*/}
        <View style={styles.buttonstyle}>
            <TouchableOpacity>
            <Text style={styles.btnName} >Hoàn Thành </Text>
            </TouchableOpacity>
        </View>
      </ScrollView>
    </View>

  );
};
const styles = StyleSheet.create({

  container: {
    backgroundColor: "#F5F5F5",
    height:'100%',
    
    
    paddingTop: 70,
  },
  itemContainer: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    margin:1,
    width:'100%',
    
  },
  itemText: {
    flex: 1,
    height: 50,
    width:'100%',
    paddingLeft:10,
    color:'#1e1e1e',
  },
   itemName: { 
    margin:10,
    color:'#696969',
  },
  buttonstyle:{
    backgroundColor: primaryLightColor,
    margin:30,
    paddingVertical: 13,
  },
  btnName:{
    textAlign:'center',
    color:'white',
    fontSize:16,
  },
  txtSetting:{
    flex: 1,
    width:'100%',
    paddingLeft:10,
    color:'#1e1e1e',
 
  }
});
