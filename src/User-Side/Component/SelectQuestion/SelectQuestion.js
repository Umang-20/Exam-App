import React from 'react';
import style from './SelectedQuestion.module.css'
import SelectQuestionComponent from '../SelectQuestiom-component/SelectQuestionComponent';

function SelectQuestion() {
  return <div className={style.SelectedQuestion}>
      <div className={style.selectbox}>
          <SelectQuestionComponent/>
      </div>
  </div>;
}

export default SelectQuestion;
