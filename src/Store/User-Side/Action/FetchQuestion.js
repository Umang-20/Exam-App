import * as types from "../Types/actionType";
import {getRequest} from "../../../api/request";
import {Questions, ViewExam} from "../../../api/queries";

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
            const {data} = await getRequest(ViewExam);
            const resp = await getRequest(Questions);
            dispach(Fetch_Question_Success(data, resp.data, code))
        } catch (e) {
            dispach(Fetch_Question_Fail(e.message))
        }
    }
}

export default Fetch_Question_Initialization;