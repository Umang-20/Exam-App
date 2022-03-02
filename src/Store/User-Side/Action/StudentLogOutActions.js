import * as types from "../Types/actionType";
import {deleteRequest} from "../../../api/request";
import {Redirect} from "./AnswerSubmissionAction";

const Student_LogOut_Started = () => {
    return {
        type: types.STUDENT_LOGOUT_STARTED,
        payload: {
            loading: true,
        }
    }
}

const Student_LogOut_Success = () => {
    return {
        type: types.STUDENT_LOGOUT_SUCCESS,
        payload: {
            loading: false,
        }
    }
}

const Student_LogOut_Fail = (error) => {
    return {
        type: types.STUDENT_LOGOUT_FAIL,
        payload: {
            loading: false,
            error,
        }
    }
}

const Student_LogOut_Initialize = () => {
    return async function (dispach) {
        dispach(Student_LogOut_Started());
        try {
            await deleteRequest("StudentAnswer", "");
            setTimeout(() => {
                dispach(Student_LogOut_Success())
                dispach(Redirect(""))
            }, 500)
        } catch (error) {
            dispach(Student_LogOut_Fail(error.message))
        }
    }
}

export default Student_LogOut_Initialize;