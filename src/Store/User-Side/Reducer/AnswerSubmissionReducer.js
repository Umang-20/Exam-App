import * as types from "../Types/actionType";

const defaultValue = {
    questionId: null,
    answer: null,
    mor: false,
    error: null,
    loading: false,
    quesNo: null,
    allAnswer: [],
    isredirect: null,
}

const AnswerSubmissionReducer = (state = defaultValue, action) => {
    const {payload} = action;
    switch (action.type) {
        case types.ANSWER_SUBMISSION_STARTED:
        case types.GET_ANSWER_STARTED:
        case types.GETALLANSWER_START:
            return {
                ...state,
                loading: payload.loading,
            }
        case types.ANSWER_SUBMISSION_SUCCESS:
            return {
                ...state,
                loading: payload.loading,
                questionId: payload.questionId,
                answer: payload.answer,
                mor: payload.mor,
                quesNo: payload.quesNo,
                quesTime: payload.quesTime,

            }
        case types.ANSWER_SUBMISSION_FAIL:
        case types.GET_ANSWER_FAIL:
        case types.GETALLANSWER_FAIL:
            return {
                ...state,
                loading: payload.loading,
                error: payload.error,
            }
        case types.GET_ANSWER_SUBMISSION:
            let found = 0;
            let questionID;
            let answer;
            let mor;
            let questionTime;
            for (let key in payload.data) {
                if (payload.data[key].quesNo === payload.quesNo) {
                    questionID = payload.data[key].questionId;
                    answer = payload.data[key].answer;
                    mor = payload.data[key].mor;
                    if (payload.data[key].quesTime || payload.data[key].quesTime === 0) {
                        questionTime = payload.data[key].quesTime;
                    } else {
                        questionTime = payload.quesTime;
                    }
                    localStorage.setItem("QuesTime", JSON.stringify(questionTime))
                    found = key;
                }
            }
            if (found !== 0) {
                return {
                    ...state,
                    questionId: questionID,
                    answer: answer,
                    mor: mor,
                    quesNo: payload.quesNo,
                    loading: payload.loading,
                    quesTime: questionTime,
                }
            } else {
                localStorage.setItem("QuesTime", JSON.stringify(payload.quesTime))
                return {
                    ...state,
                    loading: payload.loading,
                    allAnswer: [],
                    quesTime: payload.quesTime,
                }
            }
        case types.GETALLANSWER_SUCCESS:
            let allData = [];
            for (let key in payload.allAnswer) {
                if (payload.allAnswer[key].answer === "undefined") {
                    payload.allAnswer[key].answer = "";
                }
                allData.push(action.payload.allAnswer[key]);
            }
            return {
                ...state,
                allAnswer: allData,
                loading: payload.loading,
            }
        case types.REDIRECT:
            return {
                ...state,
                isredirect: payload.path,
            }
        default:
            return state;
    }
}

export default AnswerSubmissionReducer;