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
        // let questionsID = [];
        // let questions = [];
        // let time;
        dispach(Fetch_Question_Started());
        try {
            const {data} = await axios.get("https://auth-test-f6dd6-default-rtdb.firebaseio.com/viewexam.json")
            // for (let key in data) {
            //     if (data[key].uniqueCode === code) {
            //         questionsID = [...data[key].selectedQues]
            //         time = data[key].time;
            //     }
            // }
            const resp = await axios.get("https://auth-test-f6dd6-default-rtdb.firebaseio.com/questions.json")
            // for (let key in resp.data) {
            //     let questionTime = parseInt(resp.data[key].time);
            //     questionsID.forEach((element) => {
            //         if (element === key) {
            //             questions.push({data: resp.data[key], id: element, time: questionTime})
            //         }
            //     })
            // }
            dispach(Fetch_Question_Success(data, resp.data, code))
        } catch (e) {
            dispach(Fetch_Question_Fail(e.message))
        }
    }
}

export default Fetch_Question_Initialization;