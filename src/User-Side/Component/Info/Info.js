import React, {useState} from 'react';
import style from './Info.module.css'
import {useSelector} from "react-redux";
import Cookies from "js-cookie";

function Info() {
    const studentQuestion = useSelector((state) => state.studentQuestion);
    const studentAnswer = useSelector((state) => state.studentAnswer);
    const totalQuestion = studentQuestion.payload.questions.length;
    const allAnswer = studentAnswer.payload.allAnswer;
    // console.log(allAnswer)
    // console.log(totalQuestion)

    const countMor = allAnswer.filter((element) => element.mor === true);
    const countAnswered = allAnswer.filter((element)=>element.answer && element.mor === false)
    // console.log(countAnswered)

    const countSkipped = allAnswer.length - countAnswered.length - countMor.length

    const clgname = Cookies.get("setClgname")

    return <div className={style.info}>
        <div className={style.text}>
            <h3>{clgname}</h3>
        </div>
        <div className={style.clgname}>

            <div className={style.details}>
                <div className={style.detail}>
                    <label>Question :</label>
                    <label className={style.question}> {totalQuestion}</label>
                </div>
                <div className={style.detail}>
                    <label>Answerd : </label>
                    <label className={style.answer}> {countAnswered.length}</label>
                </div>
                <div className={style.detail}>
                    <label>Mark To Review : </label>
                    <label className={style.mark}> {countMor.length}</label>
                </div>
                <div className={style.detail}>
                    <label>Skipped : </label>
                    <label className={style.skipped}> {countSkipped}</label>

                </div>
            </div>
            <button>Submit</button>
        </div>
    </div>;
}

export default Info;
