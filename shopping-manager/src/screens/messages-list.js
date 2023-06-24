import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, ActivityIndicator, Text, FlatList, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import MessageItem from '../components/shop/Message-item';
import { goBack } from '../uitls/naviation'
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import LeftIcon from '../components/icons/LeftIcon';
import { Colors } from '../constants/Colors';
import { hideTabbar, showTabbar } from '../redux/common/action';
const textPrimaryColor = `rgb(${Colors.text.primary})`;
const primaryColor = `rgb(${Colors.primary})`;
import { useNavigation } from "@react-navigation/native"
import { connect, useDispatch } from 'react-redux';

import firestore from '@react-native-firebase/firestore';




function MessageListComponent(props) {
    const { auth } = props;
    const navigation = useNavigation()
    const dispatch = useDispatch()
    // const [data, setData] = useState([1,2,3,3,3,3,3,3,3,33,3,3,3,3,3,3,33,3,3,3])
    const [data, setData] = useState([])
    const [isLoading, setLoading] = useState(true)

    let temp = []

    // const data = [
    //     {
    //         id: '1',
    //         avatar: 'http://woridnews.com/wp-content/uploads/2016/10/cd3e35dbcf23269780779b3f7b9e2fcc.png',
    //         name: 'Crush số 1',
    //         description: 'Message'
    //     },
    //     {
    //         id: '2',
    //         avatar: 'http://sphm-female-site-production.s3-ap-southeast-1.amazonaws.com/2017/07/w111-750x500.jpg',
    //         name: 'Crush số 2',
    //         description: 'Message'
    //     },
    //     {
    //         id: '3',
    //         avatar: 'https://bellanyc.com/wp-content/uploads/2017/06/blake-lively.jpg',
    //         name: 'Crush số 3',
    //         description: 'Message'
    //     },
    //     {
    //         id: '4',
    //         avatar: 'https://d1o7cxaf8di5ts.cloudfront.net/file/brand/member-girlcrush-BM.jpg?d=200',
    //         name: 'Crush số 4',
    //         description: 'Message'
    //     },
    // ];

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(hideTabbar())
        });

        const unsubscribe2 = navigation.addListener('blur', () => {
            dispatch(showTabbar())
        });


        temp = []
        const subscriber = firestore()
            .collection('listchats')
            .doc(auth.shop.id)
            .collection('listchats')
            .orderBy('createdAt', 'desc')
            .onSnapshot(onResult => {
                let temp = []
                console.log(onResult._docs.length, 'on');
                let i = 0;
                onResult.forEach(doc => {

                    let item = doc.data();
                    firestore()
                        .collection('customer')
                        .doc(doc.id)
                        .get()
                        .then(user => {
                            i++;
                            item = { ...item, name: user.data()?.name, urlAvt: user.data()?.urlAvt, id: user.data()?.id };
                            temp.push(item);
                            // console.log(temp, 'item');
                            if (i == onResult._docs.length) {
                                setData(temp)
                                setLoading(false)
                            }
                        });
                });

            }, err => err);




        // fetchMyAPI()


        return () => {
            subscriber();
            unsubscribe();
            unsubscribe2();
        };
    }, [navigation]);

    if (isLoading)
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
                        <Text style={{ fontSize: 29, color: 'black', fontWeight: 'bold', marginLeft: 10 }}>Chats</Text>
                    </View>
                    <View style={styles.container}>
                        <View style={{ flex: 1 }}>
                            <ActivityIndicator size='small' color={primaryColor} />
                        </View>
                    </View>
                </View>


            </SafeAreaView >
        );

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
                    <Text style={{ fontSize: 29, color: 'black', fontWeight: 'bold', marginLeft: 10 }}>Chats</Text>
                </View>
                <View style={styles.container}>
                    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>

                        {data.map((item, index) => <MessageItem key={index} item={item} />)}
                        {/* {data.map((item, index) => <Text style={{color:"black"}} key={index}>fdffdfdfdf</Text>)} */}
                    </ScrollView>
                </View>
            </View>


        </SafeAreaView >
    );
};

const Store = ({ shop }) => {
    return (
        <View style={styles.center}>
            <Image
                source={{ uri: shop.urlAvt }}
                style={styles.avatar}
            />
            <View>
                <Text style={styles.nameTittle}>{shop.name}</Text>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.isOnline}>Online</Text>
                </View>
            </View>
        </View>
    )
}

const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: 'white',
        borderTopColor: "#E5E5E5",
        borderTopWidth: 5
    },
    header: {
        marginHorizontal: 22,
        marginTop: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'black',
        padding: 20
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderTopWidth: 5,
        borderTopColor: "#E5E5E5",
        marginTop: 10
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
});



const mapStateToProps = state => {
    return {
        auth: state.auth
    };
};

const MessageList = connect(mapStateToProps)(MessageListComponent);
export default function (props) {
    return <MessageList />;
}