import * as types from "../Types/actionType";

const defaultValue = {
    payload: {
        questionId: null,
        answer: null,
        mor: false,
        error: null,
        loading: false,
        allAnswer:[],
    }
}

const AnswerSubmissionReducer = (state = defaultValue, action) => {
    switch (action.type) {
        case types.ANSWER_SUBMISSION_STARTED:
            return {
                ...state,
                payload: {
                    ...state.payload,
                    loading: action.payload.loading,
                }
            }
        case types.ANSWER_SUBMISSION_SUCCESS:
            return {
                ...state,
                payload: {
                    ...state.payload,
                    loading: action.payload.loading,
                    questionId: action.payload.questionId,
                    answer: action.payload.answer,
                    mor: action.payload.mor,
                    quesNo: action.payload.quesNo,
                    // allAnswer: action.payload.allAnswer,
                }
            }
        case types.ANSWER_SUBMISSION_FAIL:
            return {
                ...state,
                payload: {
                    ...state.payload,
                    loading: action.payload.loading,
                    error: action.payload.error,
                }
            }
        case types.GET_ANSWER_SUBMISSION:
            return {
                ...state,
                payload: {
                    ...state.payload,
                    questionId: action.payload.questionId,
                    answer: action.payload.answer,
                    mor: action.payload.mor,
                    quesNo: action.payload.quesNo,
                    loading: action.payload.loading,
                }
            }
        case types.ANSWER_NOT_FOUND:
            return {
                ...state,
                payload: {
                    ...state.payload,
                    loading: action.payload.loading,
                    allAnswer: action.payload.allAnswer,
                }
            }
        case types.GET_ALL_ANSWER:
            return {
                ...state,
                payload: {
                    ...state.payload,
                    allAnswer: action.payload.allAnswer,
                }
            }
        default:
            return state;
    }
}

export default AnswerSubmissionReducer;