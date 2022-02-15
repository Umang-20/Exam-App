import * as types from "../Types/actionType";

const defaultValue = {
    loading: false,
    error: null,
    questions: [],
    time: null,
}

const FetchQuestionReducer = (state = defaultValue, action) => {
    switch (action.type) {
        case types.FETCH_QUESTION_STARTED:
            return {
                ...state,
                loading: action.payload.loading,
            }
        case types.FETCH_QUESTION_SUCCESS:
            let questionsID = [];
            let questions = [];
            let time;
            for (let key in action.payload.allExam) {
                if (action.payload.allExam[key].uniqueCode === action.payload.code) {
                    questionsID = [...action.payload.allExam[key].selectedQues]
                    time = action.payload.allExam[key].time;
                }
            }
            for (let key in action.payload.questions) {
                let questionTime = parseInt(action.payload.questions[key].time);
                questionsID.forEach((element) => {
                    if (element === key) {
                        questions.push({data: action.payload.questions[key], id: element, time: questionTime})
                    }
                })
            }

            return {
                ...state,
                time: time,
                questions: questions,
                loading: action.payload.loading,
            }
        case types.FETCH_QUESTION_FAIL:
            return {
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
            }
        default:
            return state;
    }
}

export default FetchQuestionReducer;