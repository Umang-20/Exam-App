import React, {useState, useEffect, useRef} from 'react';
import style from './Header.module.css'
import {useSelector} from "react-redux";

function Header({quesNo, name}) {
    const [hour, sethours] = useState(-1);
    const [minute, setminutes] = useState(-1);
    let [second, setseconds] = useState(-1);
    const [time, setTime] = useState(3000);
    const StudentAnswer = useSelector((state) => state.studentAnswer)
    const StudentQuestion = useSelector((state) => state.studentQuestion)
    const QuesTime = JSON.parse(localStorage.getItem('QuesTime'));
    const RemainingQuesTime = JSON.parse(localStorage.getItem('RemainingQuesTime'));

    useEffect(() => {
        setTime(JSON.parse(localStorage.getItem('QuesTime')));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localStorage.getItem('QuesTime'), quesNo]);

    useEffect(() => {
        localStorage.setItem("RemainingQuesTime", JSON.stringify(-1))
    }, [quesNo])

    let interval = useRef()
    const startTimer = (time) => {
        const countdown = new Date().getTime() + (time * 1000)
        interval = setInterval(() => {
            const now = new Date().getTime()
            const distance = (countdown - now)
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24) / (1000 * 60 * 60)))
            const minutes = Math.floor((distance % (1000 * 60 * 60) / (1000 * 60)))
            const seconds = Math.floor((distance % (1000 * 60) / (1000)))
            if (distance < 0) {
                clearInterval(interval.current)
            } else {
                sethours(hours)
                setminutes(minutes)
                setseconds(seconds)
                setTime((hours * 60 * 60) + (minutes * 60) + seconds)
            }
            localStorage.setItem("RemainingQuesTime", JSON.stringify(time))
        }, 1000);
    }


    useEffect(() => {
        startTimer(time);
        return () => {
            clearInterval(interval)
        }
    }, [time])


    return <div className={style.header}>
        <div className={style.logo}>
            <div className={style.logo}>
                {name}
            </div>
            <div className={style.timer}>
                {StudentAnswer.loading || QuesTime === 0 || QuesTime === -1 || hour === -1 || quesNo === -1 || quesNo === StudentQuestion.questions.length ? "00:00:00" :
                    RemainingQuesTime === -1 ? "--:--:--" :
                        <>
                            {hour > 9 ?
                                hour :
                                '0' + hour}
                            :
                            {minute > 9 ?
                                minute
                                :
                                '0' + minute}
                            :
                            {second > 9 ?
                                second
                                :
                                '0' + second}
                        </>

                }

            </div>
        </div>
    </div>
}

export default Header;
