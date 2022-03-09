import * as types from "../Types/actionType";
import axios from "axios";
import Cookies from "js-cookie";
import {postRequest} from "../../../api/request";

const Result_Submission_Started = () => {
    return {
        type: types.RESULT_SUBMISSION_STARTED,
        payload: {
            loading: true,
        }
    }
}

const Result_Submission_Success = (data, name, email) => {
    return {
        type: types.RESULT_SUBMISSION_SUCCESS,
        payload: {
            loading: false,
            data,
            name,
            email,
        }
    }
}

const Result_Submission_Fail = (error) => {
    return {
        type: types.RESULT_SUBMISSION_FAIL,
        payload: {
            loading: false,
            error,
        }
    }
}

const Result_Submission_Initialization = (flag) => {
    const username = Cookies.get("setUsername")
    const UniqueCode = Cookies.get("setUnicode")
    const email = Cookies.get("setEmail")
    const clgname = Cookies.get("setClgname")
    const date = new Date().toLocaleDateString();
    return async function (dispach) {
        let resultArray = [];
        dispach(Result_Submission_Started());
        try {
            const {data} = await axios.get(`https://auth-test-f6dd6-default-rtdb.firebaseio.com/StudentAnswer/${username}/${UniqueCode}.json`)
            for (let key in data) {
                resultArray.push({ques_id: data[key].questionId, selected_op: parseInt(data[key].answer)})
            }
            if (flag === 1) {
                const resultData = {
                    name: username,
                    exam_ques: resultArray,
                    email: email,
                    date: date,
                    clgname: clgname,
                }
                await postRequest("result1", resultData);
            }
            dispach(Result_Submission_Success(resultArray, username, email));
        } catch (e) {
            dispach(Result_Submission_Fail(e.message))
        }
    }
}

export default Result_Submission_Initialization;