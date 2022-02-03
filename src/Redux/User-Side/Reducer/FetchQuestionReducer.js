import * as types from "../Types/actionType";
import Cookies from "js-cookie";

const defaultValue = {
    payload:{
        loading:false,
        error:null,
        questions:[],
        time:null,
    }
}

const FetchQuestionReducer = (state=defaultValue,action) => {
    switch (action.type){
        case types.FETCH_QUESTION_STARTED:
            return {
                ...state,
                payload: {
                    ...state.payload,
                    loading: action.payload.loading,
                }
            }
        case types.FETCH_QUESTION_SUCCESS:
            return {
                ...state,
                payload: {
                    ...state.payload,
                    time:action.payload.time,
                    questions: action.payload.questions,
                    loading: action.payload.loading
                }
            }
        case types.FETCH_QUESTION_FAIL:
            return {
                ...state,
                payload: {
                    ...state.payload,
                    loading: action.payload.loading,
                    error: action.payload.error,
                }
            }
        default:
            return state;
    }
}

export default FetchQuestionReducer;