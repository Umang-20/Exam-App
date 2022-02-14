import * as types from "../Types/actionType";
import axios from "axios";
import Cookies from "js-cookie";

const Answer_Submission_Started = () => {
    return {
        type: types.ANSWER_SUBMISSION_STARTED,
        payload: {
            loading: true,
        }
    }
}

const Answer_Submission_Success = (questionId, answer, mor, quesNo, quesTime) => {
    return {
        type: types.ANSWER_SUBMISSION_SUCCESS,
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

const Answer_Submission_Fail = (error) => {
    return {
        type: types.ANSWER_SUBMISSION_FAIL,
        payload: {
            loading: false,
            error,
        }
    }
}

export const Redirect = (path) => {
    return {
        type: types.REDIRECT,
        payload: {
            path,
        }
    }
}

export const Answer_Submission_Initialization = (questionId, answer, mor, quesNo, redirect) => {
    const username = Cookies.get("setUsername")
    const UniqueCode = Cookies.get("setUnicode")
    let questionTime = JSON.parse(localStorage.getItem("RemainingQuesTime"));
    if ((questionTime === 1) || (questionTime === -1)) questionTime = 0;
    let answerData = {
        questionId: questionId,
        answer: answer,
        mor: mor,
        quesNo: quesNo,
        quesTime: questionTime,
    }
    return async function (dispach) {
        dispach(Answer_Submission_Started());
        let updateKey = 0;
        try {
            const {data} = await axios.get(`https://auth-test-f6dd6-default-rtdb.firebaseio.com/StudentAnswer/${username}/${UniqueCode}.json`)
            for (let key in data) {
                if (data[key].questionId === questionId) {
                    updateKey = key;
                }
            }
            if (updateKey === 0) {
                await axios.post(`https://auth-test-f6dd6-default-rtdb.firebaseio.com/StudentAnswer/${username}/${UniqueCode}.json`, answerData)
                dispach(Answer_Submission_Success(questionId, answer, mor, quesNo, questionTime))
                dispach(Redirect(`/exam/${redirect}`));
            } else {
                await axios.put(`https://auth-test-f6dd6-default-rtdb.firebaseio.com/StudentAnswer/${username}/${UniqueCode}/${updateKey}.json`, answerData)
                dispach(Answer_Submission_Success(questionId, answer, mor, quesNo, questionTime))
                dispach(Redirect(`/exam/${redirect}`));
            }
        } catch (e) {
            dispach(Answer_Submission_Fail(e.message))
        }
    }
}