import * as types from "../Types/actionType";
import axios from "axios";

const Fetch_Question_Started = () => {
    return{
        type:types.FETCH_QUESTION_STARTED,
        payload:{
            loading:true,
        }
    }
}

const Fetch_Question_Success = (questions,time) => {
    return{
        type:types.FETCH_QUESTION_SUCCESS,
        payload: {
            loading: false,
            questions,
            time,
        }
    }
}

const Fetch_Question_Fail = (error) => {
    return{
        type: types.FETCH_QUESTION_FAIL,
        payload:{
            loading:false,
            error,
        }
    }
}

const Fetch_Question_Initialization = (code) => {
    return async function (dispach) {
        let questionsID = [];
        let questions = [];
        let time;
        dispach(Fetch_Question_Started());
        await axios.get("https://auth-test-f6dd6-default-rtdb.firebaseio.com/viewexam.json").then(async (response) => {
            for (let key in response.data) {
                if (response.data[key].uniqueCode === code) {
                    questionsID =[...response.data[key].selectedQues]
                    time = response.data[key].time;
                }
            }
            await axios.get("https://auth-test-f6dd6-default-rtdb.firebaseio.com/questions.json").then((resp) => {
                    for (let key in resp.data) {
                        let questionTime = parseInt(resp.data[key].time);
                        questionsID.map((element) => {
                            if (element === key) {
                                questions.push({data:resp.data[key],id:element,time:questionTime})
                            }
                        })
                    }
                }
            )
            dispach(Fetch_Question_Success(questions,time))
        }).catch((error) => {
            dispach(Fetch_Question_Fail(error.message))
        })
    }
}

export default Fetch_Question_Initialization;