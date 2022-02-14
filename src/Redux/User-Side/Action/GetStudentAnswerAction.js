import * as types from "../Types/actionType";
import axios from "axios";
import Cookies from "js-cookie";
import GetAllAnswerActions from "./GetAllAnswerActions";

const Get_Answer_Started = () => {
    return {
        type: types.GET_ANSWER_STARTED,
        payload: {
            loading: true,
        }
    }
}

const Get_Answer_Submission = (questionId, answer, mor, quesNo, quesTime) => {
    return {
        type: types.GET_ANSWER_SUBMISSION,
        payload: {
            loading: true,
            questionId,
            answer,
            mor,
            quesNo,
            quesTime,
        }
    }
}

const Answer_Not_Found = (quesTime) => {
    return {
        type: types.ANSWER_NOT_FOUND,
        payload: {
            loading: false,
            quesTime: quesTime,
            allAnswer: [],
        }
    }
}

const Get_Answer_Fail = (error) => {
    return {
        type: types.GET_ANSWER_FAIL,
        payload: {
            loading: false,
            error,
        }
    }
}

const Get_Student_Answer = (quesNo, quesTime) => {
    const username = Cookies.get("setUsername")
    const UniqueCode = Cookies.get("setUnicode")
    let found = 0;
    return async function (dispach) {
        dispach(Get_Answer_Started());
        try {
            const {data} = await axios.get(`https://auth-test-f6dd6-default-rtdb.firebaseio.com/StudentAnswer/${username}/${UniqueCode}.json`)
            for (let key in data) {
                if (data[key].quesNo === quesNo) {
                    if (data[key].quesTime || data[key].quesTime === 0) {
                        dispach(Get_Answer_Submission(data[key].questionId, data[key].answer, data[key].mor, quesNo, data[key].quesTime));
                    } else {
                        dispach(Get_Answer_Submission(data[key].questionId, data[key].answer, data[key].mor, quesNo, quesTime));
                    }
                    found = key;
                }
            }
            if (found === 0) {
                dispach(Answer_Not_Found(quesTime));
            }
            dispach(GetAllAnswerActions());
        } catch (e) {
            dispach(Get_Answer_Fail(e.message));

        }
    }
}

export default Get_Student_Answer;