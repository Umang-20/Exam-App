import React, {useEffect} from 'react';
import Header from '../../Components/User-Side/Header/Header';
import Progressbar from '../../Components/User-Side/Progressbar/progressbar';
import Info from '../../Components/User-Side/Info/Info';
import SelectQuestion from '../../Components/User-Side/SelectQuestion/SelectQuestion';
import ShowQuestion from '../../Components/User-Side/ShowQuestion/ShowQuestion';
import "./Dashboard.css"
import {useDispatch} from "react-redux";
import GetAllAnswerActions from "../../Store/User-Side/Action/GetAllAnswerActions";
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
