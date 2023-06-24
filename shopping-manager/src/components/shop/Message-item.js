import React from 'react';
import { Image, Text, TouchableOpacity, View, StyleSheet, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { Colors } from '../../constants/Colors';
const primaryTextColor = `rgb(${Colors.text.primary})`;
import * as NavigationServices from '../../uitls/naviation'


export default Item = ({ item  }) => {
    const time = new Date(item.createdAt.seconds * 1000)

    const onPress = ()=>{
        NavigationServices.navigate("Message-detail", item)
    }
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.bgAvatar}>
                    <Image
                        source={{ uri: item?.urlAvt }}
                        style={styles.avatar}
                    />
                </View>
                <View style={styles.info}>
                    <Text style={styles.name}>{item?.name}</Text>
                    <Text numberOfLines={1} style={{marginLeft:5, color:primaryTextColor, flexWrap:'nowrap', }}>{item?.newMessage}</Text>
                </View>
                <View style={styles.bgSeen}>
                    <View style={{flexDirection:'row', justifyContent:"center", alignItems:'center'}}>
                        <AntDesign  name='clockcircleo' color={`rgba(${Colors.primary},0.5)`} size={14} />
                        <Text style={styles.time}>{time.getDate()}-{time.getMonth() + 1}-{time.getFullYear()} {time.getHours() > 9 ? time.getHours() : ('0' + time.getHours())}:{time.getMinutes() > 9 ? time.getMinutes() : ('0' + time.getMinutes())}</Text>
                    </View>
                    <Image
                        source={{ uri: item?.urlAvt }}
                        style={styles.avatarSeen}
                    />
                </View>
            </View>
        </TouchableOpacity>
    )
}
const { width } = Dimensions.get('window')
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: `rgba(${Colors.primary},0.2)`
    },
    bgAvatar: {
        flex: 2
    },
    avatar: {
        width: 46,
        height: 46,
        borderRadius: 23,
    },
    info: {
        flex: 8,
        flexDirection: 'column',
        paddingLeft: 10,
        justifyContent: 'center'

    },
    name: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 16,
        paddingBottom: 3,
        marginLeft:5
    },
    bgSeen: {
        // flex: 2,
        alignItems: 'flex-end',
        justifyContent: 'space-around'
    },
    time: {
        color: '#A2A2A2',
        fontSize: 14,
        marginLeft: 5,
        color: `rgba(${Colors.primary},0.5)`

    },
    avatarSeen: {
        width: width * 5 / 100,
        height: width * 5 / 100,
        borderRadius: width * 2.5 / 100,
    },
})