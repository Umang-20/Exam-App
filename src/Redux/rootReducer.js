import {combineReducers} from 'redux'
import userReducer from './Admin-Side/Reducer/reducer'
import dataReducer from './Admin-Side/Reducer/create-examreducer'
import viewExamReducer from './Admin-Side/Reducer/view-examreducer'
import resultReducer from './Admin-Side/Reducer/resultreducer'
import dataReducer1 from "./User-Side/Reducer/DataFetching"
import LoginReducer from "./User-Side/Reducer/LoginReducer";
import FetchQuestionReducer from "./User-Side/Reducer/FetchQuestionReducer";

const rootReducer=combineReducers({
    user:userReducer,
    data:dataReducer,
    view:viewExamReducer,
    result:resultReducer,
    allExams:dataReducer1,
    student:LoginReducer,
    studentQuestion:FetchQuestionReducer,
})
export default rootReducer