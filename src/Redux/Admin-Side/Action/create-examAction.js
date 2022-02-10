import * as types from "../Types/actionTypes";
import axios from "axios";

const dataFetching = () => ({
    type: types.FETCHING_DATA,
});
const dataFetched = (data) => ({
    type: types.DATA_FEACHED,
    payload: data,
});
const fetchingFail = (error) => ({
    type: types.FETCHING_FAILED,
    payload: error,
});
const dataUpdating = () => ({
    type: types.START_UPDATE,
});
const dataUpdated = (data) => ({
    type: types.ITEM_UPDATED,
    payload: data,
});
const updatingFail = (error) => ({
    type: types.UPDATE_FAILED,
    payload: error,
});
const deletingStart = () => (
    {
        type: types.VIEW_START_DELEING
    }
)
const deleted = () => ({
    type: types.VIEW_ITEM_DELETED,

})
const deletefail = (error) => ({
    type: types.VIEW_DELETE_FAILED,
    payload: error
})

export const fetchingIniate = () => {
    return function (dispatch) {
        dispatch(dataFetching());
        axios
            .get("https://auth-test-f6dd6-default-rtdb.firebaseio.com/questions.json")
            .then(function (response) {
                let viewdata = [];
                for (let key in response.data) {
                    viewdata.push({
                        id: key,
                        ...response.data[key],
                    });
                }
                dispatch(dataFetched(viewdata));
            })
            .catch(function (error) {
                dispatch(fetchingFail(error.message));
            });
    };
};

export const updatingIniate = (id, data) => {
    return function (dispatch) {
        dispatch(dataUpdating());
        axios
            .put(`https://auth-test-f6dd6-default-rtdb.firebaseio.com/questions/${id}.json`, data)
            .then(function (response) {
                dispatch(dataUpdated());
                dispatch(fetchingIniate());
            })
            .catch(function (error) {
                dispatch(updatingFail(error.message));
            });
    };
};
export const deleteInitiate = (id) => {
    console.log(id)
    return async function (dispatch) {
        dispatch(deletingStart())
        await axios.delete(`https://auth-test-f6dd6-default-rtdb.firebaseio.com/questions/${id}.json`).then(function (response) {
            dispatch(deleted())
            dispatch(fetchingIniate())
        }).catch(function (error) {
            dispatch(deletefail(error.message))
            console.log(`error`, error)
        });
    }
}
  