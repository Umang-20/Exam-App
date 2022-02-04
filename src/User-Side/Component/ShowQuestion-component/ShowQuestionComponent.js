import React, {useEffect, useState} from "react";
import style from "./ShowQuestionComponent.module.css";
import {useSelector, useDispatch} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import Fetch_Question_Initialization from "../../../Redux/User-Side/Action/FetchQuestion";
import {Link, useParams} from "react-router-dom";

function ShowQuestionComponent() {
    const dispatch = useDispatch()
    const studentQuestion = useSelector((state) => state.studentQuestion);
    const unicode = Cookies.get("setUnicode");
    const quesNo = parseInt(useParams().id) - 1;

    useEffect(() => {
        dispatch(Fetch_Question_Initialization(unicode));
    }, [])


    return (
        <>
            <div className={style.questionarea}>
                {studentQuestion.payload.questions.length ?
                    <>
                        <div className={style.question}>
                            <h2>{studentQuestion.payload.questions[quesNo].data.question}</h2>
                        </div>
                        <div className={style.answer}>
                            <div className={style.optioncontainer}>
                                <div className={style.optionborder}>
                                    <input type="radio" id="html" name="fav_language" value="HTML"/> {" "}
                                    <label
                                        htmlFor="html">{studentQuestion.payload.questions[quesNo].data.option1}</label>
                                </div>
                            </div>
                            <div className={style.optioncontainer}>
                                <div className={style.optionborder}>
                                    <input type="radio" id="html" name="fav_language" value="HTML"/> {" "}
                                    <label
                                        htmlFor="html">{studentQuestion.payload.questions[quesNo].data.option2}</label>
                                </div>
                            </div>
                            <div className={style.optioncontainer}>
                                <div className={style.optionborder}>
                                    <input type="radio" id="html" name="fav_language" value="HTML"/> {" "}
                                    <label
                                        htmlFor="html">{studentQuestion.payload.questions[quesNo].data.option3}</label>
                                </div>
                            </div>
                            <div className={style.optioncontainer}>
                                <div className={style.optionborder}>
                                    <input type="radio" id="html" name="fav_language" value="HTML"/> {" "}
                                    <label
                                        htmlFor="html">{studentQuestion.payload.questions[quesNo].data.option4}</label>
                                </div>
                            </div>
                        </div>
                        <div className={style.actionbar}>
                            <div className={style.customcheckbox}>
                                <input type="checkbox" id="check"/>
                                <label htmlFor="check">Mark for Review</label>
                            </div>
                            <div className={style.actions}>
                                {
                                    quesNo === 0 ?
                                        <div style={{visibility:"hidden"}}>
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
                                        <div style={{visibility:"hidden"}}>
                                                <button className={style.button2}>
                                                    Next
                                                    <FontAwesomeIcon className={style.icon2} icon={faAngleRight}/>
                                                </button>
                                        </div>
                                        :
                                        <div>
                                            <Link to={`/exam/${quesNo + 2}`}>
                                                <button className={style.button2}>
                                                    Next
                                                    <FontAwesomeIcon className={style.icon2} icon={faAngleRight}/>
                                                </button>
                                            </Link>
                                        </div>
                                }


                            </div>
                        </div>
                    </> : ""
                }
            </div>
        </>
    );
}

export default ShowQuestionComponent;
