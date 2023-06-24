import React, {useCallback} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet,Dimensions, Text, View, Image, TouchableOpacity} from 'react-native';
import {BoxShadow} from 'react-native-shadow';

import {Colors} from '../constants/Colors';
import ActionButton from '../components/shop/ActionButton';

const CARD_HEIGHT = 280;
const width= Dimensions.get('window').width/2 - 15
// const shadowOpts = {
//   width: 320,
//   // width: '40%',
//   height: 250,
//   color: '#0f0521',
//   border: 33,
//   radius: 20,
//   opacity: 0.03,
//   // x: 15,
//   // y: 25,
//   style: {
//     // The parent view that contains all the content

//     height: CARD_HEIGHT,
//     width: '45%',
//     // flex:0.5,
    
//     // marginBottom: 10,
//     marginTop:20

//     // marginHorizontal: 30,
//     // marginLeft: 30,
//   },
// };

const PurchasedProduct = ({
  product,
  onActionPress,
  navigationRoute,
  ActionIcon,
  actionTitle,
  params,
  hideActionButton,
}) => {
  const navigation = useNavigation();

  const onItemPress = useCallback(() => {
    navigation.navigate(navigationRoute, {
      // prodId: product.id,
      // title: product.title,
    });
  }, [product]);

  const actionPressHandler = useCallback(() => {
    if (params) {
      onActionPress(product, params);
      return;
    }
    onActionPress(product);
  }, [product, params]);

  return (
    // <BoxShadow setting={shadowOpts}>
      <TouchableOpacity activeOpacity={0.8} onPress={onItemPress}>
        <View style={styles.contentContainer}>
          <Image style={[styles.image]} source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_ZRrKGEKEnJDcugtqnCvWPYfq9za-H5lJ5Q&usqp=CAU'}} resizeMode='cover'/>
          <View style={styles.infoSection}>
            <View style={styles.details}>
              <Text style={styles.title}>Puma</Text>
              <Text style={styles.price}>${183}</Text>
            </View>
            {/* {!hideActionButton && (
              <ActionButton
                title={actionTitle}
                Icon={ActionIcon}
                onPress={actionPressHandler}
                // prodId={product.id}
              />
            )} */}
          </View>
        </View>
      </TouchableOpacity>
    // </BoxShadow>
  );
};

export default React.memo(PurchasedProduct);

const styles = StyleSheet.create({
  contentContainer: {
    height: 270,
    width: width,
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    marginLeft: 10,
    elevation:1.5,
    marginTop: 10,
    marginBottom: 3,
  },
  image: {
    borderRadius: 20,
    width: width,
    height: width,
  },
  infoSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 10
  },
  details: {
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Lato-Regular',
    fontSize: 18,
    color: `rgb(${Colors.text.primary})`,
    marginBottom: 8,
    marginTop: 0,
    textAlign: 'center',
  },
  price: {
    marginBottom: 8,
    fontFamily: 'Lato-Black',
    fontSize: 18,
    color: `rgb(${Colors.text.primary})`,
    marginLeft: 10,
    marginRight: 10,
  },
});
