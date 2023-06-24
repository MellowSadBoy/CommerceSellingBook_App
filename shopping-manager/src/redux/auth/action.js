import * as Actions from './constants'


export const login = (payload)=>{
    return{
        type:Actions.LOGIN,
        payload
    }
}

export const getUser = (payload)=>{
    return{
        type:Actions.GET_USER,
        payload
    }
}

export const signup = (payload)=>{
    return{
        type:Actions.SIGNUP,
        payload
    }
}
export const updateAddress = (address, region)=>{
    return{
        type:Actions.UPDATE_ADDRESS,
        payload:{address, region}
    }
}

export const updateName = (uid, name)=>{
    return{
        type:Actions.UPDATE_NAME,
        payload:{uid, name}
    }
}

export const updateNameShop = ( name)=>{
    return{
        type:Actions.UPDATE_NAME_SHOP,
        payload:{ name}
    }
}

export const updatPhone = (uid, phone)=>{
    return{
        type:Actions.UPDATE_PHONE,
        payload:{uid, phone}
    }
}

export const updatPhoneShop = (phone)=>{
    return{
        type:Actions.UPDATE_PHONE_SHOP,
        payload:{ phone}
    }
}

export const updateGender = (uid, gender)=>{
    return{
        type:Actions.UPDATE_GENDER,
        payload:{uid, gender}
    }
}

export const updateBirthday = (uid, birthday)=>{
    return{
        type:Actions.UPDATE_BIRTHDAY,
        payload:{uid, birthday}
    }
}

export const updateAvatar = (uid, urlAvt)=>{
    return{
        type:Actions.UPDATE_URLAVT,
        payload:{uid, urlAvt}
    }
}

export const updateAvatarShop = (urlAvt)=>{
    return{
        type:Actions.UPDATE_URLAVT_SHOP,
        payload:{urlAvt}
    }
}