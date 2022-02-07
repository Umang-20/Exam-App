import React, {useEffect, useState} from 'react';
import Header from '../Header/Header';
import Progressbar from '../Progressbar/progressbar';
import Info from '../Info/Info';
import SelectQuestion from '../SelectQuestion/SelectQuestion';
import ShowQuestion from '../ShowQuestion/ShowQuestion';
import "./Dashboard.css"
import {useDispatch} from "react-redux";
import GetAllAnswerActions from "../../../Redux/User-Side/Action/GetAllAnswerActions";

function Dashboard() {

    const dispach = useDispatch()

    useEffect(() => {
        dispach(GetAllAnswerActions());
    }, []);

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
