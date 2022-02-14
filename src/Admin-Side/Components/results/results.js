import React, {useEffect, useState} from "react";
import {Container, Table, Modal, Card, Row, Col} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {resultFetchingInitiate} from "../../../Redux/Admin-Side/Action/ResultAction";
import {fetchingInitiate} from "../../../Redux/Admin-Side/Action/CreateExamAction";
import {RemoveRedEye} from "@material-ui/icons";
import Circularbar from "../circularprogressbar/circularbar";
import "./result.css";
import Loader from "../../../Common-Component/Loader/Loader";

function Results() {
    const dispatch = useDispatch();
    const {result} = useSelector((state) => state.result);
    const {loading} = useSelector((state) => state.result);
    const {data} = useSelector((state) => state.data);
    const [modalShow, setModalShow] = useState(false);
    const [report, setReport] = useState({
        report_totalmarks: "",
        report_score: "",
        report_no_of_question: "",
        report_right_question: "",
        report_total_hardques: "",
        report_total_moderatedques: "",
        report_total_mediumques: "",
        report_total_easyques: "",
        report_total_hardright: "",
        report_total_moderatedright: "",
        report_total_mediumright: "",
        report_total_easyright: "",
        name: "",
        date: "",
        clgname: "",
    });
    const [eligible, setEligible] = useState("Not Eligible");
    useEffect(() => {
        dispatch(resultFetchingInitiate());
        dispatch(fetchingInitiate());
    }, [dispatch]);
    if (loading) {
        return <div
            style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100wh", height: "50vh"}}>
            <Loader/></div>;
    } else {
    }
    const showResultHandler = (id) => {
        setEligible("Not Eligible");
        let totalmarks = 0;
        let score = 0;
        let rightquestion = 0;
        let totalhardques = 0;
        let totalmoderatedques = 0;
        let totalmediumques = 0;
        let totaleasyques = 0;
        let totalhardright = 0;
        let totalmoderatedright = 0;
        let totalmediumright = 0;
        let totaleasyright = 0;
        const getQues = result.find((e) => e.id === id);
        const totalquestion = getQues.exam_ques.length;
        for (let k in getQues.exam_ques) {
            for (let l in data) {
                console.log();
                if (data[l].id === getQues.exam_ques[k].ques_id) {
                    if (data[l].weightage === "5") {
                        totalhardques++;
                        if (parseInt(data[l].correctAnswer) === parseInt(getQues.exam_ques[k].selected_op)) {
                            totalhardright++;
                        }
                    }
                    if (data[l].weightage === "4") {
                        totalmoderatedques++;
                        if (parseInt(data[l].correctAnswer) === parseInt(getQues.exam_ques[k].selected_op)) {
                            totalmoderatedright++;
                        }
                    }
                    if (data[l].weightage === "3" || data[l].weightage === "2") {
                        totalmediumques++;
                        if (parseInt(data[l].correctAnswer) === parseInt(getQues.exam_ques[k].selected_op)) {
                            totalmediumright++;
                        }
                    }
                    if (data[l].weightage === "1") {
                        totaleasyques++;
                        if (parseInt(data[l].correctAnswer) === parseInt(getQues.exam_ques[k].selected_op)) {
                            totaleasyright++;
                        }
                    }
                    totalmarks = parseInt(data[l].weightage) + totalmarks;
                    if (parseInt(data[l].correctAnswer) === parseInt(getQues.exam_ques[k].selected_op)) {
                        rightquestion++;
                        score = parseInt(data[l].weightage) + score;
                    }
                }
            }
        }

        if (rightquestion >= totalquestion * 0.6) {
            setEligible("Eligible")
        }

        setReport({
            report_totalmarks: totalmarks,
            report_score: score,
            report_no_of_question: totalquestion,
            report_right_question: rightquestion,
            report_total_hardques: totalhardques,
            report_total_moderatedques: totalmoderatedques,
            report_total_mediumques: totalmediumques,
            report_total_easyques: totaleasyques,
            report_total_hardright: totalhardright,
            report_total_moderatedright: totalmoderatedright,
            report_total_mediumright: totalmediumright,
            report_total_easyright: totaleasyright,
            name: getQues.name,
            date: getQues.date,
            clgname: getQues.clgname,
        });

        setModalShow(true);
    };

    return (<div className="wrapper">
        <Container id='container3'>
            <Modal id="result-modal" show={modalShow} size="lg" centered>
                <Modal.Header onHide={() => setModalShow(false)} closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {report.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row xs={1} md={2} className="g-4">
                        <Col>
                            <Card id="card-1">
                                <Card.Body>
                                    <Card.Text>Exam-Date : {report.date}</Card.Text>
                                    <Card.Text>College : {report.clgname}</Card.Text>
                                    <Card.Text>Status : {eligible}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card id="card-2">
                                <Card.Body>
                                    <Card.Text>
                                        Total Question : {report.report_no_of_question}
                                    </Card.Text>
                                    <Card.Text>
                                        Total Right : {report.report_right_question}
                                    </Card.Text>
                                    <Card.Text>
                                        Total Wrong :{' '}
                                        {report.report_no_of_question - report.report_right_question}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>

                            <Card id="card-3">
                                <Card.Body>
                                    <Card.Title>Hard</Card.Title>
                                    <Card.Text>
                                        Total Question : {report.report_total_hardques}
                                    </Card.Text>
                                    <Card.Text>
                                        Right : {report.report_total_hardright}
                                    </Card.Text>
                                    <Card.Text id="result-card-text">
                                        <Circularbar
                                            red={255}
                                            green={0}
                                            blue={0}
                                            textcolor='#fff'
                                            value={((report.report_total_hardright / report.report_total_hardques) * 100).toFixed(2)}
                                        />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card id="card-4">
                                <Card.Body>
                                    <Card.Title>Moderated</Card.Title>
                                    <Card.Text>
                                        Total Question : {report.report_total_moderatedques}
                                    </Card.Text>
                                    <Card.Text>
                                        Right : {report.report_total_moderatedright}
                                    </Card.Text>
                                    <Card.Text id="result-card-text">
                                        <Circularbar
                                            red={0}
                                            green={74}
                                            blue={247}
                                            textcolor='#fff'
                                            value={((report.report_total_moderatedright / report.report_total_moderatedques) * 100).toFixed(2)}
                                        />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card id="card-5">
                                <Card.Body>
                                    <Card.Title>Medium</Card.Title>
                                    <Card.Text>
                                        Total Question : {report.report_total_mediumques}
                                    </Card.Text>
                                    <Card.Text>
                                        Right : {report.report_total_mediumright}
                                    </Card.Text>
                                    <Card.Text id="result-card-text">
                                        <Circularbar
                                            red={255}
                                            green={131}
                                            blue={8}
                                            textcolor='#fff'
                                            value={((report.report_total_mediumright / report.report_total_mediumques) * 100).toFixed(2)}
                                        />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col>
                            <Card id="card-6">
                                <Card.Body>
                                    <Card.Title>Easy</Card.Title>
                                    <Card.Text>
                                        Total Question : {report.report_total_easyques}
                                    </Card.Text>
                                    <Card.Text>
                                        Right : {report.report_total_easyright}
                                    </Card.Text>
                                    <Card.Text id="result-card-text">
                                        <Circularbar
                                            red={39}
                                            green={255}
                                            blue={0}
                                            textcolor='#fff'
                                            value={((report.report_total_easyright / report.report_total_easyques) * 100).toFixed(2)}
                                        />
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>
                    <Row id='result-row'>
                        <Col id="col-7" xs={6}>
                            <div className="result-col">
                                <Card id="card-7">
                                    <Card.Body>
                                        <Card.Title>Total score</Card.Title>
                                        <Card.Text>
                                            Total Marks : {report.report_totalmarks}
                                        </Card.Text>
                                        <Card.Text>
                                            Scored : {report.report_score}
                                        </Card.Text>
                                        <Card.Text id="result-card-text">
                                            <Circularbar
                                                red={0}
                                                green={0}
                                                blue={0}
                                                textcolor='#85827f'
                                                value={((report.report_score / report.report_totalmarks) * 100).toFixed(2)}
                                            />
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>

            <Table striped id="table">
                <thead id="header">
                <tr>
                    <th>No.</th>
                    <th>Student Name</th>
                    <th>Email</th>
                    <th>Report</th>
                </tr>
                </thead>
                {!loading && (<tbody>
                {result?.map((data, key) => {
                    return (
                        <tr key={key}>
                            <td>{key + 1}</td>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>
                                <button onClick={() => showResultHandler(data.id)}>
                                    <RemoveRedEye id="redeye"/>
                                </button>
                            </td>
                        </tr>);
                })}
                </tbody>)}
            </Table>
        </Container>
    </div>);
}

export default Results;
