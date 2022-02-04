import React, {useEffect, useState} from "react";
import style from "./ShowQuestionComponent.module.css";
import {useSelector, useDispatch} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import Fetch_Question_Initialization from "../../../Redux/User-Side/Action/FetchQuestion";
import {Link, useParams} from "react-router-dom";
import Answer_Submission_Initialization from "../../../Redux/User-Side/Action/AnswerSubmissionAction";
import {useHistory} from "react-router";
import Loader from "../../../Common-Component/Loader/Loader";

function ShowQuestionComponent() {
    const dispatch = useDispatch()
    const studentQuestion = useSelector((state) => state.studentQuestion);
    const unicode = Cookies.get("setUnicode");
    const quesNo = parseInt(useParams().id) - 1;
    const [answers, setAnswers] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
    });
    const [mor, setMor] = useState(false);
    const history = useHistory();

    useEffect(() => {
        dispatch(Fetch_Question_Initialization(unicode));
    }, [])

    useEffect(() => {
        if (studentQuestion.payload.questions.length) {
            if ((quesNo > studentQuestion.payload.questions.length - 1) || (quesNo < 0)) {
                history.push("/exam");
                // console.log(quesNo)
                // console.log(studentQuestion.payload.questions.length)
            }
            // else {
            //     console.log("Proper")
            //     console.log(quesNo)
            //     console.log(studentQuestion.payload.questions.length)
            // }
        }

    }, [studentQuestion.payload.questions.length])

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
        console.log(selectedAnswer)
        console.log(studentQuestion.payload.questions[quesNo].id)
        console.log(mor)
        dispatch(Answer_Submission_Initialization(studentQuestion.payload.questions[quesNo].id, selectedAnswer, mor))
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
                {!studentQuestion.payload.questions[quesNo] ? <Loader/> :
                    <>
                        <div className={style.question}>
                            <h2>{studentQuestion.payload.questions[quesNo].data.question}</h2>
                        </div>
                        <div className={style.answer}>
                            <div className={style.optioncontainer}>
                                <div className={style.optionborder}>
                                    <input type="radio" id="1" name="fav_language" value="1" checked={answers["1"]}
                                           onChange={eventListener}/> {" "}
                                    <label
                                        htmlFor="html">{studentQuestion.payload.questions[quesNo].data.option1}</label>
                                </div>
                            </div>
                            <div className={style.optioncontainer}>
                                <div className={style.optionborder}>
                                    <input type="radio" id="2" name="fav_language" value="2" checked={answers["2"]}
                                           onChange={eventListener}/> {" "}
                                    <label
                                        htmlFor="html">{studentQuestion.payload.questions[quesNo].data.option2}</label>
                                </div>
                            </div>
                            <div className={style.optioncontainer}>
                                <div className={style.optionborder}>
                                    <input type="radio" id="3" name="fav_language" value="3" checked={answers["3"]}
                                           onChange={eventListener}/> {" "}
                                    <label
                                        htmlFor="html">{studentQuestion.payload.questions[quesNo].data.option3}</label>
                                </div>
                            </div>
                            <div className={style.optioncontainer}>
                                <div className={style.optionborder}>
                                    <input type="radio" id="4" name="fav_language" value="4" checked={answers["4"]}
                                           onChange={eventListener}/> {" "}
                                    <label
                                        htmlFor="html">{studentQuestion.payload.questions[quesNo].data.option4}</label>
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
                                                    <FontAwesomeIcon className={style.icon1} icon={faAngleLeft}
                                                    />
                                                    Previous
                                                </button>
                                            </Link>
                                        </div>
                                }
                                {
                                    quesNo === studentQuestion.payload.questions.length - 1 ?
                                        <div style={{visibility: "hidden"}}>
                                            <button className={style.button2}>
                                                Next
                                                <FontAwesomeIcon className={style.icon2} icon={faAngleRight}/>
                                            </button>
                                        </div>
                                        :
                                        <div>
                                            <Link to={`/exam/${quesNo + 2}`}>
                                                <button className={style.button2} onClick={answerSubmission}>
                                                    Next
                                                    <FontAwesomeIcon className={style.icon2} icon={faAngleRight}/>
                                                </button>
                                            </Link>
                                        </div>
                                }
                            </div>
                        </div>
                    </>
                }
            </div>
        </>
    );
}

export default ShowQuestionComponent;
