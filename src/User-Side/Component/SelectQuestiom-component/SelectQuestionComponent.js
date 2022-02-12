import React from 'react';
import style from './SelectQuestionComponent.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {Answer_Submission_Initialization, Redirect} from "../../../Redux/User-Side/Action/AnswerSubmissionAction";

function SelectQuestionComponent() {

    const studentQuestion = useSelector((state) => state.studentQuestion);
    const studentAnswer = useSelector((state) => state.studentAnswer);
    const allAnswer = studentAnswer.payload.allAnswer;
    const questions = studentQuestion.payload.questions;
    const QuestionTime = JSON.parse(localStorage.getItem('QuesTime'));

    const dispach = useDispatch();
    const quesNo = parseInt(useParams().id) - 1;
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


    return <>
        <div className={style.selectquestionheader}>
            <label>Question</label>
        </div>
        <div className={style.underline}></div>
        <div className={style.buttoncontainer}>
            <div className={style.allbuttons}>

                {questions?.map((element, index) => {
                    return (
                        <div className={style.buttons} key={index}>
                            {(quesNo === questions.length || quesNo === -1) ? "" : QuestionTime !== 0 ?
                                (quesNo !== index) ?
                                    showMor.includes(index) ?
                                        <button style={{color: "#f1b101"}} onClick={() => {
                                            dispach(Answer_Submission_Initialization(questions[quesNo].id, localStorage.getItem("QuesAnswer"), false, quesNo, index + 1));
                                        }}
                                        >{index + 1}</button>
                                        : showAnswered.includes(index) ?
                                            <button style={{color: "green"}} onClick={() => {
                                                dispach(Answer_Submission_Initialization(questions[quesNo].id, localStorage.getItem("QuesAnswer"), false, quesNo, index + 1));
                                            }}
                                            >{index + 1}</button>
                                            : showSkipped.includes(index) ?
                                                <button style={{color: "red"}} onClick={() => {
                                                    dispach(Answer_Submission_Initialization(questions[quesNo].id, localStorage.getItem("QuesAnswer"), false, quesNo, index + 1));
                                                }}
                                                >{index + 1}</button>
                                                :
                                                <button onClick={() => {
                                                    dispach(Answer_Submission_Initialization(questions[quesNo].id, localStorage.getItem("QuesAnswer"), false, quesNo, index + 1));
                                                }}
                                                >{index + 1}</button>
                                    :
                                    <button style={{backgroundColor: "lightskyblue"}}
                                    >{index + 1}</button>
                                : (quesNo !== index) ? showMor.includes(index) ?
                                        <button style={{color: "#f1b101"}} onClick={() => {
                                            dispach(Redirect(`/exam/${index + 1}`));
                                        }}
                                        >{index + 1}</button>
                                        : showAnswered.includes(index) ?
                                            <button style={{color: "green"}} onClick={() => {
                                                dispach(Redirect(`/exam/${index + 1}`));
                                            }}
                                            >{index + 1}</button>
                                            : showSkipped.includes(index) ?
                                                <button style={{color: "red"}} onClick={() => {
                                                    dispach(Redirect(`/exam/${index + 1}`));
                                                }}
                                                >{index + 1}</button>
                                                :
                                                <button onClick={() => {
                                                    dispach(Redirect(`/exam/${index + 1}`));
                                                }}
                                                >{index + 1}</button>
                                    :
                                    <button style={{backgroundColor: "lightskyblue"}} onClick={() => {
                                    }}
                                    >{index + 1}</button>
                            }
                        </div>)
                })}

            </div>
        </div>
    </>
}

export default SelectQuestionComponent;
