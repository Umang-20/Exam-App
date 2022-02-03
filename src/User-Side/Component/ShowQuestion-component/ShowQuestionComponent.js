import React, {useEffect, useState} from "react";
import style from "./ShowQuestionComponent.module.css";
import {useSelector, useDispatch} from "react-redux";
// import {questionFetchingInitiate} from "../../../Redux/User-Side//Action/questionFetch";
import {fetchingInitiate} from "../../../Redux/User-Side//Action/initialDataFetch";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight, faAngleLeft} from "@fortawesome/free-solid-svg-icons";

function ShowQuestionComponent() {
    const dispatch = useDispatch()
    // const data1 = useSelector((state) => state.userQues.data)
    // const data2 = useSelector((state) => state.userData.data)
    const {questions} = useSelector((state)=>state.studentQuestion);
    const [quesId, setquesId] = useState([]);
    const code = localStorage.getItem('code')

    useEffect(() => {
        dispatch(fetchingInitiate())
        // dispatch(questionFetchingInitiate());
        console.log('first',);
    }, [])
    // console.log('data1', data1);
    // useEffect(()=>{
    //   dispatch(questionFetchingInitiate())
    // },[data2])
    return (
        <>
            <div className={style.questionarea}>
                {questions?.map((data) => {

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
