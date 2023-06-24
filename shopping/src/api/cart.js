import firestore from '@react-native-firebase/firestore';

export const updateCart = (id, data={}) => {
    firestore()
        .collection('carts')
        .doc(id)
        .update({
            items: data,
        })
}

export const removeCart = (id) => {
    firestore()
        .collection('carts')
        .doc(id)
        .delete()
}

export const createCart = (idCart)=>{
    firestore()
    .collection('carts')
    .doc(idCart)
    .set({
        id:idCart,
        items:[]
    })
}

export const addToCartAPI =async (id, callback)=>{
  await firestore()
      .collection('carts')
      .doc(id)
      .get()
      .then(querySnapshot => {
        if (querySnapshot._exists) {
           const temp = []
           let totalAmout = 0;
           for (const doc of querySnapshot._data?.items) {
             temp.push(doc)
             totalAmout +=  doc.price * doc.quantity
           }
           callback(temp)
        }

      })
      .catch()

      return []
}