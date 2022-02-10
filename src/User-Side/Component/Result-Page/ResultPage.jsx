import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Fetch_Question_Initialization from "../../../Redux/User-Side/Action/FetchQuestion";
import Result_Submission_Initialization from "../../../Redux/User-Side/Action/SubmitResultAction";
import Cookies from "js-cookie";
import Loader from "../../../Common-Component/Loader/Loader";
import "./ResultPage.css";

const ResultPage = () => {
    const [totalMarks, setTotalMarks] = useState(-1);
    const [scoredMarks, setScoredMarks] = useState(-1);
    const studentQuestion = useSelector((state) => state.studentQuestion);
    const studentResult = useSelector((state) => state.studentResult);
    const unicode = Cookies.get("setUnicode");
    const email = Cookies.get("setEmail");
    const clgname = Cookies.get("setClgname");
    const username = Cookies.get("setUsername");
    const questions = studentQuestion.payload.questions;
    const resultQuestion = studentResult.payload.exam_ques;
    const dispach = useDispatch();

    useEffect(() => {
        dispach(Fetch_Question_Initialization(unicode));
        dispach(Result_Submission_Initialization());
    }, []);

    useEffect(() => {
        getResult();
    }, [studentQuestion, studentResult])


    const getResult = () => {
        let tMarks = 0;
        let sMarks = 0;
        resultQuestion.forEach((element) => {
            questions.find((element2) => {
                if (element2.id === element.ques_id) {
                    tMarks = tMarks + parseInt(element2.data.weightage);
                    if (parseInt(element2.data.correctAnswer) === element.selected_op) {
                        sMarks = sMarks + parseInt(element2.data.weightage);
                    }
                }
            })
        })
        setTotalMarks(tMarks);
        setScoredMarks(sMarks);
    }

    return (
        <>
            {
                (totalMarks === -1 && scoredMarks === -1) ? <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100wh",
                        height: "80vh"
                    }}><Loader/></div> :
                    <>
                        <div className="resultTable">
                            <table>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>University</th>
                                    <th>Total Marks</th>
                                    <th>Scored Marks</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{username}</td>
                                    <td>{email}</td>
                                    <td>{clgname}</td>
                                    <td>{totalMarks}</td>
                                    <td>{scoredMarks}</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </>
            }
        </>
    );
};

export default ResultPage;
