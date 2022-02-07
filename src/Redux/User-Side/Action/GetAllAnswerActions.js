import * as types from "../Types/actionType";
import axios from "axios";
import Cookies from "js-cookie";

const username = Cookies.get("setUsername")
const UniqueCode = Cookies.get("setUnicode")

const GetAllAnswerActions = () => {
    return async function (dispach) {
        let allData = [];
        await axios.get(`https://admin-user-authentication-default-rtdb.firebaseio.com/StudentAnswer/${username}/${UniqueCode}.json`).then(({data}) => {
            for (let key in data) {
                allData.push(data[key]);
            }
            dispach({
                type: types.GET_ALL_ANSWER,
                payload: {
                    allAnswer: allData,
                }
            })

        })
    }
}

export default GetAllAnswerActions;