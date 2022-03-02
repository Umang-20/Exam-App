import * as types from '../Types/actionType'

const initialState = {
    loading: false,
    result: [],
    error: null
}
const resultReducer = (state = initialState, action) => {
    const {payload} = action;
    switch (action.type) {
        case types.RESULT_FETCHING:
            return {
                ...state,
                loading: true
            }
        case types.RESULT_FETCHED:
            let viewData = [];
            for (let key in payload) {
                viewData.push({
                    id: key,
                    ...payload[key],
                });
            }
            return {
                ...state,
                loading: false,
                result: viewData,
            }
        case types.RESULT_FAILED:
            return {
                ...state,
                loading: false,
                result: action.error
            }

        default:
            return state;
    }
}
export default resultReducer