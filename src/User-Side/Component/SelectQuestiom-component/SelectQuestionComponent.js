import React from 'react';
import style from './SelectQuestionComponent.module.css'
import {useSelector} from "react-redux";
import {Link, useParams} from "react-router-dom";

function SelectQuestionComponent() {

    const studentQuestion = useSelector((state) => state.studentQuestion);
    // console.log(studentQuestion.payload.questions)
    const quesNo = parseInt(useParams().id);

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

                                        (quesNo !== index+1) ?
                                            <Link to={`${index+1}`}>
                                                <button>{index + 1}</button>
                                            </Link>
                                            :
                                            <Link to={`${index+1}`}>
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
