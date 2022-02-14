import React from 'react';
import style from './SelectedQuestion.module.css'
import SelectQuestionComponent from '../SelectQuestiom-component/SelectQuestionComponent';

function SelectQuestion({quesNo}) {
  return <div className={style.SelectedQuestion}>
      <div className={style.selectbox}>
          <SelectQuestionComponent quesNo={quesNo}/>
      </div>
  </div>;
}

export default SelectQuestion;
