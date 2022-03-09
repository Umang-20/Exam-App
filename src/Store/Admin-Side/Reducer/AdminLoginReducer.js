import * as types from "../Types/actionType";
import Cookies from "js-cookie";

const initialState = {
    loading: false,
    currentUser: [],
    error: "",
    isloggedin: "",
    isredirect: null,
    isAdmin: '',
};

const userReducer = (state = initialState, action) => {
    const {payload} = action;
    switch (action.type) {
        case types.REGISTER_START:
        case types.LOGIN_START:
        case types.LOGOUT_START:
        case types.RESET_PASSWORD_START:
            return {
                ...state,
                loading: true,
            };

        case types.LOGIN_SUCCESS:
            const {user} = payload;
            const {adminUser} = payload;
            Cookies.set("settoken", user.data.idToken);
            Cookies.set("setemail", user.data.email);
            localStorage.setItem("settoken", user.data.idToken);
            localStorage.setItem("setemail", user.data.email);
            let adminData = [];
            let data;
            let admin;
            let redirect;
            for (let key in adminUser.data) {
                adminData.push(adminUser.data[key].uid)
            }
            const isAdmin = adminData.find(element => element === user.data.localId)
            if (isAdmin) {
                    Cookies.set('isAdmin', true)
                    data = user.data;
                    admin = true;
                    redirect = '/dashboard';
            } else {
                    Cookies.set('isAdmin', false)
                    data = user.data;
                    admin = false;
                    redirect = '/student-login';
            }
            return {
                ...state,
                loading: false,
                isredirect: redirect,
                currentUser: data,
                isAdmin: admin,
            };
        case types.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                isredirect: "/login",
            };
        case types.LOGOUT_FAIL:
            return {
                ...state,
                loading: false,
            };
        case types.REGISTER_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };

        case types.LOGIN_FAIL:
        case types.RESET_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: payload,
            };
        case types.LOGOUT_SUCCESS:
            Cookies.remove("settoken");
            Cookies.remove("setemail");
            Cookies.remove("isAdmin");
            localStorage.removeItem("settoken");
            localStorage.removeItem("setemail");
            return {
                ...state,
                currentUser: null,
                isloggedin: "",
                isredirect: "/login",
                loading: false,
            };
        case types.RESET_ERROR:
            return {
                ...state,
                error: "",
            }
        case types.RESET_PASSWORD_SUCCESS:
            Cookies.remove("settoken");
            Cookies.set("settoken", payload.data.idToken);
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

export default userReducer;
