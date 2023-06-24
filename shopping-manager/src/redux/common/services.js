import firestore from '@react-native-firebase/firestore';

export const getShop = () =>
    firestore()
        .collection('shop')
        .limit(1)
        .get()
        .then(doc => {

        })

export const createPartnerId = (uid1, uid2) =>
    firestore()
        .collection('partnerMessageKey')
        .where('mergeUid', 'in', [uid1 + uid2, uid2 + uid1])
        .get()
        .then(doc => {
            console.log(doc);
        })


export const createListChats = (uid, ortherId, data) =>
    firestore()
        .collection('listchats')
        .doc(uid)
        .collection('listchats')
        .doc(ortherId)
        .set({
            newMessage:'hello',
            ownerIdMessage:'QVO8UUOel5bFQhE9LAbL8qd25dE2',
            partnerMessageKey:'dsd',
            createdAt: firestore.Timestamp.now(),
            name:'Nguyễn Thành Lộc',
            urlAvt:'fdfd'
        })






