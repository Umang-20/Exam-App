import {combineReducers} from 'redux'
import userReducer from './Admin-Side/Reducer/reducer'
import dataReducer from './Admin-Side/Reducer/create-examreducer'
import viewExamReducer from './Admin-Side/Reducer/view-examreducer'
import resultReducer from './Admin-Side/Reducer/resultreducer'
import dataReducer1 from "./User-Side/Reducer/initialFetching"
import questionFetchreducer from "./User-Side/Reducer/Questionfetchreducer";

const rootReducer=combineReducers({
    user:userReducer,
    data:dataReducer,
    view:viewExamReducer,
    result:resultReducer,
    userData:dataReducer1,
    userQues:questionFetchreducer,
})
export default rootReducer