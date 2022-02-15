import * as types from '../Types/actionType'

const initialState = {
    loading: false,
    data: [],
    error: null
}

const dataReducer = (state = initialState, action) => {
    const {payload} = action;
    switch (action.type) {
        case types.FETCHING_DATA:
            return {
                ...state,
                loading: true
            }
        case types.DATA_FETCHED:
            let viewData = [];
            for (let key in payload) {
                viewData.push({
                    id: key,
                    ...payload[key],
                });
            }
            return {
                ...state,
                data: viewData,
                loading: false
            }
        case types.FETCHING_FAILED:
            return {
                ...state,
                loading: false,
                error: payload
            }

        default:
            return state;
    }
}

export default dataReducer