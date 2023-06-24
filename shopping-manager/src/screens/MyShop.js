import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, Image, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Swiper from 'react-native-swiper';
import {Colors} from '../constants/Colors';

const image = { uri: "https://nld.mediacdn.vn/2018/10/22/cac-1540172564584378801026.jpg" };
const section_banner = { uri: "https://nld.mediacdn.vn/2018/10/22/cac-1540172564584378801026.jpg" }
const width= Dimensions.get('window').width/3 - 15

//Hiển thị số đếm lúc chuyển sang slide mới

// const renderPagination = (index, total, context) => {
//     return (
//         <View style={styles.paginationStyle}>
//             <Text style={{ color: 'grey' }}>
//                 <Text style={styles.paginationText}>{index + 1}</Text>/{total}
//             </Text>
//         </View>
//     )
// }

export default function App() {
    return (
        <ScrollView>
            {/* header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                    </ImageBackground>
                    <View style={styles.columnAvt}><Image style={styles.avatar}
                        source={{ uri: 'https://toigingiuvedep.vn/wp-content/uploads/2021/05/hinh-anh-avatar-de-thuong.jpg' }} />
                    </View>
                    <View style={styles.columnInfo}>
                        <Text style={styles.name}>ldmh_Sneacker</Text>
                        <View style={styles.follow}>
                            <TouchableOpacity><Text style={{ color: 'white', marginRight: 8, fontWeight: 'bold' }}>Người theo dõi: 18k</Text></TouchableOpacity>
                            <Text style={{ color: 'white', marginRight: 8 }}>|</Text>
                            <TouchableOpacity><Text style={{ color: 'white', fontWeight: 'bold' }}>Đang theo dõi: 123</Text></TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <FontAwesome name="star" size={18} color="#FFFF00" />
                            <FontAwesome name="star" size={18} color="#FFFF00" />
                            <FontAwesome name="star" size={18} color="#FFFF00" />
                            <FontAwesome name="star" size={18} color="#FFFF00" />
                            <FontAwesome name="star-half-o" size={18} color="#FFFF00" />
                        </View>
                    </View>
                </View>
            </View >

            {/* nav */}
            <View style={styles.bobyContainer}>
                <View style={styles.sectionContainer}>

                    <TouchableOpacity style={[styles.itemContainer, styles.itemSale]}>
                        <Text style={{ paddingRight: 5, fontWeight: 'bold', color: 'white' }}>SALE</Text>
                        <FontAwesome style={styles.iconContainer} name="fire" color="red" size={18} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemContainer}><Text style={{ fontWeight: 'bold', color: 'black' }}>Sản phẩm</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.itemContainer}><Text style={{ fontWeight: 'bold', color: 'black' }}>Videos</Text></TouchableOpacity>
                    <TouchableOpacity style={styles.itemContainer}><Text style={{ fontWeight: 'bold', color: 'black' }}>Bài viết</Text></TouchableOpacity>
                </View>
            </View>

            {/* banner */}
            <Swiper
                style={styles.wrapper}
                // renderPagination={renderPagination}
                loop={false}
            >
                <View style={styles.slide} title={<Text numberOfLines={1}></Text>}>
                    <Image style={styles.imageBanner} source={require('../assets/images/banner/1.jpg')} />
                </View>
                <View style={styles.slide} title={<Text numberOfLines={2}></Text>}>
                    <Image style={styles.imageBanner} source={require('../assets/images/banner/2.jpg')} />
                </View>
                <View style={styles.slide} title={<Text numberOfLines={3}></Text>}>
                    <Image style={styles.imageBannerage} source={require('../assets/images/banner/3.jpg')} />
                </View>
                <View style={styles.slide} title={<Text numberOfLines={1}></Text>}>
                    <Image style={styles.imageBanner} source={require('../assets/images/banner/4.jpg')} />
                </View>
            </Swiper>

            {/* product content */}
            <ScrollView horizontal={true}>
            <View style={styles.proContent}>
                <TouchableOpacity activeOpacity={0.8} >
                    <View style={styles.contentContainer}>
                        <Image style={[styles.imageP]} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_ZRrKGEKEnJDcugtqnCvWPYfq9za-H5lJ5Q&usqp=CAU' }} resizeMode='cover' />
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
                <TouchableOpacity activeOpacity={0.8} >
                    <View style={styles.contentContainer}>
                        <Image style={[styles.imageP]} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_ZRrKGEKEnJDcugtqnCvWPYfq9za-H5lJ5Q&usqp=CAU' }} resizeMode='cover' />
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
                <TouchableOpacity activeOpacity={0.8} >
                    <View style={styles.contentContainer}>
                        <Image style={[styles.imageP]} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_ZRrKGEKEnJDcugtqnCvWPYfq9za-H5lJ5Q&usqp=CAU' }} resizeMode='cover' />
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
                <TouchableOpacity activeOpacity={0.8} >
                    <View style={styles.contentContainer}>
                        <Image style={[styles.imageP]} source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_ZRrKGEKEnJDcugtqnCvWPYfq9za-H5lJ5Q&usqp=CAU' }} resizeMode='cover' />
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
            </View>
            </ScrollView>

            <TouchableOpacity style={styles.allViewText}><Text style={{ fontWeight: 'bold',fontSize: 16}}>Xem tất cả sản phẩm</Text></TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        // persistentScrollbar:'false',
        backgroundColor: "#DCDCDC",
        height: 120,

    },
    image: {
        flex: 1,
        width: '105%',
        height: 120,
        justifyContent: "center",
        opacity: 0.65,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        // zIndex: 100

    },
    headerContent: {
        position: 'relative',
        padding: 6,
        flexDirection: 'row',

        // alignItems: 'left',
    },
    columnAvt: {
        // padding:7
        margin: 5,
        paddingTop: 17,
    },
    columnInfo: {
        marginLeft: 10,
        // alignItems: "left",
        textAlign: "left",

    },
    avatar: {
        width: 65,
        height: 65,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
    },
    name: {
        //   marginLeft: 20,
        // textColor: "white",
        fontSize: 25,
        color: "#000000",
        fontWeight: '800',
    },
    userInfo: {
        fontSize: 16,
        color: "#778899",
        fontWeight: '600',
    },
    follow: {
        flexDirection: 'row',
        paddingVertical: 6
    },
    //---------------------- nav---------------------
    bobyContainer: {
        height: 50
    },
    sectionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
    },

    itemContainer: {
        flexDirection: 'row',
    },
    itemSale: {
        backgroundColor: '#6F2DA8',
        padding: 7,
        borderRadius: 5,
        height: 30,

    },

    // ----------------  banner-------------------------------------

    wrapper: {
        height: 150
    },

    slide: {
        // flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },

    imageBanner: {
        width: '100%',
        height: 100,
        // height:'100%',
        // flex: 1
    },
    paginationStyle: {
        position: 'absolute',
        // bottom: 10,
        // right: 10
    },
    paginationText: {
        color: 'black',
        fontSize: 20
    },

    // ------------------product content------------------------------------
    contentContainer: {
        height: 180,
        width: width,
        backgroundColor: 'white',
        borderRadius: 20,
        overflow: 'hidden',
        marginLeft: 10,
        elevation: 1.5,
        marginTop: 10,
        marginBottom: 3,
    },
    imageP: {
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
    proContent:{
        
        justifyContent: 'flex-start',
        flexDirection: 'row',
        numColumns: 3,
        // horizontal: 'true'
    },

    allViewText:{
        paddingVertical:10,
        // textAlign: 'center',
        marginBottom:30,
        alignItems: 'center',
    }

});
