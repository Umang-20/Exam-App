import * as types from "../Types/actionType";
import axios from "axios";

const dataFetching = () => {
    return {
        type: types.FETCHING_DATA,
    }
}

const dataFetched = (data) => {
    return {
        type: types.DATA_FETCHED,
        payload: data,
    }
}

const fetchingFail = (error) => {
    return {
        type: types.FETCHING_FAILED,
        payload: error,
    }
}

const dataUpdating = () => {
    return {
        type: types.START_UPDATE,
    }
}

const dataUpdated = (data) => {
    return {
        type: types.ITEM_UPDATED,
        payload: data,
    }
}

const updatingFail = (error) => {
    return {
        type: types.UPDATE_FAILED,
        payload: error,
    }
}

const deletingStart = () => {
    return {
        type: types.VIEW_START_DELETING
    }
}

const deleted = () => {
    return {
        type: types.VIEW_ITEM_DELETED,

    }
}

const deleteFail = (error) => {
    return {
        type: types.VIEW_DELETE_FAILED,
        payload: error
    }
}

export const fetchingInitiate = () => {
    return async function (dispatch) {
        dispatch(dataFetching());
        try {
            const {data} = await axios.get("https://auth-test-f6dd6-default-rtdb.firebaseio.com/questions.json");
            let viewData = [];
            for (let key in data) {
                viewData.push({
                    id: key,
                    ...data[key],
                });
            }
            dispatch(dataFetched(viewData));
        } catch (e) {
            dispatch(fetchingFail(e.message));
        }
    }
}

export const updatingInitiate = (id, data) => {
    return async function (dispatch) {
        dispatch(dataUpdating());
        try {
            await axios.put(`https://auth-test-f6dd6-default-rtdb.firebaseio.com/questions/${id}.json`, data)
            dispatch(dataUpdated());
            dispatch(fetchingInitiate());
        } catch (e) {
            dispatch(updatingFail(e.message));
        }
    }
}

export const deleteInitiate = (id) => {
    return async function (dispatch) {
        dispatch(deletingStart())
        try {
            await axios.delete(`https://auth-test-f6dd6-default-rtdb.firebaseio.com/questions/${id}.json`)
            dispatch(deleted())
            dispatch(fetchingInitiate())
        } catch (e) {
            dispatch(deleteFail(e.message))
        }
    }
}
  