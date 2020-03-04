import * as actionTypes from './actionTypes';
import axios from 'axios';

export const logout = () =>{
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) =>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout())
        },expirationTime * 1000)
    }
}

export  const authStart= () =>{
    return {
        type:actionTypes.AUTH_START
    }
}

export const authSuccess = (token,userId) =>{
    return {
        type:actionTypes.AUTH_SUCCESS,
        token:token,
        userId:userId    
    }
}

export const authFail = (error) =>{
    return {
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const auth =(email,password) =>{
    return dispatch=>{
       
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBOofUDHWaKVHp3eOEU0ZxQVSU5_TpAlsM',authData)
        .then((response)=>{
            console.log(response.data.idToken)
            dispatch(authStart());
            
            dispatch(authSuccess(response.data.idToken,response.data.localId));
          
            // dispatch(checkAuthTimeout(response.data.expiresIn));
        }).catch((err)=>{
            dispatch(authFail(err))
            console.log(err);
        })
    }
}