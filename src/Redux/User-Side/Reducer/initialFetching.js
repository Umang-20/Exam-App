import * as types from '../Types/actionType'

const initialState={
    loading:false,
    data:[],
    error:null
}

const dataReducer=(state=initialState,action)=>{
    switch(action.type){
        case types.FETCHING_DATA:
            return{
                ...state,
                loading:true
            }
        case types.DATA_FEACHED:
            return{
                ...state,
                data:action.payload,
                loading:false
            }
        case types.FETCHING_FAILED:
            return{
                ...state,
                loading:false,
                error:action.payload
            }

        default:
            return state;
    }
}

export default dataReducer