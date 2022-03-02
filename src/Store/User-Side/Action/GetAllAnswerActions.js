import * as types from "../Types/actionType";
import Cookies from "js-cookie";
import {getRequest} from "../../../api/request";
import {StudentAnswer} from "../../../api/queries";

const GetALlAnswer_Started = () => {
    return {
        type: types.GETALLANSWER_START,
        payload: {
            loading: true,
        }
    }
}

const GetAllAnswer_Success = (data) => {
    return {
        type: types.GETALLANSWER_SUCCESS,
        payload: {
            allAnswer: data,
            loading: false,
        }
    }
}

const GetAllAnswer_Fail = (error) => {
    return {
        type: types.GETALLANSWER_FAIL,
        payload: {
            error,
            loading: false,
        }
    }
}

const GetAllAnswerActions = () => {
    const username = Cookies.get("setUsername")
    const UniqueCode = Cookies.get("setUnicode")
    return async function (dispach) {
        dispach(GetALlAnswer_Started())
        try {
            const {data} = await getRequest(StudentAnswer(username,UniqueCode));
            dispach(GetAllAnswer_Success(data));
        } catch (e) {
            dispach(GetAllAnswer_Fail(e.message));
        }
    }
}

export default GetAllAnswerActions;