import React from "react";
import style from "./ShowQuestion.module.css";
import ShowQuestionComponent from "../ShowQuestion-component/ShowQuestionComponent";

function ShowQuestion() {
  return (
    <div className={style.showquestion}>
      <div className={style.selectbox}>
        <ShowQuestionComponent />
      </div>
    </div>
  );
}

export default ShowQuestion;
