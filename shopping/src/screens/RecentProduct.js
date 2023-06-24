import React, { useState, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, FlatList, View, SafeAreaView, TouchableWithoutFeedback, StatusBar, Text, Dimensions, Keyboard, RefreshControl, ActivityIndicator, useWindowDimensions } from 'react-native';

import { Colors } from '../constants/Colors';
const primaryColor = `rgb(${Colors.primary})`;
const textSecondaryColor = `rgba(${Colors.text.secondary}, 0.7)`;
import ProductItem from '../components/shop/ProductItem';
import Icon from '../components/icons/LightIcons';
import { connect, useDispatch } from 'react-redux'
import { getRecentProducts } from '../redux/recent-product/action';
const CartIcons = () => <Icon name="cart-o" color="white" size={16} />;

const RecentProduct = (props) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [column, setColumn] = useState(2)

  const { recent, auth } = props

  const dispatch = useDispatch()


  useEffect(() => {
    if (recent.items.length < 1) { dispatch(getRecentProducts(auth.user.id)) }
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <ProductItem
        product={item}
        navigationRoute="ProductDetail"
        ActionIcon={CartIcons}
        actionTitle="Thêm vào giỏ hàng"
      // onActionPress={addToCart}
      // onActionPress={() => { }}
      />
    ),
    [],
  );
  const loadData = async () => {
    dispatch(getRecentProducts(auth.user.id))
  }
  const refreshControl = useCallback(() => {
    return (
      <RefreshControl
        refreshing={isRefreshing}
        onRefresh={async () => {
          setIsRefreshing(true);
          // setLimit(v => v + 100)
          await loadData();
          setIsRefreshing(false);
        }}
        tintColor={primaryColor}
        colors={[primaryColor]}
      />
    );
  }, []);

  if (recent.isLoading) {
    return (
      <SafeAreaView>
        <TouchableWithoutFeedback accessible={false}>
          <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
              <Text style={styles.titleHeader}>Đã xem gần đây</Text>
            </View>
            <View style={styles.centered}>
              <ActivityIndicator size="large" color={primaryColor} />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }

  if (recent.items.length < 1) {
    return (
      <SafeAreaView>
        <TouchableWithoutFeedback accessible={false}>
          <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
              <Text style={styles.titleHeader}>Đã xem gần đây</Text>
            </View>
            <View style={styles.centered}>
              <Text style={styles.errorMessage}>Không có sản phẩm</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }

  // if (error.type === NO_PRODUCTS) {
  //   return (
  //     <View style={styles.centered}>
  //       <Icon
  //         name="emoticon-sad-outline"
  //         size={26}
  //         color={`rgba(${Colors.text.secondary}, 0.6)`}
  //       />
  //       <Text style={styles.errorMessage}>{error.message}</Text>
  //     </View>
  //   );
  // }

  // if (error.type === REQUEST_NETWORK_ERROR && !products.length) {
  //   return <ErrorScreen errorMessage={error.message} onRetry={loadData} />;
  // }

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback accessible={false}>
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <View style={styles.header}>
            <Text style={styles.titleHeader}>Đã xem gần đây</Text>
          </View>
          <FlatList
            numColumns={2}
            // centerContent = {true}
            columnWrapperStyle={{ justifyContent: 'flex-start' }}
            refreshControl={refreshControl()}
            data={recent.items}
            // contentContainerStyle={{justifyContent:'flex-start'}}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    recent: state.recent
  };
};

export default connect(mapStateToProps)(RecentProduct);

const width = Dimensions.get('window').width
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // marginTop: StatusBar.length,
    height: '100%'
  },
  header: {
    marginHorizontal: 22,
    marginTop: 40,
    marginVertical: 5,
    paddingLeft: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black'
  },
  inputSearch: {
    width: width - 22 * 2 - 26 - 50,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    paddingVertical: 0
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 100,
  },
  errorMessage: {
    fontFamily: 'Lato-Bold',
    color: textSecondaryColor,
    fontSize: 16,
    marginTop: 10,
  },

});
