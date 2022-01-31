import {combineReducers} from 'redux'
import userReducer from './reducer'
import dataReducer from './create-examreducer'
import viewExamReducer from './view-examreducer'
import resultReducer from './resultreducer'

const rootReducer=combineReducers({
    user:userReducer,
    data:dataReducer,
    view:viewExamReducer,
    result:resultReducer,
})
export default rootReducer