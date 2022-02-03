import React from 'react';
import style from './Info.module.css'
function Info() {
   const localitem=29
   const clgname=localStorage.getItem('setclgname')
  return <div className={style.info}>
      <div className={style.text}>
      <h3>{clgname}</h3>
      </div>
      <div className={style.clgname}>
          
          <div className={style.details}>
              <div className={style.detail}>
                  <label >Question :</label>
                  <label className={style.question}> {localitem}</label>
              </div>
              <div className={style.detail}>
                  <label>Answerd : </label>
                  <label className={style.answer}> {localitem}</label>
              </div>
              <div className={style.detail}>
                  <label>Mark To Review : </label>
                  <label className={style.mark}> {localitem}</label>
              </div>
              <div className={style.detail}>
                  <label>Skipped : </label>
                  <label className={style.skipped}> {localitem}</label>

              </div>
          </div>
          <button>Submit</button>
      </div>
  </div>;
}

export default Info;
