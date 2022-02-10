import {combineReducers} from 'redux'
import userReducer from './Admin-Side/Reducer/reducer'
import dataReducer from './Admin-Side/Reducer/create-examreducer'
import viewExamReducer from './Admin-Side/Reducer/view-examreducer'
import resultReducer from './Admin-Side/Reducer/resultreducer'
import dataReducer1 from "./User-Side/Reducer/DataFetching"
import LoginReducer from "./User-Side/Reducer/LoginReducer";
import FetchQuestionReducer from "./User-Side/Reducer/FetchQuestionReducer";
import AnswerSubmissionReducer from "./User-Side/Reducer/AnswerSubmissionReducer";
import SubmitResultReducer from "./User-Side/Reducer/SubmitResultReducer";

const rootReducer=combineReducers({
    user:userReducer,
    data:dataReducer,
    view:viewExamReducer,
    result:resultReducer,
    allExams:dataReducer1,
    student:LoginReducer,
    studentQuestion:FetchQuestionReducer,
    studentAnswer:AnswerSubmissionReducer,
    studentResult:SubmitResultReducer,
})
export default rootReducer