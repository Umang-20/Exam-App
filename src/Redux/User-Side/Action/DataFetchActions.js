import * as types from "../Types/actionType";
import axios from "axios";

const Data_Fetching_Started = () => ({
    type: types.FETCHING_DATA,
});
const Data_Fetching_Success = (data) => ({
    type: types.DATA_FETCHED,
    payload: data,
});
const Data_Fetching_Fail = (error) => ({
    type: types.FETCHING_FAILED,
    payload: error,
});

export const fetchingInitiate = () => {
    return function (dispatch) {
        dispatch(Data_Fetching_Started());
        axios
            .get("https://auth-test-f6dd6-default-rtdb.firebaseio.com/viewexam.json")
            .then(function (response) {
                let viewData = [];
                for (let key in response.data) {
                    viewData.push({
                        id: key,
                        ...response.data[key],
                    });
                }
                dispatch(Data_Fetching_Success(viewData));
            })
            .catch(function (error) {
                dispatch(Data_Fetching_Fail(error.message));
            });
    };
};
