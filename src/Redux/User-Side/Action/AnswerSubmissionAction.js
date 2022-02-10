import * as types from "../Types/actionType";
import axios from "axios";
import Cookies from "js-cookie";
import GetAllAnswerActions from "./GetAllAnswerActions";


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

export const Redirect = (path) => {
    return {
        type: types.REDIRECT,
        payload: {
            loading: false,
            path,
        }
    }
}

export const Answer_Submission_Initialization = (questionId, answer, mor, quesNo, redirect) => {
    const username = Cookies.get("setUsername")
    const UniqueCode = Cookies.get("setUnicode")
    let questionTime = JSON.parse(localStorage.getItem("RemainingQuesTime"));
    if (questionTime === 1) questionTime = 0;
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
        await axios.get(`https://auth-test-f6dd6-default-rtdb.firebaseio.com/StudentAnswer/${username}/${UniqueCode}.json`).then(({data}) => {
            for (let key in data) {
                if (data[key].questionId === questionId) {
                    updateKey = key;
                }
            }
        })
        if (updateKey === 0) {
            await axios.post(`https://auth-test-f6dd6-default-rtdb.firebaseio.com/StudentAnswer/${username}/${UniqueCode}.json`, answerData).then(() => {
                dispach(Answer_Submission_Success(questionId, answer, mor, quesNo, questionTime))
                // localStorage.setItem("RemainingQuesTime", JSON.stringify(-1))
                // dispach(Get_Student_Answer(quesNo + 1,questionTime));
                dispach(Redirect(`/exam/${redirect}`));
            }).catch((e) => {
                dispach(Answer_Submission_Fail(e.message))
            })
        } else {
            await axios.put(`https://auth-test-f6dd6-default-rtdb.firebaseio.com/StudentAnswer/${username}/${UniqueCode}/${updateKey}.json`, answerData).then(() => {
                dispach(Answer_Submission_Success(questionId, answer, mor, quesNo, questionTime))
                // localStorage.setItem("RemainingQuesTime", JSON.stringify(-1))
                // dispach(Get_Student_Answer(quesNo + 1,questionTime));
                dispach(Redirect(`/exam/${redirect}`));

            }).catch((e) => {
                dispach(Answer_Submission_Fail(e.message))
            })
        }
    }
}

export const Get_Student_Answer = (quesNo, quesTime) => {
    const username = Cookies.get("setUsername")
    const UniqueCode = Cookies.get("setUnicode")
    let found = 0;
    return async function (dispach) {
        dispach(Get_Answer_Started());
        await axios.get(`https://auth-test-f6dd6-default-rtdb.firebaseio.com/StudentAnswer/${username}/${UniqueCode}.json`).then(({data}) => {
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
        }).catch((e) => {
            dispach(Get_Answer_Fail(e.message));
        })

    }
}