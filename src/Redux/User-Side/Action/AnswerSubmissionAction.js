import * as types from "../Types/actionType";
import axios from "axios";
import Cookies from "js-cookie";
import GetAllAnswerActions from "./GetAllAnswerActions";

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

const Answer_Submission_Success = (questionId, answer, mor, quesNo, allData) => {
    return {
        type: types.ANSWER_SUBMISSION_SUCCESS,
        payload: {
            loading: true,
            questionId,
            answer,
            mor,
            quesNo,
            allAnswer: allData,
        }
    }
}

const Answer_Submission_Fail = (error) => {
    return {
        type: types.ANSWER_SUBMISSION_FAIL,
        payload: {
            loading:false,
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

const Get_Answer_Submission = (questionId, answer, mor, quesNo) => {
    return{
        type:types.GET_ANSWER_SUBMISSION,
        payload: {
            loading: true,
            questionId,
            answer,
            mor,
            quesNo,
        }
    }
}

const Answer_Not_Found = () => {
    return{
        type:types.ANSWER_NOT_FOUND,
        payload:{
            loading:true,
            allAnswer: [],
        }
    }
}

const Get_Answer_Fail = (error) => {
    return {
        type: types.GET_ANSWER_FAIL,
        payload: {
            loading:false,
            error,
        }
    }
}

export const Answer_Submission_Initialization = (questionId, answer, mor, quesNo) => {
    let answerData = {
        questionId: questionId,
        answer: answer,
        mor: mor,
        quesNo: quesNo,
    }
    return async function (dispach) {
        dispach(Answer_Submission_Started());
        let updateKey = 0;
        await axios.get(`https://admin-user-authentication-default-rtdb.firebaseio.com/StudentAnswer/${username}/${UniqueCode}.json`).then(({data}) => {
            for (let key in data) {
                if (data[key].questionId === questionId) {
                    updateKey = key;
                }
            }
        })
        if (updateKey === 0) {
            await axios.post(`https://admin-user-authentication-default-rtdb.firebaseio.com/StudentAnswer/${username}/${UniqueCode}.json`, answerData).then(() => {
                dispach(Answer_Submission_Success(questionId, answer, mor, quesNo))
                dispach(Get_Student_Answer(quesNo+1));
            }).catch((e) => {
                dispach(Answer_Submission_Fail(e.message))
            })
        } else {
            await axios.put(`https://admin-user-authentication-default-rtdb.firebaseio.com/StudentAnswer/${username}/${UniqueCode}/${updateKey}.json`, answerData).then(() => {
                dispach(Answer_Submission_Success(questionId, answer, mor, quesNo))
                dispach(Get_Student_Answer(quesNo+1));
            }   ).catch((e) => {
                dispach(Answer_Submission_Fail(e.message))
            })
        }
    }
}

export const Get_Student_Answer = (quesNo) => {
    let found = 0;
    return async function (dispach) {
        dispach(Get_Answer_Started());
        await axios.get(`https://admin-user-authentication-default-rtdb.firebaseio.com/StudentAnswer/${username}/${UniqueCode}.json`).then(({data})=>{
            for (let key in data) {
                if (data[key].quesNo === quesNo) {
                    dispach(Get_Answer_Submission(data[key].questionId,data[key].answer, data[key].mor, quesNo));
                    found = key;
                }
            }
            if(found === 0) {
                dispach(Answer_Not_Found());
            }
            dispach(GetAllAnswerActions());
        }).catch((e)=>{
            dispach(Get_Answer_Fail(e.message));
        })

    }
}