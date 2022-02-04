import React, {useState} from 'react';
import Header from '../Header/Header';
import Progressbar from '../Progressbar/progressbar';
import Info from '../Info/Info';
import SelectQuestion from '../SelectQuestion/SelectQuestion';
import ShowQuestion from '../ShowQuestion/ShowQuestion';
import "./Dashboard.css"
import {useSelector} from "react-redux";

function Dashboard() {
    return <>
        <Progressbar/>
        <Header/>
        <div className="restBody">
            <Info/>
            <div className="bodyPart">
                <SelectQuestion/>
                <ShowQuestion/>
            </div>
        </div>
    </>
}

export default Dashboard;
