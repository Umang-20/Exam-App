import * as types from '../Types/actionType'

const initialState = {
    loading: false,
    data: [],
    error: null
}

const viewExamReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.START_DELETING:
            return {
                ...state,
                loading: true
            }
        case types.VIEW_EXAM_FETCHING:
            return {
                ...state,
                loading: true
            }
        case types.ITEM_DELETED:
            return {
                ...state,
                loading: false,
            }
        case types.VIEW_EXAM_FETCHED:
            const viewData = []
            for (let key in action.payload) {
                viewData.push({
                    id: key,
                    ...action.payload[key]
                });
            }
            return {
                ...state,
                loading: false,
                data: viewData,
            }
        case types.DELETE_FAILED:
        case types.VIEW_EXAM_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}
export default viewExamReducer