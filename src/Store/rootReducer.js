import {combineReducers} from 'redux'
import userReducer from './Admin-Side/Reducer/AdminLoginReducer'
import dataReducer from './Admin-Side/Reducer/CreateExamReducer'
import viewExamReducer from './Admin-Side/Reducer/ViewExamReducer'
import resultReducer from './Admin-Side/Reducer/ResultReducer'
import dataReducer1 from "./User-Side/Reducer/DataFetching"
import LoginReducer from "./User-Side/Reducer/LoginReducer";
import FetchQuestionReducer from "./User-Side/Reducer/FetchQuestionReducer";
import AnswerSubmissionReducer from "./User-Side/Reducer/AnswerSubmissionReducer";
import SubmitResultReducer from "./User-Side/Reducer/SubmitResultReducer";
import {STUDENT_LOGOUT_SUCCESS} from "./User-Side/Types/actionType";
import {LOGOUT_SUCCESS} from "./Admin-Side/Types/actionType";

const appReducer = combineReducers({
    user: userReducer,
    data: dataReducer,
    view: viewExamReducer,
    result: resultReducer,
    allExams: dataReducer1,
    student: LoginReducer,
    studentQuestion: FetchQuestionReducer,
    studentAnswer: AnswerSubmissionReducer,
    studentResult: SubmitResultReducer,
})

// reset the state of a redux store
const rootReducer = (state, action) => {
    if ((action.type === LOGOUT_SUCCESS) || (action.type === STUDENT_LOGOUT_SUCCESS)) {
        state = undefined;
    }
    return appReducer(state, action)
}
export default rootReducer