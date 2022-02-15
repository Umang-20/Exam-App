import * as types from "../Types/actionType";

const defaultValue = {
    loading: false,
    exam_ques: [],
    name: null,
    username: null,
    error: null,
}

const SubmitResultReducer = (state = defaultValue, action) => {
    switch (action.type) {
        case types.RESULT_SUBMISSION_STARTED:
            return {
                ...state,
                loading: action.payload.loading,
            }
        case types.RESULT_SUBMISSION_SUCCESS:
            localStorage.setItem("Result", JSON.stringify("yes"));
            return {
                ...state,
                loading: action.payload.loading,
                exam_ques: action.payload.data,
                name: action.payload.name,
                email: action.payload.email,
            }
        case types.RESULT_SUBMISSION_FAIL:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
            }
        default:
            return state;
    }
}

export default SubmitResultReducer;