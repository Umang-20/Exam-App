import * as types from "../Types/actionType";
import axios from "axios";

const fetchingStart = () => ({
  type: types.FETCHING_DATA,
});
const dataFetched = (data) => ({
  type: types.DATA_FEACHED,
  payload: data,
});
const fatchingFail = (error) => ({
  type: types.FETCHING_FAILED,
  payload: error,
});

export const fetchingInitiate = () => {
  return function (dispatch) {
    dispatch(fetchingStart());
    axios
      .get("https://auth-test-f6dd6-default-rtdb.firebaseio.com/viewexam.json")
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
        dispatch(fatchingFail(error.message));
      });
  };
};
