import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, Alert } from 'react-native';

import { Colors } from '../../constants/Colors';
import ActionButton from '../shop/ActionButton';
// const width = Dimensions.get('window').width / 2 - 15
import firestore from '@react-native-firebase/firestore';
import { connect, useDispatch } from 'react-redux'
const widthScreen =  Dimensions.get('window').width

const width = (widthScreen- 15*3)/2 > 170 ? 170: (widthScreen- 15*3)/2

const CARD_HEIGHT = 290;

const shadowOpts = {
  // width: 320,
  height: CARD_HEIGHT,
  color: '#0f0521',
  border: 33,
  radius: 20,
  opacity: 0.03,
  style: {
    // The parent view that contains all the content
    height: CARD_HEIGHT,
    width: 310,
    marginTop: 20
  },
};

const ProductItem = ({
  product,
  // onActionPress,
  navigationRoute,
  ActionIcon,
  actionTitle,
  params,
  hideActionButton,
  auth,
  cart
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const onItemPress = useCallback(() => {
    navigation.navigate(navigationRoute, {
      product,
    });
  }, [product]);

  const onActionPress = () => {
    Alert.alert(
      "Xóa sản phẩm",
      "Chắc chắn bạn muốn xóa sản phẩm này?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: () => firestore().collection('products').doc(product.id).delete()
        }
      ]
    );
  }


  return (
    // <BoxShadow setting={shadowOpts}>
    <TouchableOpacity activeOpacity={0.6} onPress={onItemPress}>
      <View style={{ ...styles.contentContainer, height: hideActionButton ? 250 : CARD_HEIGHT }}>
        <Image style={[styles.image]} source={{ uri: product.imageUrl }} resizeMode='cover' />
        <View style={styles.infoSection}>
          <View style={styles.details}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>{product.price.toFixed(0).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.")} đ</Text>
          </View>
          {!hideActionButton && (
            <ActionButton
              title={actionTitle}
              Icon={ActionIcon}
              onPress={onActionPress}
              prodId={product.id}
              product={product}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
    // </BoxShadow>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    cart: state.cart
  };
};

export default connect(mapStateToProps)(ProductItem);
const styles = StyleSheet.create({
  contentContainer: {
    height: CARD_HEIGHT,
    width: width,
    backgroundColor: 'white',
    borderRadius: 20,
    overflow: 'hidden',
    marginLeft: (widthScreen - width * 2) / 3,
    marginTop: 10,
    marginBottom: 3,
    borderColor: `rgb(${Colors.text.secondary})`,
    // borderWidth: 0.2,
  },
  image: {
    borderRadius: 20,
    width: width,
    height: width - 30,
  },
  infoSection: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginTop: 5,
    flex: 1
  },
  details: {
    alignItems: 'center'
  },
  title: {
    fontFamily: 'Lato-Regular',
    fontSize: 15,
    color: `rgb(${Colors.text.primary})`,
    marginBottom: 8,
    marginTop: 0,
    textAlign: 'center',
  },
  price: {
    marginBottom: 8,
    fontFamily: 'Lato-Black',
    fontSize: 16,
    color: `rgb(${Colors.text.primary})`,
    marginLeft: 10,
    marginRight: 10,
  },
});
