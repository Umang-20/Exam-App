import React, {useState, useEffect} from "react";
import style from "./Userlogin.module.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch, useSelector} from "react-redux";
import {fetchingInitiate} from "../../../Store/User-Side/Action/DataFetchActions";
import {
    faUser,
    faEnvelope,
    faUniversity,
    faKey,
} from "@fortawesome/free-solid-svg-icons";
import Student_Login_Initialize from "../../../Store/User-Side/Action/StudentLoginActions";


function Userlogin() {
    const [error, setError] = useState("");
    const [form, setForm] = useState({
        username: '',
        email: '',
        clgname: '',
        code: '',
    });
    const [unicode, setUnicode] = useState([]);
    const {data} = useSelector((state) => state.allExams)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchingInitiate())
    }, [dispatch])


    useEffect(() => {
        if (data.length) {
            const ucode = []
            for (let key in data) {
                ucode.push(data[key].uniqueCode)
            }
            setUnicode(ucode)
        }
    }, [data])

//Login Handler
    const submitHandler = (e) => {
        e.preventDefault()
        const isEmpty = !Object.values(form).every(x => (x !== ''));
        const found = unicode.find(element => element === form.code)
        if (isEmpty || !form.username.match(/^[a-zA-Z]+$/)) {
            setError("Enter Details Properly");
        } else if (!found) {
            setError("Invalid Key");
        } else {
            const examTime = new Date().getTime();
            let remainTime = 0;
            let givenTime = 0;
            data.forEach((element) => {
                if (form.code === element.uniqueCode) {
                    remainTime = examTime - element.currentTime;
                    givenTime = parseInt(element.time) * 1000 * 60 * 60;
                }
            })
            if (remainTime > givenTime) {
                setError("Exam Expired");
            } else {
                dispatch(Student_Login_Initialize(form))
            }
        }
    }

    return (
        <>
            <div className={style.background}>
                <div className={style.logincard}>
                    <div className={style.container2}>
                        <h3>Student Details</h3>
                        <form onSubmit={submitHandler} className={style.form}>
                            <div className={style.inputbox}>
                                <FontAwesomeIcon icon={faUser}/>
                                <input type="text" placeholder="Name"
                                       value={form.username}
                                       onChange={(e) => {
                                           setForm({...form, username: e.target.value});
                                           setError("")
                                       }}
                                />
                            </div>

                            <div className={style.inputbox}>
                                <FontAwesomeIcon icon={faEnvelope}/>

                                <input type="email" placeholder="example@abc.com"
                                       value={form.email}
                                       onChange={(e) => {
                                           setForm({...form, email: e.target.value});
                                           setError("")
                                       }}/>
                            </div>

                            <div className={style.inputbox}>
                                <FontAwesomeIcon icon={faUniversity}/>
                                <input type="text" placeholder="Stanford University"
                                       value={form.clgname}
                                       onChange={(e) => {
                                           setForm({...form, clgname: e.target.value});
                                           setError("")
                                       }}/>
                            </div>

                            <div className={style.inputbox}>
                                <FontAwesomeIcon icon={faKey}/>
                                <input type="text" placeholder="8a9ds84"
                                       value={form.code}
                                       onChange={(e) => {
                                           setForm({...form, code: e.target.value});
                                           setError("")
                                       }}/>
                            </div>
                            <span style={{color: "red"}}>{error}</span>
                            <button type='submit'>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Userlogin;
