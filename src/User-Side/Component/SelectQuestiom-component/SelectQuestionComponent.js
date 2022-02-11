import React, {useEffect, useState} from 'react';
import style from './SelectQuestionComponent.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {Answer_Submission_Initialization, Redirect} from "../../../Redux/User-Side/Action/AnswerSubmissionAction";

function SelectQuestionComponent() {

    const studentQuestion = useSelector((state) => state.studentQuestion);
    const studentAnswer = useSelector((state) => state.studentAnswer);
    const [answer, setAnswer] = useState("");
    const allAnswer = studentAnswer.payload.allAnswer;
    const questions = studentQuestion.payload.questions;
    // const answer = localStorage.getItem("QuesAnswer");
    const QuestionTime = JSON.parse(localStorage.getItem('QuesTime'));

    // console.log(studentQuestion.payload.questions)
    const dispach = useDispatch();
    const quesNo = parseInt(useParams().id) - 1;
    let showMor = [];
    let showAnswered = [];
    let showSkipped = [];

    useEffect(()=>{
        setAnswer(localStorage.getItem("QuesAnswer"));
    },[localStorage.getItem("QuesAnswer")])

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
    // console.log(questions)


    return <>
        <div className={style.selectquestionheader}>
            <label>Question</label>
        </div>
        <div className={style.underline}></div>
        <div className={style.buttoncontainer}>
            <div className={style.allbuttons}>

                {questions?.map((element, index) => {
                    return (<>
                        <div className={style.buttons}>
                            {(quesNo === questions.length || quesNo === -1) ? "" : QuestionTime !== 0 ?
                                (quesNo !== index) ? showMor.includes(index) ? // <Link to={`${index + 1}`}>
                                        <button style={{color: "#f1b101"}} onClick={() => {
                                            dispach(Answer_Submission_Initialization(questions[quesNo].id, answer, false, quesNo, index + 1));
                                        }}
                                        >{index + 1}</button>
                                        // </Link>
                                        : showAnswered.includes(index) ? // <Link to={`${index + 1}`}>
                                            <button style={{color: "green"}} onClick={() => {
                                                dispach(Answer_Submission_Initialization(questions[quesNo].id, answer, false, quesNo, index + 1));
                                            }}
                                            >{index + 1}</button>
                                            // </Link>
                                            : showSkipped.includes(index) ? // <Link to={`${index + 1}`}>
                                                <button style={{color: "red"}} onClick={() => {
                                                    dispach(Answer_Submission_Initialization(questions[quesNo].id, answer, false, quesNo, index + 1));
                                                }}
                                                >{index + 1}</button>
                                                // </Link>
                                                : // <Link to={`${index + 1}`}>
                                                <button onClick={() => {
                                                    dispach(Answer_Submission_Initialization(questions[quesNo].id, answer, false, quesNo, index + 1));
                                                }}
                                                >{index + 1}</button>
                                    // </Link>
                                    :

                                    // <Link to={`${index + 1}`}>
                                    <button style={{backgroundColor: "lightskyblue"}} onClick={() => {
                                        dispach(Answer_Submission_Initialization(questions[quesNo].id, answer, false, quesNo, index + 1));
                                    }}
                                    >{index + 1}</button>
                                // </Link>
                                : (quesNo !== index) ? showMor.includes(index) ? // <Link to={`${index + 1}`}>
                                        <button style={{color: "#f1b101"}} onClick={() => {
                                            dispach(Redirect(`/exam/${index + 1}`));
                                        }}
                                        >{index + 1}</button>
                                        // </Link>
                                        : showAnswered.includes(index) ? // <Link to={`${index + 1}`}>
                                            <button style={{color: "green"}} onClick={() => {
                                                dispach(Redirect(`/exam/${index + 1}`));
                                            }}
                                            >{index + 1}</button>
                                            // </Link>
                                            : showSkipped.includes(index) ? // <Link to={`${index + 1}`}>
                                                <button style={{color: "red"}} onClick={() => {
                                                    dispach(Redirect(`/exam/${index + 1}`));
                                                }}
                                                >{index + 1}</button>
                                                // </Link>
                                                : // <Link to={`${index + 1}`}>
                                                <button onClick={() => {
                                                    dispach(Redirect(`/exam/${index + 1}`));
                                                }}
                                                >{index + 1}</button>
                                    // </Link>
                                    :

                                    // <Link to={`${index + 1}`}>
                                    <button style={{backgroundColor: "lightskyblue"}} onClick={() => {
                                        dispach(Redirect(`/exam/${index + 1}`));
                                    }}
                                    >{index + 1}</button>
                                // </Link>

                            }
                        </div>
                    </>)
                })}

            </div>
        </div>
    </>
}

export default SelectQuestionComponent;
