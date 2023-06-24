import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import BackButton from './BackButton';
const width = Dimensions.get('window').width;
const HeaderEdit = ({title, navigation,textButton}) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View
        style={{
          ...styles.headerStyle,
          justifyContent: 'space-between',
        }}>
        <View style={styles.topHearder}>
          <BackButton goBack={navigation.goBack} />
          <View style={{width: width * (39/ 100), alignItems: 'center'}}>
            <Text style={styles.textTop}>{title}</Text>
          </View>

          <TouchableOpacity>
            <Text style={{...styles.textTop, left: width * (21 / 100)}}>
            {textButton}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default HeaderEdit;

const styles = StyleSheet.create({
  headerStyle: {
    height: 70,
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
  },
  topHearder: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
  },
  textTop: {
    fontSize: 18,
    paddingTop: 30,
  },
});
