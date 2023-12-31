import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import HeartOutlineIcon from '../icons/HeartOutlineIcon';
import HeartIcon from '../icons/HeartIcon';
import {Colors} from '../../constants/Colors';
import { connect, useDispatch } from 'react-redux'

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { addFavoriteProduct, removeFavoriteProduct} from '../../redux/favorite-product/action';

const FavoriteButton = ({
  isFavorite,
  product,
  // addToFavorite,
  // removeFromFavorite,
  auth
}) => {
  const scaleFilled = useSharedValue(0);
  const scaleOutline = useSharedValue(0);
  const outlineAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scaleOutline.value}],
  }));
  const filledAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scaleFilled.value}],
  }));
  const dispatch = useDispatch()
  useEffect(() => {
    if (isFavorite) {
      scaleFilled.value = withSpring(1, {stiffness: 150});
      scaleOutline.value = withSpring(0, {overshootClamping: true});
      return;
    }
    scaleOutline.value = withSpring(1, {damping: 15, stiffness: 150});
    scaleFilled.value = withSpring(0, {overshootClamping: true});
  }, [isFavorite]);

  const handleOnPress = () => {
    if (isFavorite) {
      // removeFromFavorite(product.id);
      dispatch(removeFavoriteProduct(auth.user.id, product.id))
      return;
    }
    dispatch(addFavoriteProduct(auth.user.id, product))
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.favButton}
      onPress={handleOnPress}>
      <Animated.View style={[outlineAnimatedStyle, styles.absolutePos]}>
        <HeartOutlineIcon
          height={48}
          width={48}
          color={`rgba(${Colors.text.primary}, 0.8)`}
        />
      </Animated.View>
      <Animated.View style={[filledAnimatedStyle, styles.absolutePos]}>
        <HeartIcon height={48} width={48} color={`rgba(${Colors.danger}, 1)`} />
      </Animated.View>
    </TouchableOpacity>
  );
};
const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(FavoriteButton);

const styles = StyleSheet.create({
  absolutePos: {
    position: 'absolute',
  },
  favButton: {
    height: 52,
    width: 52,
    backgroundColor: `rgba(255,255,255, 0.7)`,
    position: 'absolute',
    right: 30,
    bottom: 85,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
