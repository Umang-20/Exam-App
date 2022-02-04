import * as types from "../Types/actionType";

const defaultValue = {
    payload: {
        questionId: null,
        answer: null,
        mor: false,
        error: null,
        loading: false,
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
        default:
            return state;
    }
}

export default AnswerSubmissionReducer;