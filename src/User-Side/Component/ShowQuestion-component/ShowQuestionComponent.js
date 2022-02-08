import React, {useEffect, useState} from "react";
import style from "./ShowQuestionComponent.module.css";
import {useSelector, useDispatch} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import Fetch_Question_Initialization from "../../../Redux/User-Side/Action/FetchQuestion";
import {Link, useParams} from "react-router-dom";
import {
    Answer_Submission_Initialization,
    Get_Student_Answer
} from "../../../Redux/User-Side/Action/AnswerSubmissionAction";
import {useHistory} from "react-router";
import Loader from "../../../Common-Component/Loader/Loader";

function ShowQuestionComponent() {
    const dispatch = useDispatch()
    const studentQuestion = useSelector((state) => state.studentQuestion);
    const studentAnswer = useSelector((state) => state.studentAnswer);
    const unicode = Cookies.get("setUnicode");
    const quesNo = parseInt(useParams().id) - 1;
    const [answers, setAnswers] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
    });
    const [mor, setMor] = useState(false);
    const questions = studentQuestion.payload.questions;
    const history = useHistory();

    useEffect(() => {
        dispatch(Fetch_Question_Initialization(unicode));
    }, [])

    useEffect(() => {
        if (questions[quesNo]) {
            dispatch(Get_Student_Answer(quesNo, questions[quesNo].time));
        }
    }, [quesNo, questions])

    useEffect(() => {
        if ((studentAnswer.payload.quesNo === quesNo)) {
            setMor(studentAnswer.payload.mor);
            if (studentAnswer.payload.answer !== "undefined") {
                setAnswers({[studentAnswer.payload.answer]: true});
            }
        } else {
            setMor(false);
            setAnswers({
                1: false,
                2: false,
                3: false,
                4: false,
            });
        }
    }, [studentAnswer, quesNo])

    useEffect(() => {
        if (questions.length) {
            if ((quesNo.toString().match(/^[a-z]/i)) || (quesNo > questions.length) || (quesNo < 0)) {
                history.goBack();
            }
        }
    }, [questions.length])

    const eventListener = (event) => {
        const {value, checked} = event.target;
        setAnswers({[value]: checked});
    }

    const answerSubmission = () => {
        let selectedAnswer;
        if (Object.keys(answers).length > 1) {
            selectedAnswer = null;
        } else {
            selectedAnswer = Object.keys(answers)[0];
        }
        // console.log(selectedAnswer)
        // console.log(questions[quesNo].id)
        // console.log(mor)
        // console.log(quesNo)
        // console.log(questions[quesNo].time)
        dispatch(Answer_Submission_Initialization(questions[quesNo].id, selectedAnswer, mor, quesNo));
        setAnswers({
                1: false,
                2: false,
                3: false,
                4: false,
            }
        )
        setMor(false);
    }


    return (
        <>
            <div className={style.questionarea}>
                {
                    ((studentAnswer.payload.loading) || (studentQuestion.payload.loading)) ?
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100wh",
                            height: "40vh"
                        }}><Loader/></div> :
                        quesNo === studentQuestion.payload.questions.length ?
                            <>
                                <div className={style.questionOver}>
                                    <div><h3>All Questions are Over</h3></div>
                                </div>
                                <div className={style.actionbar}>
                                    <div className={style.actions}>
                                        <Link to={`/exam/${quesNo}`}>
                                            <button className={style.button1}>
                                                <FontAwesomeIcon className={style.icon1} icon={faAngleLeft}
                                                />
                                                Previous
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </>
                            :
                            questions[quesNo] ?
                                <>
                                    <div className={style.question}>
                                        <h2>{questions[quesNo].data.question}</h2>
                                    </div>
                                    <div className={style.answer}>
                                        <div className={style.optioncontainer}>
                                            <div className={style.optionborder}>
                                                <input type="radio" id="1" name="fav_language" value="1"
                                                       checked={answers["1"]}
                                                       onChange={eventListener}/> {" "}
                                                <label
                                                    htmlFor="html">{questions[quesNo].data.option1}</label>
                                            </div>
                                        </div>
                                        <div className={style.optioncontainer}>
                                            <div className={style.optionborder}>
                                                <input type="radio" id="2" name="fav_language" value="2"
                                                       checked={answers["2"]}
                                                       onChange={eventListener}/> {" "}
                                                <label
                                                    htmlFor="html">{questions[quesNo].data.option2}</label>
                                            </div>
                                        </div>
                                        <div className={style.optioncontainer}>
                                            <div className={style.optionborder}>
                                                <input type="radio" id="3" name="fav_language" value="3"
                                                       checked={answers["3"]}
                                                       onChange={eventListener}/> {" "}
                                                <label
                                                    htmlFor="html">{questions[quesNo].data.option3}</label>
                                            </div>
                                        </div>
                                        <div className={style.optioncontainer}>
                                            <div className={style.optionborder}>
                                                <input type="radio" id="4" name="fav_language" value="4"
                                                       checked={answers["4"]}
                                                       onChange={eventListener}/> {" "}
                                                <label
                                                    htmlFor="html">{questions[quesNo].data.option4}</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={style.actionbar}>
                                        <div className={style.customcheckbox}>
                                            <input type="checkbox" id="check" checked={mor} onChange={() => {
                                                setMor(!mor)
                                            }
                                            }/>
                                            <label htmlFor="check">Mark for Review</label>
                                        </div>
                                        <div className={style.actions}>
                                            {
                                                quesNo === 0 ?
                                                    <div style={{visibility: "hidden"}}>
                                                        <button className={style.button1}>
                                                            <FontAwesomeIcon className={style.icon1} icon={faAngleLeft}
                                                            />
                                                            Previous
                                                        </button>
                                                    </div>
                                                    :
                                                    <div>
                                                        <Link to={`/exam/${quesNo}`}>
                                                            <button className={style.button1}>
                                                                <FontAwesomeIcon className={style.icon1}
                                                                                 icon={faAngleLeft}
                                                                />
                                                                Previous
                                                            </button>
                                                        </Link>
                                                    </div>
                                            }

                                            <div>
                                                {/*<Link to={`/exam/${quesNo + 2}`}>*/}
                                                    <button className={style.button2} onClick={answerSubmission}>
                                                        Next
                                                        <FontAwesomeIcon className={style.icon2}
                                                                         icon={faAngleRight}/>
                                                    </button>
                                                {/*</Link>*/}
                                            </div>

                                        </div>
                                    </div>
                                </> : ""
                }
            </div>
        </>
    );
}

export default ShowQuestionComponent;
