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

const Get_Answer_Submission = (data,quesNo,quesTime) => {
    return {
        type: types.GET_ANSWER_SUBMISSION,
        payload: {
            loading: true,
            data,
            quesNo,
            quesTime,
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
    return async function (dispach) {
        dispach(Get_Answer_Started());
        try {
            const {data} = await axios.get(`https://auth-test-f6dd6-default-rtdb.firebaseio.com/StudentAnswer/${username}/${UniqueCode}.json`)
            dispach(Get_Answer_Submission(data,quesNo,quesTime))
            dispach(GetAllAnswerActions());
        } catch (e) {
            dispach(Get_Answer_Fail(e.message));

        }
    }
}

export default Get_Student_Answer;