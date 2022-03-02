import * as types from "../Types/actionType";
import {getRequest} from "../../../api/request";
import {ViewExam} from "../../../api/queries";

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
            const {data} = await getRequest(ViewExam);
            dispatch(Data_Fetching_Success(data));
        } catch (e) {
            dispatch(Data_Fetching_Fail(e.message));

        }
    }
}

