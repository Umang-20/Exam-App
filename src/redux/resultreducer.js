import * as types from './actionTypes'

const initialState={
    loading:false,
    result:[],
    error:null
}
const resultReducer=(state=initialState,action)=>{
    switch(action.type){
      case types.RESULT_FETCHING:
        return{
          ...state,
        loading:true
        }
      case types.RESULT_FETCHED:
        return{
            ...state,
            loading:false,
            result:action.payload
        }
      case types.RESULT_FAILED:
        return{
          ...state,
          loading:false,
          result:action.error
        }

        default:
           return state;
    }
}
export default resultReducer