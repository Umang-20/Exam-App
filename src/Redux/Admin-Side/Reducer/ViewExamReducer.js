import * as types from '../Types/actionType'

const initialState={
    loading:false,
    data:[],
    error:null
}

const viewExamReducer=(state=initialState,action)=>{
    switch(action.type){
        case types.START_DELETING:
            return{
                ...state,
                loadind:true
            }
        case types.VIEW_EXAM_FETCHING:
            return{
                ...state,
                loading:true
            }
        case types.ITEM_DELETED:
            return{
                ...state,
                loading:false,
            }
        case types.VIEW_EXAM_FETCHED:
        return{
            ...state,
            loading:false,
            data:action.payload,
            
        }
        case types.DELETE_FAILED:
        case types.VIEW_EXAM_FAILED:
            return{
                ...state,
                loadind:false,
                error:action.payload
            }

        default:
           return state;
    }
}
export default viewExamReducer