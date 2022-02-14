import * as types from '../Types/actionType'

const initialState = {
    loading: false,
    data: [],
    error: null
}

const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.FETCHING_DATA:
        case types.START_UPDATE:
        case types.VIEW_START_DELETING:
            return {
                ...state,
                loading: true
            }
        case types.VIEW_ITEM_DELETED:
            return {
                ...state,
                loading: false
            }
        case types.ITEM_UPDATED:
            return {
                ...state,
                loading: false
            }
        case types.DATA_FETCHED:
            let viewData = [];
            for (let key in action.payload) {
                viewData.push({
                    id: key,
                    ...action.payload[key],
                });
            }
            return {
                ...state,
                loading: false,
                data: viewData,

            }
        case types.FETCHING_FAILED:
        case types.UPDATE_FAILED:
        case types.VIEW_DELETE_FAILED:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}
export default dataReducer