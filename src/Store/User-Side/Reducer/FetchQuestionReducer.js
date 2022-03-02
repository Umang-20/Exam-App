import * as types from "../Types/actionType";

const defaultValue = {
    loading: false,
    error: null,
    questions: [],
    time: null,
}

const FetchQuestionReducer = (state = defaultValue, action) => {
    const {payload} = action;
    switch (action.type) {
        case types.FETCH_QUESTION_STARTED:
            return {
                ...state,
                loading: payload.loading,
            }
        case types.FETCH_QUESTION_SUCCESS:
            let questionsID = [];
            let questions = [];
            let time;
            for (let key in payload.allExam) {
                if (payload.allExam[key].uniqueCode === payload.code) {
                    questionsID = [...payload.allExam[key].selectedQues]
                    time = payload.allExam[key].time;
                }
            }
            for (let key in payload.questions) {
                let questionTime = parseInt(payload.questions[key].time);
                questionsID.forEach((element) => {
                    if (element === key) {
                        questions.push({data: payload.questions[key], id: element, time: questionTime})
                    }
                })
            }

            return {
                ...state,
                time: time,
                questions: questions,
                loading: payload.loading,
            }
        case types.FETCH_QUESTION_FAIL:
            return {
                ...state,
                loading: payload.loading,
                error: payload.error,
            }
        default:
            return state;
    }
}

export default FetchQuestionReducer;