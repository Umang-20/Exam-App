import * as types from "../Types/actionType";
import axios from "axios";

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
            loading:false,
            error,
        }
    }
}

const Student_LogOut_Initialize = () => {
    return async function (dispach) {
        dispach(Student_LogOut_Started());
        try{
            await axios.delete("https://auth-test-f6dd6-default-rtdb.firebaseio.com/StudentAnswer.json");
            setTimeout(()=>{
                dispach(Student_LogOut_Success())
            },600)
        }catch (error) {
            dispach(Student_LogOut_Fail(error.message))
        }
    }
}

export default Student_LogOut_Initialize;