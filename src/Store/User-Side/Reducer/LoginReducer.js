import * as types from "../Types/actionType";
import Cookies from "js-cookie";

const defaultValue = {
    details: {},
    loading: false,
    error: null,
    studentRedirect: "",
}

const LoginReducer = (state = defaultValue, action) => {
    const {payload} = action;
    switch (action.type) {
        case types.STUDENT_LOGIN_STARTED:
        case types.STUDENT_LOGOUT_STARTED:
            return {
                ...state,
                loading: payload.loading,
            }
        case types.STUDENT_LOGIN_SUCCESS:
            Cookies.set("setEmail", payload.details.email);
            Cookies.set('setUnicode', payload.details.code);
            Cookies.set("setUsername", payload.details.username);
            Cookies.set('setClgname', payload.details.clgname);
            localStorage.setItem("Student", JSON.stringify(payload.details));
            return {
                ...state,
                details: payload.details,
                loading: payload.loading,
                studentRedirect: "/exam/0",
            }
        case types.STUDENT_LOGOUT_SUCCESS:
            Cookies.remove("setEmail");
            Cookies.remove("setUnicode");
            Cookies.remove("setClgname");
            Cookies.remove("setUsername");
            Cookies.remove("Result");
            localStorage.removeItem("Student");
            localStorage.removeItem("QuesTime");
            localStorage.removeItem("RemainingQuesTime");
            localStorage.removeItem("QuesAnswer");
            localStorage.removeItem("QuesId");
            localStorage.removeItem("QuesNo");
            localStorage.removeItem("Result");
            return {
                ...state,
                studentRedirect: "/student-login",
                loading: payload.loading,
            }
        case types.STUDENT_LOGIN_FAIL:
        case types.STUDENT_LOGOUT_FAIL:
            return {
                ...state,
                loading: payload.loading,
                error: payload.error,
            }
        default:
            return state;
    }
}

export default LoginReducer;