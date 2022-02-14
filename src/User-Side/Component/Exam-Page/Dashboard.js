import React, {useEffect} from 'react';
import Header from '../Header/Header';
import Progressbar from '../Progressbar/progressbar';
import Info from '../Info/Info';
import SelectQuestion from '../SelectQuestion/SelectQuestion';
import ShowQuestion from '../ShowQuestion/ShowQuestion';
import "./Dashboard.css"
import {useDispatch} from "react-redux";
import GetAllAnswerActions from "../../../Redux/User-Side/Action/GetAllAnswerActions";
import Cookies from "js-cookie";
import {useParams} from "react-router-dom";

function Dashboard() {
    const quesNo = parseInt(useParams().id) - 1;
    const name = Cookies.get("setUsername")
    const unicode = Cookies.get("setUnicode");
    const dispach = useDispatch()

    useEffect(() => {
        dispach(GetAllAnswerActions());
    }, [dispach]);

    return <>
            <Progressbar/>
            <Header name={name} quesNo={quesNo}/>
            <div className="restBody">
                <Info/>
                <div className="bodyPart">
                    <SelectQuestion quesNo={quesNo}/>
                    <ShowQuestion unicode={unicode} quesNo={quesNo}/>
                </div>
            </div>
    </>
}

export default Dashboard;
