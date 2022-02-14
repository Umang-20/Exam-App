import * as types from "../Types/actionType";
import axios from "axios";
import Cookies from "js-cookie";

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
        // let allData = [];
        dispach(GetALlAnswer_Started())
        try {
            const {data} = await axios.get(`https://auth-test-f6dd6-default-rtdb.firebaseio.com/StudentAnswer/${username}/${UniqueCode}.json`)
            // for (let key in data) {
            //     if (data[key].answer === "undefined") {
            //         data[key].answer = "";
            //     }
            //     allData.push(data[key]);
            // }
            dispach(GetAllAnswer_Success(data));
        } catch (e) {
            dispach(GetAllAnswer_Fail(e.message));
        }
    }
}

export default GetAllAnswerActions;