import * as types from "../Types/actionType";
import axios from "axios";

const Fetch_Question_Started = () => {
    return {
        type: types.FETCH_QUESTION_STARTED,
        payload: {
            loading: true,
        }
    }
}

const Fetch_Question_Success = (allExam, questions, code) => {
    return {
        type: types.FETCH_QUESTION_SUCCESS,
        payload: {
            loading: false,
            questions,
            allExam,
            code,
        }
    }
}

const Fetch_Question_Fail = (error) => {
    return {
        type: types.FETCH_QUESTION_FAIL,
        payload: {
            loading: false,
            error,
        }
    }
}

const Fetch_Question_Initialization = (code) => {
    return async function (dispach) {
        dispach(Fetch_Question_Started());
        try {
            const {data} = await axios.get("https://auth-test-f6dd6-default-rtdb.firebaseio.com/viewexam.json")
            const resp = await axios.get("https://auth-test-f6dd6-default-rtdb.firebaseio.com/questions.json")
            dispach(Fetch_Question_Success(data, resp.data, code))
        } catch (e) {
            dispach(Fetch_Question_Fail(e.message))
        }
    }
}

export default Fetch_Question_Initialization;