import * as types from "../Types/actionType";

const defaultValue = {
    payload: {
        questionId: null,
        answer: null,
        mor: false,
        error: null,
        loading: false,
        quesNo:null,
        allAnswer:[],
        isredirect: null,
    }
}

const AnswerSubmissionReducer = (state = defaultValue, action) => {
    switch (action.type) {
        case types.ANSWER_SUBMISSION_STARTED:
        case types.GET_ANSWER_STARTED:
        case types.GETALLANSWER_START:
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
                    quesTime: action.payload.quesTime,
                }
            }
        case types.ANSWER_SUBMISSION_FAIL:
        case types.GET_ANSWER_FAIL:
        case types.GETALLANSWER_FAIL:
            return {
                ...state,
                payload: {
                    ...state.payload,
                    loading: action.payload.loading,
                    error: action.payload.error,
                }
            }
        case types.GET_ANSWER_SUBMISSION:
            localStorage.setItem("QuesTime",JSON.stringify(action.payload.quesTime))
            let found = 0;
            let questionID;
            let answer;
            let mor;
            let questionTime;
            for (let key in action.payload.data) {
                    if (action.payload.data[key].quesNo === action.payload.quesNo) {
                        questionID = action.payload.data[key].questionId;
                        answer = action.payload.data[key].answer;
                        mor = action.payload.data[key].mor;
                        if (action.payload.data[key].quesTime || action.payload.data[key].quesTime === 0) {
                            questionTime = action.payload.data[key].quesTime;
                        } else {
                            questionTime = action.payload.quesTime;
                        }
                    }
                }
            if(found !== 0){
                return {
                    ...state,
                    payload: {
                        ...state.payload,
                        questionId: questionID,
                        answer: answer,
                        mor: mor,
                        quesNo: action.payload.quesNo,
                        loading: action.payload.loading,
                        quesTime: questionTime,
                    }
                }
            }
            else {
                return {
                    ...state,
                    payload: {
                        ...state.payload,
                        loading: action.payload.loading,
                        allAnswer: [],
                        quesTime: action.payload.quesTime,
                    }
                }
            }

        case types.ANSWER_NOT_FOUND:
            localStorage.setItem("QuesTime",JSON.stringify(action.payload.quesTime))
            return {
                ...state,
                payload: {
                    ...state.payload,
                    loading: action.payload.loading,
                    allAnswer: action.payload.allAnswer,
                    quesTime: action.payload.quesTime,
                }
            }
        case types.GETALLANSWER_SUCCESS:
            let allData = [];
            for (let key in action.payload.allAnswer) {
                if (action.payload.allAnswer[key].answer === "undefined") {
                    action.payload.allAnswer[key].answer = "";
                }
                allData.push(action.payload.allAnswer[key]);
            }
            return {
                ...state,
                payload: {
                    ...state.payload,
                    allAnswer: allData,
                    loading: action.payload.loading,
                }
            }
        case types.REDIRECT:
            localStorage.setItem("QuesTime", JSON.stringify(-1))
            return {
                ...state,
                payload: {
                    ...state.payload,
                    isredirect: action.payload.path,
                }
            }
        default:
            return state;
    }
}

export default AnswerSubmissionReducer;