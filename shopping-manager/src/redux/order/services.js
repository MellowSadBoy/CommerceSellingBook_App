import firestore from '@react-native-firebase/firestore';

export const getOrders = () =>
    firestore().collection('orders').orderBy('createdAt', 'desc').get()





