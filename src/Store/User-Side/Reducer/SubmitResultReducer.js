import * as types from "../Types/actionType";
import Cookies from "js-cookie";

const defaultValue = {
    loading: false,
    exam_ques: [],
    name: null,
    username: null,
    error: null,
}

const SubmitResultReducer = (state = defaultValue, action) => {
    const {payload} = action;
    switch (action.type) {
        case types.RESULT_SUBMISSION_STARTED:
            return {
                ...state,
                loading: payload.loading,
            }
        case types.RESULT_SUBMISSION_SUCCESS:
            localStorage.setItem("Result", JSON.stringify("yes"));
            Cookies.set("Result", "yes");
            return {
                ...state,
                loading: payload.loading,
                exam_ques: payload.data,
                name: payload.name,
                email: payload.email,
            }
        case types.RESULT_SUBMISSION_FAIL:
            return {
                ...state,
                loading: payload.loading,
                error: payload.error,
            }
        default:
            return state;
    }
}

export default SubmitResultReducer;