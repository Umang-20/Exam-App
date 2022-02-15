import React, {useEffect, useState} from "react";
import style from "./ShowQuestionComponent.module.css";
import {useSelector, useDispatch} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import Fetch_Question_Initialization from "../../../Redux/User-Side/Action/FetchQuestion";
import {Answer_Submission_Initialization, Redirect} from "../../../Redux/User-Side/Action/AnswerSubmissionAction";
import {useHistory} from "react-router";
import Loader from "../../../Common-Component/Loader/Loader";
import {Button, Modal} from "react-bootstrap";
import SubmitResultAction from "../../../Redux/User-Side/Action/SubmitResultAction";
import Get_Student_Answer from "../../../Redux/User-Side/Action/GetStudentAnswerAction";


function ShowQuestionComponent({quesNo, unicode}) {
    const dispatch = useDispatch()
    const studentQuestion = useSelector((state) => state.studentQuestion);
    const studentAnswer = useSelector((state) => state.studentAnswer);
    const [answers, setAnswers] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
    });
    const [mor, setMor] = useState(false);
    const [isReload, setIsReload] = useState(false);
    const questions = studentQuestion.questions;
    const history = useHistory();
    const QuestionTime = JSON.parse(localStorage.getItem('QuesTime'));

    useEffect(() => {
        dispatch(Fetch_Question_Initialization(unicode));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch])

    useEffect(() => {
        if (questions[quesNo]) {
            dispatch(Get_Student_Answer(quesNo, questions[quesNo].time));
            localStorage.setItem("QuesId", JSON.stringify(questions[quesNo].id));
            localStorage.setItem("QuesNo", JSON.stringify(quesNo));
            localStorage.setItem("QuesAnswer", "");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [quesNo, questions])

    useEffect(() => {
        setInterval(() => {
            if (JSON.parse(localStorage.getItem('QuesTime')) !== 0) {
                if ((JSON.parse(localStorage.getItem('RemainingQuesTime')) === 0) || (JSON.parse(localStorage.getItem('RemainingQuesTime')) === 1)) {
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
            }
        }, 1000)
    }, [dispatch]);

    useEffect(() => {
        if ((studentAnswer.quesNo === quesNo)) {
            setMor(studentAnswer.mor);
            if (studentAnswer.answer !== "undefined") {
                setAnswers({...answers, [studentAnswer.answer]: true});
                if (studentAnswer.answer !== undefined) {
                    localStorage.setItem("QuesAnswer", studentAnswer.answer)
                } else {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [studentAnswer, quesNo])

    useEffect(() => {
        if (questions.length) {
            if ((quesNo.toString().match(/^[a-z]/i)) || (quesNo > questions.length) || (quesNo < -1)) {
                history.goBack();
            }
        }
    }, [questions.length, history, quesNo])


    useEffect(() => {
        window.onbeforeunload = function () {
            return "you can not refresh the  page";
        }
        window.onload = function () {
            setIsReload(false);
            // dispatch(SubmitResultAction());
        }
    }, [dispatch]);

    useEffect(() => {
        const showJoinNow = (event) => {
            const {clientY, clientX} = event;
            if (!isReload && (clientX <= 0 || clientY <= 0)) {
                setIsReload(true);
            }
        };

        document.addEventListener('mouseleave', showJoinNow);
        return () => {
            document.removeEventListener('mouseleave', showJoinNow);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const eventListener = (event) => {
        const {value, checked} = event.target;
        setAnswers({[value]: checked});
        localStorage.setItem("QuesAnswer", value)
    }

    const answerSubmission = () => {
        dispatch(Answer_Submission_Initialization(questions[quesNo].id, localStorage.getItem("QuesAnswer"), mor, quesNo, quesNo + 2));
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
            <Modal
                show={isReload}
                onHide={() => setIsReload(false)}
                size="g"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Disclaimer
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p style={{textAlign: "center"}}>During The Exam, Page Refresh is not Allowed.</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{background: "#0dc181"}} onClick={() => {
                        setIsReload(false);
                    }}>Confirm</Button>
                </Modal.Footer>
            </Modal>
            <div className={style.questionarea}>
                {
                    quesNo === studentQuestion.questions.length ?
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
                        ((studentAnswer.loading) || (studentQuestion.loading)) ?
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100wh",
                                height: "40vh"
                            }}><Loader/></div>
                            :
                            quesNo === -1 ?
                                <>
                                    <div className={style.questionOver}>
                                        <div><h3>Start Exam</h3></div>
                                    </div>
                                    <div className={style.actionbar}>
                                        <div className={style.actions}>
                                            <button className={style.button2} onClick={() => {
                                                dispatch(Redirect(`/exam/${quesNo + 2}`));
                                            }
                                            }>
                                                Start
                                                <FontAwesomeIcon className={style.icon2}
                                                                 icon={faAngleRight}/>
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
                                                            <input type="checkbox" disabled={true} id="check"
                                                                   checked={mor}
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
                                                                        <button className={style.button1}
                                                                                onClick={() => {
                                                                                    dispatch(Redirect(`/exam/${quesNo}`));
                                                                                }
                                                                                }>
                                                                            <FontAwesomeIcon className={style.icon1}
                                                                                             icon={faAngleLeft}
                                                                            />
                                                                            Previous
                                                                        </button>
                                                                    </div>
                                                            }

                                                            <div>
                                                                <button className={style.button2} onClick={() => {
                                                                    dispatch(Redirect(`/exam/${quesNo + 2}`));
                                                                }
                                                                }>
                                                                    Next
                                                                    <FontAwesomeIcon className={style.icon2}
                                                                                     icon={faAngleRight}/>
                                                                </button>
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
                                                                       onChange={(e) => {
                                                                           setAnswers({
                                                                               1: true,
                                                                               2: false,
                                                                               3: false,
                                                                               4: false,
                                                                           })
                                                                           localStorage.setItem("QuesAnswer", JSON.stringify(1))
                                                                       }
                                                                       }/> {" "}
                                                                <label
                                                                    htmlFor="html">{questions[quesNo].data.option1}</label>
                                                            </div>
                                                        </div>
                                                        <div className={style.optioncontainer}>
                                                            <div className={style.optionborder}>
                                                                <input type="radio" id="2" name="fav_language" value="2"
                                                                       checked={answers["2"]}
                                                                       onChange={(e) => {
                                                                           setAnswers({
                                                                               1: false,
                                                                               2: true,
                                                                               3: false,
                                                                               4: false,
                                                                           })
                                                                           localStorage.setItem("QuesAnswer", JSON.stringify(2))
                                                                       }}/> {" "}
                                                                <label
                                                                    htmlFor="html">{questions[quesNo].data.option2}</label>
                                                            </div>
                                                        </div>
                                                        <div className={style.optioncontainer}>
                                                            <div className={style.optionborder}>
                                                                <input type="radio" id="3" name="fav_language" value="3"
                                                                       checked={answers["3"]}
                                                                       onChange={(e) => {
                                                                           setAnswers({
                                                                               1: false,
                                                                               2: false,
                                                                               3: true,
                                                                               4: false,
                                                                           })
                                                                           localStorage.setItem("QuesAnswer", JSON.stringify(3))
                                                                       }}/> {" "}
                                                                <label
                                                                    htmlFor="html">{questions[quesNo].data.option3}</label>
                                                            </div>
                                                        </div>
                                                        <div className={style.optioncontainer}>
                                                            <div className={style.optionborder}>
                                                                <input type="radio" id="4" name="fav_language" value="4"
                                                                       checked={answers["4"]}
                                                                       onChange={(e) => {
                                                                           setAnswers({
                                                                               1: false,
                                                                               2: false,
                                                                               3: false,
                                                                               4: true,
                                                                           })
                                                                           localStorage.setItem("QuesAnswer", JSON.stringify(4))
                                                                       }}/> {" "}
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
                                                                        <button className={style.button1}
                                                                                onClick={() => {
                                                                                    dispatch(Answer_Submission_Initialization(questions[quesNo].id, localStorage.getItem("QuesAnswer"), mor, quesNo, quesNo));
                                                                                }
                                                                                }>
                                                                            <FontAwesomeIcon className={style.icon1}
                                                                                             icon={faAngleLeft}
                                                                            />
                                                                            Previous
                                                                        </button>
                                                                    </div>
                                                            }

                                                            <div>
                                                                <button className={style.button2}
                                                                        onClick={answerSubmission}>
                                                                    Next
                                                                    <FontAwesomeIcon className={style.icon2}
                                                                                     icon={faAngleRight}/>
                                                                </button>
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
