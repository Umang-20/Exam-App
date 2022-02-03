import React, {useEffect, useState} from "react";
import style from "./ShowQuestionComponent.module.css";
import {useSelector, useDispatch} from "react-redux";
// import {questionFetchingInitiate} from "../../../Redux/User-Side//Action/questionFetch";
import {fetchingInitiate} from "../../../Redux/User-Side/Action/DataFetchActions";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faAngleLeft} from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import Fetch_Question_Initialization from "../../../Redux/User-Side/Action/FetchQuestion";

function ShowQuestionComponent() {
    const dispatch = useDispatch()
    const studentQuestion = useSelector((state)=>state.studentQuestion);
    const [quesId, setquesId] = useState([]);
    const unicode = Cookies.get("setUnicode");

    useEffect(() => {
        dispatch(Fetch_Question_Initialization(unicode));
    }, [])
    // console.log('data1', data1);
    // useEffect(()=>{
    //   dispatch(questionFetchingInitiate())
    // },[data2])
    console.log("@@@",studentQuestion.payload.questions)
    return (
        <>
            <div className={style.questionarea}>
                {studentQuestion.payload.questions?.map((data) => {

                    return (
                        <>
                            <div className={style.question}>
                                <h2>{data.question}</h2>
                            </div>
                            <div className={style.answer}>
                                <div className={style.optioncontainer}>
                                    <div className={style.optionborder}>
                                        <input type="radio" id="html" name="fav_language" value="HTML"/> {" "}
                                        <label htmlFor="html">{data.option1}</label>
                                    </div>
                                </div>
                                <div className={style.optioncontainer}>
                                    <div className={style.optionborder}>
                                        <input type="radio" id="html" name="fav_language" value="HTML"/> {" "}
                                        <label htmlFor="html">{data.option2}</label>
                                    </div>
                                </div>
                                <div className={style.optioncontainer}>
                                    <div className={style.optionborder}>
                                        <input type="radio" id="html" name="fav_language" value="HTML"/> {" "}
                                        <label htmlFor="html">{data.option3}</label>
                                    </div>
                                </div>
                                <div className={style.optioncontainer}>
                                    <div className={style.optionborder}>
                                        <input type="radio" id="html" name="fav_language" value="HTML"/> {" "}
                                        <label htmlFor="html">{data.option4}</label>
                                    </div>
                                </div>
                            </div>
                        </>
                    )

                })}

            </div>
            <div className={style.actionbar}>
                <div className={style.customcheckbox}>
                    <input type="checkbox" id="check"/>
                    <label htmlFor="check">Mark for Review</label>
                </div>
                <div className={style.actions}>
                    <button className={style.button1}>
                        <FontAwesomeIcon className={style.icon1} icon={faAngleLeft}/>
                        Previous
                    </button>
                    <button className={style.button2}>
                        Next
                        <FontAwesomeIcon className={style.icon2} icon={faAngleRight}/>
                    </button>
                </div>
            </div>
        </>
    );
}

export default ShowQuestionComponent;
