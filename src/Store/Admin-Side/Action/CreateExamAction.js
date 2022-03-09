import * as types from "../Types/actionType";
import {deleteRequest, getRequest, putRequest} from "../../../api/request";
import {Questions} from "../../../api/queries";

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
            const {data} = await getRequest(Questions);
            dispatch(dataFetched(data));
        } catch (e) {
            dispatch(fetchingFail(e.message));
        }
    }
}

export const updatingInitiate = (id, data) => {
    return async function (dispatch) {
        dispatch(dataUpdating());
        try {
            await putRequest(Questions, id, data)
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
            await deleteRequest(Questions, id)
            dispatch(deleted())
            dispatch(fetchingInitiate())
        } catch (e) {
            dispatch(deleteFail(e.message))
        }
    }
}
  