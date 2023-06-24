import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const ProfileItem = ({icon, onPress, name, content}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.itemContainer}>
        <MaterialCommunityIcons name={icon} size={26} color="#1e1e1e" />
        <Text style={[styles.itemText, {marginLeft: icon ? 20 : 0}]}>
          {name}
        </Text>
        <Text style={styles.content}>{content}</Text>
        <FontAwesome name="angle-right" size={26} color="#1e1e1e" />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileItem;

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    margin: 0.5,
  },
  itemText: {
    flex: 1,
    color: '#1e1e1e',
  },
  content: {
    color: '#1e1e1e',
    right: 5,
    // fontSize:18
  },
});
