import * as types from "./actionTypes";
import Cookies from "js-cookie";
const initialState = {
  loading: false,
  currentUser: [],
  error: "",
  error1: "",
  isloggedin: "",
  isredirect: "",
  isAdmin:'',
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.REGISTER_START:
    case types.LOGIN_START:
    case types.LOGOUT_START:
      return {
        ...state,
        loading: true,
      };

    case types.LOGIN_SUCCESS:
      Cookies.set("settoken", action.payload.data.idToken);
      Cookies.set("setemail", action.payload.data.email);
      Cookies.set('isAdmin',action.payload.admin)
      localStorage.setItem("settoken", action.payload.data.idToken);
      localStorage.setItem("setemail", action.payload.data.email);
      return {
        ...state,
        loading: false,
        isredirect: action.payload.redirect,
        currentUser: action.payload.data,
        isAdmin:action.payload.admin
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
        error1: action.payload,
        error: "",
      };

    case types.LOGIN_FAIL:
      console.log("action.payload", action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
        error1: "",
      };
    case types.LOGOUT_SUCCESS:
      Cookies.remove("settoken");
      Cookies.remove("setemail");
      Cookies.remove("isAdmin");
      console.log("clear cookeis");
      localStorage.removeItem("settoken");
      localStorage.removeItem("setemail");
      return {
        ...state,
        currentUser: null,
        isloggedin: "",
        isredirect: "/login",
        loading: false,
      };
    default:
      return state;
  }
};

export default userReducer;
