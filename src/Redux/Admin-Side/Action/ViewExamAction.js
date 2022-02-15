import * as types from '../Types/actionType'
import axios from 'axios'

const viewFetching = () => {
    return {
        type: types.VIEW_EXAM_FETCHING
    }
}

const viewFetched = (data) => {
    return {
        type: types.VIEW_EXAM_FETCHED,
        payload: data
    }
}

const viewFetchingFail = (error) => {
    return {
        type: types.VIEW_EXAM_FAILED,
        payload: error
    }
}

const deletingStart = () => {
    return {
        type: types.START_DELETING
    }
}

const deleted = (data) => {
    return {
        type: types.ITEM_DELETED,
        payload: data
    }
}

const deleteFail = (error) => {
    return {
        type: types.DELETE_FAILED,
        payload: error
    }
}

export const viewFetchingInitiate = () => {
    return async function (dispatch) {
        dispatch(viewFetching())
        try {
            const {data} = await axios.get("https://auth-test-f6dd6-default-rtdb.firebaseio.com/viewexam.json")
            dispatch(viewFetched(data))
        } catch (e) {
            dispatch(viewFetchingFail(e.message))
        }
    }
}

export const deleteView = (id) => {
    return async function (dispatch) {
        dispatch(deletingStart())
        try {
            await axios.delete(`https://auth-test-f6dd6-default-rtdb.firebaseio.com/viewexam/${id}.json`)
            dispatch(deleted())
            dispatch(viewFetchingInitiate())
        } catch (e) {
            dispatch(deleteFail(e.message))
        }
    }
}