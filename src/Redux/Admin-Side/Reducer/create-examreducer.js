import * as types from '../Types/actionTypes'

const initialState={
    loading:false,
    data:[],
    error:null
}

const dataReducer=(state=initialState,action)=>{
    switch(action.type){
        case types.FETCHING_DATA:
        case types.START_UPDATE:
        case types.VIEW_START_DELEING:
            return{
                ...state,
                loading:true
            }
        case types.VIEW_ITEM_DELETED:
            return{
                ...state,
                loadind:false
            }
        case types.ITEM_UPDATED:
            return{
                ...state,
                loading:false
            }
        case types.DATA_FEACHED:
        return{
            ...state,
            loading:false,
            data:action.payload,
            
        }
        case types.FETCHING_FAILED:
        case types.UPDATE_FAILED:
        case types.VIEW_DELETE_FAILED:
            return{
                ...state,
                loadind:false,
                error:action.payload
            }

        default:
           return state;
    }
}
export default dataReducer