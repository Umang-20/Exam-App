import * as types from './actionTypes'
import {auth} from '../firebase'
import axios from 'axios'


const registerStart=()=>({
    type:types.REGISTER_START
})
const registerSuccess=(user)=>({
    type:types.REGISTER_SUCCESS,
    payload:user
})
const registerFail=(error)=>({
    type:types.REGISTER_FAIL,
    payload:error
})

const loginStart=()=>({
    type:types.LOGIN_START
})
const loginSuccess=(user)=>({
    type:types.LOGIN_SUCCESS,
    payload:user
})
const loginFail=(error)=>({
    type:types.LOGIN_FAIL,
    payload:error
})

const logoutStart=()=>({
    type:types.LOGOUT_START
})
const logoutSuccess=()=>({
    type:types.LOGOUT_SUCCESS,
})
const logoutFail=(error)=>({
    type:types.LOGOUT_FAIL,
    payload:error
})

export const registerInitiate=(email,password,isAdmin)=>{
    const data={
        email:email,
        password:password,
        returnSecureToken:true
    }
    return async function (dispatch){
        dispatch(registerStart())
       await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD6RzUKe6scQirxQ_PQCV_3-NFlB5jNstY',data).then(async (user)=>{
           if(isAdmin){
               await axios.post('https://admin-user-authentication-default-rtdb.firebaseio.com/Admin.json',{
                   uid:user.data.localId
               })
           }
        dispatch(registerSuccess())
       
       }).catch((error)=>
       { 
        dispatch(registerFail(error.response.data.error.message))
    })
    }
    
} 

export const loginInitiate=  (email,password)=>{

    const userdata={
        email:email,
        password:password,
        returnSecureToken:true
    }
    return async function (dispatch){
        const admindata=[]
        dispatch(loginStart());
        await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD6RzUKe6scQirxQ_PQCV_3-NFlB5jNstY',userdata).then(async (user)=>{
        await axios.get('https://admin-user-authentication-default-rtdb.firebaseio.com/Admin.json').then((user1=>{
            for(let key in user1.data){
              admindata.push(user1.data[key].uid)
            }
            const isadmin=admindata.find(element=>element === user.data.localId)
            if(isadmin){

                dispatch(loginSuccess({
                    data:user.data,
                    admin:true,
                    redirect:'/dashboard'
                }))
            }else{
                dispatch(loginSuccess({
                    data:user.data,
                    admin:false,
                    redirect:'/user-login'
                }))
            }
        }))
        
       }).catch((error)=>
       { 
        dispatch(loginFail(error.response.data.error.message))
    })
        
    }
}

export const logoutInitiate=()=>{
    return async function (dispatch){
        dispatch(logoutStart())
      await auth.signOut().then((resp)=> {
              dispatch(logoutSuccess())
          // setTimeout(()=>{
          //
          // },800)
        }
        ).catch((error)=>dispatch(logoutFail(error.message)))
    }
}

export const Reset_Error = () =>{
    return{
        type:types.RESET_ERROR,
    }
}

