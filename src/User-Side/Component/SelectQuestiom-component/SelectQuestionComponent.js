import React from 'react';
import style from './SelectQuestionComponent.module.css'
import {useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";

function SelectQuestionComponent() {

    const studentQuestion = useSelector((state) => state.studentQuestion);
    const studentAnswer = useSelector((state) => state.studentAnswer);
    const allAnswer = studentAnswer.payload.allAnswer;
    // console.log(studentQuestion.payload.questions)
    const quesNo = parseInt(useParams().id);
    let showMor = [];
    let showAnswered = [];
    let showSkipped = [];

    allAnswer.filter((element) => {
        if (element.mor === true) {
            showMor.push(element.quesNo);
        } else if ((element.answer) && element.mor === false) {
            showAnswered.push(element.quesNo);
        } else {
            showSkipped.push(element.quesNo);
        }
    })
    // console.log(showMor)
    // console.log(showAnswered)
    // console.log(showSkipped)


    return <>
        <div className={style.selectquestionheader}>
            <label>Question</label>
        </div>
        <div className={style.underline}></div>
        <div className={style.buttoncontainer}>
            <div className={style.allbuttons}>

                {
                    studentQuestion.payload.questions?.map((element, index) => {
                        return (
                            <>
                                <div className={style.buttons}>
                                    {
                                        (quesNo !== index + 1) ?
                                            showMor.includes(index) ?
                                                <Link to={`${index + 1}`}>
                                                    <button style={{color: "#f1b101"}}
                                                    >{index + 1}</button>
                                                </Link>
                                                :
                                                showAnswered.includes(index) ?
                                                    <Link to={`${index + 1}`}>
                                                        <button style={{color: "green"}}
                                                        >{index + 1}</button>
                                                    </Link>
                                                    :
                                                    showSkipped.includes(index) ?
                                                        <Link to={`${index + 1}`}>
                                                            <button style={{color: "red"}}
                                                            >{index + 1}</button>
                                                        </Link>
                                                        :
                                                        <Link to={`${index + 1}`}>
                                                            <button
                                                            >{index + 1}</button>
                                                        </Link>
                                            :

                                            <Link to={`${index + 1}`}>
                                                <button style={{backgroundColor: "lightskyblue"}}
                                                >{index + 1}</button>
                                            </Link>

                                    }
                                </div>
                            </>
                        )
                    })
                }

            </div>
        </div>
    </>
}

export default SelectQuestionComponent;
