import * as types from "../Types/actionType";
import axios from "axios";

const quesfetchingStart = () => ({
  type: types.QUESTION_FETCHING,
});
const quesFetched = (data) => ({
  type: types.QUESTION_FETCHED,
  payload: data,
});
const quesfatchingFail = (error) => ({
  type: types.QUESTION_FETCHING_FAIL,
  payload: error,
});

export const questionFetchingInitiate = (data) => {
  
  return function async(dispatch) {
    let question=[]
    dispatch(quesfetchingStart());
    axios.get('https://auth-test-f6dd6-default-rtdb.firebaseio.com/questions.json').then((response)=>{
      console.log('response.data', response.data);
      for(let key in response.data){
        const found = data.find(element => element === key);
        if(found){
            question.push(response.data[key])
        }
      }
      dispatch(quesFetched(question))
    }).catch((error)=>{
      dispatch(quesfatchingFail(error.message))
    })
    
  };
};
