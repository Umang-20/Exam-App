import * as types from '../Types/actionType'
import {auth} from '../../../firebase'
import {Admin} from "../../../api/queries";
import {getRequest, loginRequest, passwordResetRequest, postRequest, registorRequest} from "../../../api/request";


const registerStart = () => {
    return {
        type: types.REGISTER_START
    }
}

const registerSuccess = (user) => {
    return {
        type: types.REGISTER_SUCCESS,
        payload: user
    }
}

const registerFail = (error) => {
    return {
        type: types.REGISTER_FAIL,
        payload: error
    }
}

const loginStart = () => {
    return {
        type: types.LOGIN_START
    }
}

const loginSuccess = (user, user1) => {
    return {
        type: types.LOGIN_SUCCESS,
        payload: {
            user,
            adminUser: user1,
        }
    }
}

const loginFail = (error) => {
    return {
        type: types.LOGIN_FAIL,
        payload: error
    }
}

const logoutStart = () => {
    return {
        type: types.LOGOUT_START
    }
}

const logoutSuccess = () => {
    return {
        type: types.LOGOUT_SUCCESS,
    }
}

const logoutFail = (error) => {
    return {
        type: types.LOGOUT_FAIL,
        payload: error
    }
}

const resetPasswordStart = () => {
    return {
        type: types.RESET_PASSWORD_START,
    }
}

const resetPasswordSuccess = (user) => {
    return {
        type: types.RESET_PASSWORD_SUCCESS,
        payload: user,
    }
}

const resetPasswordFail = (error) => {
    return {
        type: types.RESET_PASSWORD_FAIL,
        payload: error
    }
}

export const Redirect = (path) => {
    return {
        type: types.REDIRECT,
        payload: {
            path,
        }
    }
}


export const Reset_Error = () => {
    return {
        type: types.RESET_ERROR,
    }
}

export const registerInitiate = (email, password, isAdmin) => {
    const data = {
        email: email,
        password: password,
        returnSecureToken: true
    }
    return async function (dispatch) {
        dispatch(registerStart())
        try {
            const user = await registorRequest(data);
            if (isAdmin) {
                await postRequest(Admin, {uid: user.data.localId});

            }
            dispatch(registerSuccess())
        } catch (e) {
            dispatch(registerFail(e.response.data.error.message))
        }
    }

}

export const loginInitiate = (email, password) => {

    const userdata = {
        email: email,
        password: password,
        returnSecureToken: true
    }
    return async function (dispatch) {
        dispatch(loginStart());
        try {
            const user = await loginRequest(userdata);
            const user1 = await getRequest(Admin);
            dispatch(loginSuccess(user, user1));
        } catch (e) {
            dispatch(loginFail(e.response.data.error.message));
        }
    }
}

export const Reset_Password_Initialize = (authid, password) => {
    const userdata = {
        idToken: authid,
        password: password,
        returnSecureToken: true,
    }
    return async function (dispach) {
        dispach(resetPasswordStart());
        try {
            const user = await passwordResetRequest(userdata);
            dispach(resetPasswordSuccess({data: user.data}));
        } catch (e) {
            dispach(resetPasswordFail(e.response.data.error.message))
        }
    }
}

export const logoutInitiate = () => {
    return async function (dispatch) {
        dispatch(logoutStart())
        try {
            await auth.signOut();
            setTimeout(() => {
                dispatch(logoutSuccess());
                dispatch(Redirect(""))
            }, 600)
        } catch (e) {
            dispatch(logoutFail(e.message))
        }
    }
}