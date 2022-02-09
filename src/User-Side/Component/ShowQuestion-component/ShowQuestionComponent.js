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
    Get_Student_Answer, Redirect
} from "../../../Redux/User-Side/Action/AnswerSubmissionAction";
import {useHistory} from "react-router";
import Loader from "../../../Common-Component/Loader/Loader";
import {useBeforeunload} from 'react-beforeunload';

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
    const QuestionTime = JSON.parse(localStorage.getItem('QuesTime'));

    useEffect(() => {
        dispatch(Fetch_Question_Initialization(unicode));
    }, [])

    useEffect(() => {
        if (questions[quesNo]) {
            dispatch(Get_Student_Answer(quesNo, questions[quesNo].time));
            localStorage.setItem("QuesId", JSON.stringify(questions[quesNo].id));
            localStorage.setItem("QuesNo", JSON.stringify(quesNo));
            localStorage.setItem("QuesAnswer", "");
        }
    }, [quesNo, questions])

    useEffect(() => {
        setInterval(() => {
            if (JSON.parse(localStorage.getItem('QuesTime')) !== 0) {
                if (JSON.parse(localStorage.getItem('RemainingQuesTime')) === 0) {
                    const QuesId = JSON.parse(localStorage.getItem("QuesId"));
                    const answer = localStorage.getItem("QuesAnswer");
                    const QuestionNumber = JSON.parse(localStorage.getItem("QuesNo"));
                    dispatch(Answer_Submission_Initialization(QuesId, answer, false, QuestionNumber, QuestionNumber + 2));
                    setAnswers({
                            1: false,
                            2: false,
                            3: false,
                            4: false,
                        }
                    )
                    setMor(false);
                    clearInterval(0);
                    return;
                }
                // console.log(JSON.parse(localStorage.getItem('RemainingQuesTime')))
            }
        }, 1000)
    }, []);

    useEffect(() => {
        if ((studentAnswer.payload.quesNo === quesNo)) {
            setMor(studentAnswer.payload.mor);
            if (studentAnswer.payload.answer !== "undefined") {
                setAnswers({[studentAnswer.payload.answer]: true});
                if (studentAnswer.payload.answer !== undefined) {
                    localStorage.setItem("QuesAnswer", studentAnswer.payload.answer)
                }
                else {
                    localStorage.setItem("QuesAnswer", "");
                }
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


    // useBeforeunload( () => {
    //     dispatch(Answer_Submission_Initialization(questions[quesNo].id,null , false, quesNo,quesNo+1));
    //     console.log("aaaa")
    // });

    // window.onbeforeunload = function(event)
    // {
    //     return alert("Confirm refresh");
    // };


    const eventListener = (event) => {
        const {value, checked} = event.target;
        setAnswers({[value]: checked});
        localStorage.setItem("QuesAnswer", value)
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
        dispatch(Answer_Submission_Initialization(questions[quesNo].id, selectedAnswer, mor, quesNo, quesNo+2));
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
                                        <button className={style.button1} onClick={() => {
                                            dispatch(Redirect(`/exam/${quesNo}`));
                                        }
                                        }>
                                            <FontAwesomeIcon className={style.icon1} icon={faAngleLeft}
                                            />
                                            Previous
                                        </button>
                                    </div>
                                </div>
                            </>
                            :
                            questions[quesNo] ?
                                <>
                                    <div className={style.question}>
                                        <h2>{questions[quesNo].data.question}</h2>
                                    </div>
                                    {
                                        QuestionTime === 0 ?
                                            <>
                                                <div className={style.answer}>
                                                    <div className={style.optioncontainer}>
                                                        <div className={style.optionborder}>
                                                            <input type="radio" disabled={true} id="1"
                                                                   name="fav_language" value="1"
                                                                   checked={answers["1"]}
                                                                   onChange={eventListener}/> {" "}
                                                            <label
                                                                htmlFor="html">{questions[quesNo].data.option1}</label>
                                                        </div>
                                                    </div>
                                                    <div className={style.optioncontainer}>
                                                        <div className={style.optionborder}>
                                                            <input type="radio" disabled={true} id="2"
                                                                   name="fav_language" value="2"
                                                                   checked={answers["2"]}
                                                                   onChange={eventListener}/> {" "}
                                                            <label
                                                                htmlFor="html">{questions[quesNo].data.option2}</label>
                                                        </div>
                                                    </div>
                                                    <div className={style.optioncontainer}>
                                                        <div className={style.optionborder}>
                                                            <input type="radio" disabled={true} id="3"
                                                                   name="fav_language" value="3"
                                                                   checked={answers["3"]}
                                                                   onChange={eventListener}/> {" "}
                                                            <label
                                                                htmlFor="html">{questions[quesNo].data.option3}</label>
                                                        </div>
                                                    </div>
                                                    <div className={style.optioncontainer}>
                                                        <div className={style.optionborder}>
                                                            <input type="radio" disabled={true} id="4"
                                                                   name="fav_language" value="4"
                                                                   checked={answers["4"]}
                                                                   onChange={eventListener}/> {" "}
                                                            <label
                                                                htmlFor="html">{questions[quesNo].data.option4}</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={style.actionbar}>
                                                    <div className={style.customcheckbox}>
                                                        <input type="checkbox" disabled={true} id="check" checked={mor}
                                                               onChange={() => {
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
                                                                        <FontAwesomeIcon className={style.icon1}
                                                                                         icon={faAngleLeft}
                                                                        />
                                                                        Previous
                                                                    </button>
                                                                </div>
                                                                :
                                                                <div>
                                                                    {/*<Link to={`/exam/${quesNo}`}>*/}
                                                                    <button className={style.button1} onClick={() => {
                                                                        dispatch(Redirect(`/exam/${quesNo}`));
                                                                    }
                                                                    }>
                                                                        <FontAwesomeIcon className={style.icon1}
                                                                                         icon={faAngleLeft}
                                                                        />
                                                                        Previous
                                                                    </button>
                                                                    {/*</Link>*/}
                                                                </div>
                                                        }

                                                        <div>
                                                            {/*<Link to={`/exam/${quesNo + 2}`}>*/}
                                                            <button className={style.button2} onClick={() => {
                                                                dispatch(Redirect(`/exam/${quesNo + 2}`));
                                                            }
                                                            }>
                                                                Next
                                                                <FontAwesomeIcon className={style.icon2}
                                                                                 icon={faAngleRight}/>
                                                            </button>
                                                            {/*</Link>*/}
                                                        </div>

                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <>
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
                                                        <input type="checkbox" id="check" checked={mor}
                                                               onChange={() => {
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
                                                                        <FontAwesomeIcon className={style.icon1}
                                                                                         icon={faAngleLeft}
                                                                        />
                                                                        Previous
                                                                    </button>
                                                                </div>
                                                                :
                                                                <div>
                                                                    {/*<Link to={`/exam/${quesNo}`}>*/}
                                                                    <button className={style.button1} onClick={() => {
                                                                        dispatch(Answer_Submission_Initialization(questions[quesNo].id, null, mor, quesNo, quesNo));
                                                                    }
                                                                    }>
                                                                        <FontAwesomeIcon className={style.icon1}
                                                                                         icon={faAngleLeft}
                                                                        />
                                                                        Previous
                                                                    </button>
                                                                    {/*</Link>*/}
                                                                </div>
                                                        }

                                                        <div>
                                                            {/*<Link to={`/exam/${quesNo + 2}`}>*/}
                                                            <button className={style.button2}
                                                                    onClick={answerSubmission}>
                                                                Next
                                                                <FontAwesomeIcon className={style.icon2}
                                                                                 icon={faAngleRight}/>
                                                            </button>
                                                            {/*</Link>*/}
                                                        </div>

                                                    </div>
                                                </div>
                                            </>
                                    }


                                </> : ""
                }
            </div>
        </>
    );
}

export default ShowQuestionComponent;
