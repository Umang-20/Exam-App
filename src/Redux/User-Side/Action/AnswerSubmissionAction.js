import * as types from "../Types/actionType";
import axios from "axios";
import Cookies from "js-cookie";

const email = Cookies.get("setEmail");
const username = Cookies.get("setUsername")
const UniqueCode = Cookies.get("setUnicode")

const Answer_Submission_Started = () => {
    return {
        type: types.ANSWER_SUBMISSION_STARTED,
        payload: {
            loading: true,
        }
    }
}

const Answer_Submission_Success = (questionId, answer, mor) => {
    return {
        type: types.ANSWER_SUBMISSION_SUCCESS,
        payload: {
            loading: true,
            questionId,
            answer,
            mor,
        }
    }
}

const Answer_Submission_Fail = (error) => {
    return {
        type: types.ANSWER_SUBMISSION_FAIL,
        payload: {
            error,
        }
    }
}

const Answer_Submission_Initialization = (questionId, answer, mor) => {
    const answerData = {
        questionId: questionId,
        answer: answer,
        mor: mor,
    }
    return async function (dispach) {
        dispach(Answer_Submission_Started());
        let updateKey = 0;
        await axios.get(`https://admin-user-authentication-default-rtdb.firebaseio.com/StudentAnswer/${username}/${UniqueCode}.json`).then(({data}) => {
            // console.log(data)
            for (let key in data) {
                if (data[key].questionId === questionId) {
                    updateKey = key;
                }
            }
        })
        if (updateKey === 0) {
            await axios.post(`https://admin-user-authentication-default-rtdb.firebaseio.com/StudentAnswer/${username}/${UniqueCode}.json`, answerData).then(() => {
                dispach(Answer_Submission_Success(questionId, answer, mor))
            }).catch((e) => {
                dispach(Answer_Submission_Fail(e.message))
            })
        } else {
            await axios.put(`https://admin-user-authentication-default-rtdb.firebaseio.com/StudentAnswer/${username}/${UniqueCode}/${updateKey}.json`, answerData).then(() => {
                dispach(Answer_Submission_Success(questionId, answer, mor))
            }).catch((e) => {
                dispach(Answer_Submission_Fail(e.message))
            })
        }
    }
}

export default Answer_Submission_Initialization;