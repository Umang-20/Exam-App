import * as types from "../Types/actionType";
import {getRequest} from "../../../api/request";
import {Results} from "../../../api/queries";

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
            const {data} = await getRequest(Results);
            dispatch(resultFetched(data));
        } catch (e) {
            dispatch(resultFail(e.message));
        }
    }
};
  