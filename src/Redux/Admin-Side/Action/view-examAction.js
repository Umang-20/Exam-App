import * as types from '../Types/actionTypes'
import axios from 'axios'
const viewFetching=()=>(
    {
        type:types.VIEW_EXAM_FETCHING
    }
)
const viewFetched=(data)=>({
    type:types.VIEW_EXAM_FETCHED,
    payload:data
})
const viewfetchingFail=(error)=>({
    type:types.VIEW_EXAM_FAILED,
    payload:error
})
const  deletingStart=()=>(
    {
        type:types.START_DELEING
    }
)
const deleted=(data)=>({
    type:types.ITEM_DELETED,
    payload:data
})
const deletefail=(error)=>({
    type:types.DELETE_FAILED,
    payload:error
})
export const viewfetchingIniate=()=>{
    return async function(dispatch){
        dispatch(viewFetching())
      await axios
        .get("https://auth-test-f6dd6-default-rtdb.firebaseio.com/viewexam.json").then(function (response) {
            const viewData=[]
            for (let key in response.data) {
                viewData.push({
                  id: key,
                 ...response.data[key]
                });
              }
              
                dispatch(viewFetched(viewData))
          }).catch(function (error) {
           dispatch(viewfetchingFail(error.message))
          });
    }
}

export const deleteview=(id)=>{
    console.log(id)
        return async function  (dispatch){
            dispatch(deletingStart())
           await axios.delete(`https://auth-test-f6dd6-default-rtdb.firebaseio.com/viewexam/${id}.json`).then(function (response) {
                dispatch(deleted())
                dispatch(viewfetchingIniate())
              }).catch(function (error) {
               dispatch(deletefail(error.message))
               console.log(`error`, error)
              });
        }
}