import React from "react";
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './circularbar.css'

function Circularbar(props) {
    const percentage = props.value

    return (
        <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
                rotation: 0.25,
                strokeLinecap: 'butt',
                textSize: '16px',
                pathTransitionDuration: 0.5,
                pathColor: `rgba(${props.red},${props.green},${props.blue}, ${percentage / 100})`,
                textColor: `${props.textcolor}`,
                trailColor: '#fff',
                backgroundColor: '#3e98c7',
            })}
        />
    );
}

export default Circularbar;
