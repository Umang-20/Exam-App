import * as types from '../Types/actionType'

const initialState={
    loading:false,
    data:[],
    error:null
}

const questionFetchreducer=(state=initialState,action)=>{
    switch(action.type){
        case types.QUESTION_FETCHING:
            return{
                ...state,
                loading:true
            }
        case types.QUESTION_FETCHED:
            return{
                ...state,
                data:action.payload,
                loading:false
            }
        case types.QUESTION_FETCHING_FAIL:
            return{
                ...state,
                loading:false,
                error:action.payload
            }

        default:
            return state;
    }
}

export default questionFetchreducer