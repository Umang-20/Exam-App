import React from "react";
import style from "./ShowQuestion.module.css";
import ShowQuestionComponent from "../ShowQuestion-component/ShowQuestionComponent";

function ShowQuestion({quesNo, unicode}) {
    return (
        <div className={style.showquestion}>
            <div className={style.selectbox}>
                <ShowQuestionComponent quesNo={quesNo} unicode={unicode}/>
            </div>
        </div>
    );
}

export default ShowQuestion;
