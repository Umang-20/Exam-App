import * as types from "../Types/actionType";
import axios from "axios";

const resultFetching = () => {
    return {
        type: types.RESULT_FETCHING,
    }
}

const resultFetched = (data) => {
    return {
        type: types.RESULT_FETCHED,
        payload: data,
    }
}

const resultFail = (error) => {
    return {
        type: types.RESULT_FAILED,
        payload: error,
    }
}

export const resultFetchingInitiate = () => {
    return async function (dispatch) {
        dispatch(resultFetching());
        try {
            const {data} = await axios.get("https://auth-test-f6dd6-default-rtdb.firebaseio.com/results.json")
            let viewData = [];
            for (let key in data) {
                viewData.push({
                    id: key,
                    ...data[key],
                });
            }
            dispatch(resultFetched(viewData));
        } catch (e) {
            dispatch(resultFail(e.message));
        }
    }
};
  