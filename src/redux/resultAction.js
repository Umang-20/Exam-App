import * as types from "./actionTypes";
import axios from "axios";
const resultFetching = () => ({
    type: types.RESULT_FETCHING,
  });
  const resultFetched = (data) => ({
    type: types.RESULT_FETCHED,
    payload: data,
  });
  const resultFail = (error) => ({
    type: types.RESULT_FAILED,
    payload: error,
  });

  export const resultFetchingIniate = () => {
    return function (dispatch) {
      dispatch(resultFetching());
      axios
        .get("https://auth-test-f6dd6-default-rtdb.firebaseio.com/results.json")
        .then(function (response) {
          let viewdata = [];
          for (let key in response.data) {
            viewdata.push({
              id: key,
              ...response.data[key],
            });
          }
          dispatch(resultFetched(viewdata));
        })
        .catch(function (error) {
          dispatch(resultFail(error.message));
        });
    };
  };
  