import firestore from '@react-native-firebase/firestore';

export const getUser = (id) =>
    firestore().collection('shop').doc(id).get();

export const getShop = (id) =>
    firestore().collection('shop').doc('shop').get();

export const createUser = (id, data) =>
    firestore().collection('customer').doc(id).set(data);



export const updateAddress = (address, region) =>
    firestore()
        .collection('shop')
        .doc('shop')
        .update({
            addressString: address,
            addressMap: region
        })

export const updateName = (id, name) =>
    firestore()
        .collection('shop')
        .doc(id)
        .update({
            name
        })

export const updateNameShop = (name) =>
    firestore()
        .collection('shop')
        .doc('shop')
        .update({
            name
        })

export const updatePhone = (id, phone) =>
    firestore()
        .collection('shop')
        .doc(id)
        .update({
            phone
        })

export const updatePhoneShop = (phone) =>
    firestore()
        .collection('shop')
        .doc('shop')
        .update({
            phone
        })

export const updateGender = (id, gender) =>
    firestore()
        .collection('shop')
        .doc(id)
        .update({
            gender
        })

export const updateBirthday = (id, birthday) =>
    firestore()
        .collection('shop')
        .doc(id)
        .update({
            birthday
        })

export const updateAvatar = (id, urlAvt) =>
    firestore()
        .collection('shop')
        .doc(id)
        .update({
            urlAvt
        })

export const updateAvatarShop = (urlAvt) =>
    firestore()
        .collection('shop')
        .doc('shop')
        .update({
            urlAvt
        })


