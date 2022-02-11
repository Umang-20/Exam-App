import * as types from "../Types/actionType";
import Fetch_Question_Initialization from "./FetchQuestion";

const Student_Login_Started = () => {
    return {
        type: types.STUDENT_LOGIN_STARTED,
        payload: {
            loading: true,
        }
    }
}

const Student_Login_Success = (details, time, questions) => {
    return {
        type: types.STUDENT_LOGIN_SUCCESS,
        payload: {
            details,
            loading: false,
        }
    }
}

const Student_Login_Fail = (error) => {
    return {
        type: types.STUDENT_LOGIN_FAIL,
        payload: {
            loading:false,
            error,
        }
    }
}

const Student_Login_Initialize = (details) => {
    return async function (dispach) {
        dispach(Student_Login_Started());
        try{
            dispach(Student_Login_Success(details))
            dispach(Fetch_Question_Initialization(details.code))
        }catch (error) {
            dispach(Student_Login_Fail(error.message))
        }
    }
}

export default Student_Login_Initialize;