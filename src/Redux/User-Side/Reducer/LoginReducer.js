import * as types from "../Types/actionType";
import Cookies from "js-cookie";

const defaultValue = {
    payload: {
        details: {}, loading: false, error: null, studentRedirect: "",
    }
}

const LoginReducer = (state = defaultValue, action) => {
    switch (action.type) {
        case types.STUDENT_LOGIN_STARTED:
        case types.STUDENT_LOGOUT_STARTED:
            return {
                ...state, payload: {
                    ...state.payload, loading: action.payload.loading,
                }
            }
        case types.STUDENT_LOGIN_SUCCESS:
            Cookies.set("setEmail", action.payload.details.email);
            Cookies.set('setUnicode', action.payload.details.code);
            Cookies.set("setUsername", action.payload.details.username);
            Cookies.set('setClgname', action.payload.details.clgname);
            return {
                ...state, payload: {
                    ...state.payload,
                    details: action.payload.details,
                    loading: action.payload.loading,
                    studentRedirect: "/exam/1",
                }
            }
        case types.STUDENT_LOGOUT_SUCCESS:
            Cookies.remove("setEmail");
            Cookies.remove("setUnicode");
            Cookies.remove("setClgname");
            Cookies.remove("setUsername");
            return{
                ...state,
                payload: {
                    studentRedirect: "/student-login",
                    loading: action.payload.loading,
                }
            }
        case types.STUDENT_LOGIN_FAIL:
        case types.STUDENT_LOGOUT_FAIL:
            return {
                ...state, payload: {
                    ...state.payload, loading: action.payload.loading, error: action.payload.error,
                }
            }
        default:
            return state;
    }
}

export default LoginReducer;