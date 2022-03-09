import {
    Table, Container, DropdownButton, Dropdown, Col, Row, Button, Modal, Form, FormGroup, FormControl
} from "react-bootstrap";
import "./create-exam.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect, useState} from "react";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import Edit from "@material-ui/icons/Edit";
import Add from "@material-ui/icons/Add";
import {Clear} from "@material-ui/icons";
import {useSelector, useDispatch} from "react-redux";
import {fetchingInitiate} from "../../../Store/Admin-Side/Action/CreateExamAction";
import {updatingInitiate} from "../../../Store/Admin-Side/Action/CreateExamAction";
import {deleteInitiate} from "../../../Store/Admin-Side/Action/CreateExamAction";
import Loader from "../../Common-Component/Loader/Loader";
import {postRequest} from "../../../api/request";
import {ViewExam} from "../../../api/queries";

function CreateExam() {
    const questions = useSelector((state) => state.data.data);
    const {loading} = useSelector((state) => state.data);
    const dispatch = useDispatch();
    const [id, setId] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    const [submitValidation, setSubmitValidation] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [form, setForm] = useState({
        time: "",
        uniqueCode: Math.random().toString(36).substr(2, 7),
        selectedQues: [],
    });
    const [editForm, setEditForm] = useState({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "", correctAnswer: "",
        weightage: "",
        time: "",
        type: "",
    })
    const [isChecked, setIsChecked] = useState({});
    const [creator, setCreator] = useState({
        name: "",
        email: "",
    });
    const [isCreator, setIsCreator] = useState(true);


    useEffect(() => {
        dispatch(fetchingInitiate());
    }, [dispatch]);

    const onchangeHandler = (e) => {
        const {name, checked, value} = e.target;

        setIsChecked((preValue) => {
            return {
                ...preValue, [name]: checked,
            }
        })

        if (checked) {
            setForm((preValue) => {
                return {
                    ...preValue,
                    selectedQues: [...form.selectedQues, value]
                }
            })
        } else if (!checked) {
            const new1 = form.selectedQues.filter((element) => element !== value)
            setForm((preValue) => {
                return {
                    ...preValue,
                    selectedQues: [...new1]
                }
            })
        }
    };

    const toSubmitValidation = () => {
        if ((form.selectedQues.length <= 5) || (form.time === "")) {
            setSubmitError(true);
        } else if ((creator.name === "") || (creator.email === "")) {
            setIsCreator(true);
        } else {
            setSubmitValidation(true);
        }
    }

    const onCreateHandler = async () => {
        const d = new Date();
        const month = d.getMonth() + 1;
        const day = d.getDate();
        const year = d.getFullYear();
        const currentTime = d.getTime();
        const {time, uniqueCode, selectedQues} = form;
        const finalData = {time, uniqueCode, selectedQues, year, day, month, currentTime, creator};
        await postRequest(ViewExam, finalData)
        setForm({
            time: "",
            uniqueCode: Math.random().toString(36).substr(2, 7),
            selectedQues: [],
        });
        setIsChecked({});
    };
    const saveClickHandler = () => {
        dispatch(updatingInitiate(id, editForm))
        setModalShow(false)
    }
    const popUpClick = () => {
        dispatch(deleteInitiate(id));
        setModalShow2(false);

    };
    const deleteHandler = (id) => {
        setId(id);
        setModalShow2(true);
    }

    function MyVerticallyCenteredModal(props) {
        return (<Modal {...props} size="lg">
            <Modal.Header
                onHide={() => setModalShow2(false)}
                closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Do You Want to Delete ?
                </Modal.Title>
            </Modal.Header>

            <Modal.Footer>
                <Button variant="danger" onClick={popUpClick}>
                    Delete
                </Button>
                <Button variant="success" onClick={() => setModalShow2(false)}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>);
    }

    const editHandler = (id) => {
        setId(id);
        setModalShow(true);
        if (questions?.length && id) {
            const result = questions?.find((e) => e.id === id);
            setEditForm({
                question: result.question,
                option1: result.option1,
                option2: result.option2,
                option3: result.option3,
                option4: result.option4,
                correctAnswer: result.correctAnswer,
                weightage: result.weightage,
                time: result.time,
                type: result.type,
            })
        }
    };

    return (

        <div className="fullTable">
            <MyVerticallyCenteredModal
                show={modalShow2}
                backdrop={true}
            />
            <Modal
                show={modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header
                    onHide={() => setModalShow(false)}
                    closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Edit Question
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormGroup className="mb-3 mt-3">
                            <FormControl value={editForm.question}
                                         type="text"
                                         onChange={(e) => {
                                             setEditForm({...editForm, question: e.target.value});
                                         }}
                                         placeholder="Enter Your Questions ??"/>
                        </FormGroup>
                        <Row>
                            <Col>
                                <FormGroup className="mb-3">
                                    <FormControl
                                        value={editForm.option1}
                                        type="text"
                                        onChange={(e) => {
                                            setEditForm({...editForm, option1: e.target.value});
                                        }}
                                        placeholder="Option1"/>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup className="mb-3">
                                    <FormControl
                                        value={editForm.option2}
                                        type="text"
                                        onChange={(e) => {
                                            setEditForm({...editForm, option2: e.target.value});
                                        }}
                                        placeholder="Option2"/>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup className="mb-3">
                                    <FormControl
                                        value={editForm.option3}
                                        onChange={(e) => {
                                            setEditForm({...editForm, option3: e.target.value});
                                        }}
                                        type="text" placeholder="Option3"/>
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup className="mb-3">
                                    <FormControl
                                        value={editForm.option4}
                                        type="text"
                                        onChange={(e) => {
                                            setEditForm({...editForm, option4: e.target.value});
                                        }}
                                        placeholder="Option4"/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <DropdownButton
                                    title={`${editForm.correctAnswer ? editForm.correctAnswer : "Correct Option"}`}
                                    id="dropdown-menu-align-right"
                                    onSelect={(e) => {
                                        setEditForm({...editForm, correctAnswer: e});
                                    }}
                                >
                                    <Dropdown.Item eventKey="1">1</Dropdown.Item>
                                    <Dropdown.Item eventKey="2">2</Dropdown.Item>
                                    <Dropdown.Item eventKey="3">3</Dropdown.Item>
                                    <Dropdown.Item eventKey="4">4</Dropdown.Item>
                                </DropdownButton>
                            </Col>

                            <Col>
                                <FormGroup className="mb-3">
                                    <FormControl
                                        value={editForm.weightage}
                                        onChange={(e) => {
                                            setEditForm({...editForm, weightage: e.target.value});
                                        }}
                                        type="number"
                                        placeholder="Question Mark/ Weightage"
                                    />
                                </FormGroup>
                            </Col>

                            <Col>
                                <FormGroup className="mb-3">
                                    <FormControl
                                        value={editForm.time}
                                        onChange={(e) => {
                                            setEditForm({...editForm, time: e.target.value});
                                        }}
                                        type="number"
                                        placeholder="Question time"
                                    />
                                </FormGroup>
                            </Col>

                            <Col>
                                <DropdownButton
                                    title={`${editForm.type ? editForm.type : "Select Type"}`}
                                    id="dropdown-menu-align-right"
                                    onSelect={(e) => {
                                        setEditForm({...editForm, type: e});
                                    }}
                                >
                                    <Dropdown.Item eventKey="Science" id="item">
                                        Science
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="Technology">
                                        Technology
                                    </Dropdown.Item>
                                    <Dropdown.Item eventKey="GK">GK</Dropdown.Item>
                                </DropdownButton>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setModalShow(false)}>Close</Button>
                    <Button variant='success' onClick={saveClickHandler}>Save</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={submitValidation}
                onHide={() => setSubmitValidation(false)}
                size="g"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Do You Want to Create an Exam?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button style={{background: "#0096FF"}} onClick={() => {
                        onCreateHandler();
                        setSubmitValidation(false);
                    }}>Yes</Button>
                    <Button style={{background: "#ff5a5a"}} onClick={() => setSubmitValidation(false)}>No</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={submitError}
                onHide={() => setSubmitError(false)}
                size="g"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Invalid Submission.
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Select 5 or more Questions.
                        or
                        Set the Timer.
                    </p>
                    <p>
                        or
                        Enter Creator Details.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{background: "#0096FF"}} onClick={() => setSubmitError(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={isCreator}
                onHide={() => setIsCreator(false)}
                backdrop="static"
                size="g"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Exam Creator Details
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Row>
                            <Col>
                                <FormGroup className="mb-3">
                                    <FormControl
                                        value={creator.name}
                                        type="text"
                                        onChange={(e) => {
                                            setCreator({...creator, name: e.target.value});
                                        }}
                                        placeholder="Name"/>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup className="mb-3">
                                    <FormControl
                                        value={creator.email}
                                        type="email"
                                        onChange={(e) => {
                                            setCreator({...creator, email: e.target.value});
                                        }}
                                        placeholder="Email ID"/>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{background: "#0096FF"}} onClick={() => {
                        setIsCreator(false);
                        if((form.selectedQues.length >= 5) && (form.time !== "")){
                            setSubmitValidation(true);
                        }
                    }}>Save</Button>
                </Modal.Footer>
            </Modal>

            <Row id="row">
                <Col>
                    <input
                        type="text"
                        disabled
                        className="form-control"
                        placeholder="Unique Code"
                        value={form.uniqueCode}
                        onChange={(e) => {
                            setForm({...form, uniqueCode: e.target.value});
                        }}
                    />
                </Col>
                <Col>
                    <DropdownButton
                        title={`${form.time ? form.time : "Expiry Time"}`}
                        id="dropdown-menu-align-right"
                        onSelect={(e) => {
                            setForm({...form, time: e});
                        }}
                    >
                        <Dropdown.Item eventKey="1">1hr</Dropdown.Item>
                        <Dropdown.Item eventKey="2">2hr</Dropdown.Item>
                        <Dropdown.Item eventKey="3">3hr</Dropdown.Item>
                        <Dropdown.Item eventKey="4">4hr</Dropdown.Item>
                        <Dropdown.Item eventKey="5">5hr</Dropdown.Item>
                    </DropdownButton>
                </Col>
                <Col>
                    <Button id="all"
                            onClick={() => {
                                setForm({
                                    ...form,
                                    time: "",
                                    selectedQues: [],
                                });
                                setIsChecked({});
                            }}>
                        <Clear/>
                        Clear
                    </Button>
                </Col>
                <Col>
                    <Button id="all"
                            onClick={toSubmitValidation}>
                        <Add/>
                        Create
                    </Button>
                </Col>
            </Row>
            <Container id="container1">
                {
                    questions.length || loading ?
                        loading ? <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100wh",
                                height: "25vh"
                            }}><Loader/></div> :
                            <Table striped id="table">
                                <thead id="header">
                                <tr>
                                    <th>Select Questions</th>
                                    <th>Questions</th>
                                    <th>Type</th>
                                    <th>Weightage</th>
                                    <th>Time</th>
                                    <th>Actions</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    questions?.map((data, index) => {
                                        return (
                                            <tr key={data.id}>
                                                <td>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id="checkboxNoLabel"
                                                        value={data.id}
                                                        name={index}
                                                        checked={isChecked[index]}
                                                        onChange={onchangeHandler}
                                                    />
                                                </td>
                                                <td id="question">{data.question}</td>
                                                <td>{data.type}</td>
                                                <td>{data.weightage}</td>
                                                <td>{data.time}</td>
                                                <td>
                                                    <button onClick={() => editHandler(data.id)}>
                                                        <span id="hover-text">Edit Question</span>
                                                        <Edit id="editicon"/>
                                                    </button>
                                                    <span> | </span>
                                                    <button onClick={() => deleteHandler(data.id)}>
                                                        <span id="hover-text">Delete Item</span>
                                                        <DeleteForeverIcon id="deleteicon"/>
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })
                                }
                                </tbody>
                            </Table> :
                        <Table striped id="table">
                            <thead id="header">
                            <tr>
                                <th>Select Questions</th>
                                <th>Questions</th>
                                <th>Type</th>
                                <th>Weightage</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td colSpan="6">No Data Found</td>
                            </tr>
                            </tbody>
                        </Table>
                }

            < /Container>
        </div>
    );
}

export default CreateExam;
