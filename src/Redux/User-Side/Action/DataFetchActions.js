import * as types from "../Types/actionType";
import axios from "axios";

const Data_Fetching_Started = () => {
    return {
        type: types.FETCHING_DATA,
    }
}

const Data_Fetching_Success = (data) => {
    return {
        type: types.DATA_FETCHED,
        payload: data,
    }
}

const Data_Fetching_Fail = (error) => {
    return {
        type: types.FETCHING_FAILED,
        payload: error,
    }
}

export const fetchingInitiate = () => {
    return async function (dispatch) {
        dispatch(Data_Fetching_Started());
        try {
            const {data} = await axios.get("https://auth-test-f6dd6-default-rtdb.firebaseio.com/viewexam.json")
            // let viewData = [];
            // for (let key in data) {
            //     viewData.push({
            //         id: key,
            //         ...data[key],
            //     });
            // }
            dispatch(Data_Fetching_Success(data));
        } catch (e) {
            dispatch(Data_Fetching_Fail(e.message));

        }
    }
}

