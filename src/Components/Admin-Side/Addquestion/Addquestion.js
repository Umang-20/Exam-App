import React from "react";
import {
    Container,
    Form,
    FormControl,
    FormGroup,
    Row,
    Col,
    Dropdown,
    DropdownButton,
    Button, Modal,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import {useState, memo} from "react";
import "./Addquestion.css";

function Addquestion() {
    const [values, setValue] = useState({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctAnswer: "",
        weightage: "",
        time: "",
        type: "",
    });
    const [showError, setShowError] = useState(false);
    const [submitValidation, setSubmitValidation] = useState(false);
    const submitHandler = async () => {
        await fetch(
            "https://auth-test-f6dd6-default-rtdb.firebaseio.com/questions.json",
            {
                method: "POST",
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        setValue({
            question: "",
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            correctAnswer: "",
            weightage: "",
            time: "",
            type: "",
        })
    };

    const checkSubmission = (e) => {
        e.preventDefault();
        const isEmpty = !Object.values(values).every(x => (x !== ''));
        if (isEmpty) {
            setShowError(true);
        } else {
            submitHandler();
        }
    }

    const inputHandler = (e) => {
        e.stopPropagation()
        setValue({...values, question: e.target.value})
    }
    return (
        <>
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
                    <Button onClick={() => {
                        submitHandler();
                        setSubmitValidation(false);
                    }}>Yes</Button>
                    <Button onClick={() => setSubmitValidation(false)}>No</Button>
                </Modal.Footer>
            </Modal>
            <Modal
                show={showError}
                onHide={() => setShowError(false)}
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
                        Fill all the Fields.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button style={{background: "red"}} onClick={() => setShowError(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
            <Container id="container2">
                <Form onSubmit={checkSubmission}>
                    <Form.Group className="mb-3 mt-3">
                        <Form.Control
                            as='input'
                            type="text"
                            placeholder="Enter Your Questions ??"
                            value={values.question}
                            onChange={inputHandler}
                        />
                    </Form.Group>

                    <Row>
                        <Col>
                            <FormGroup className="mb-3">
                                <FormControl
                                    type="text"
                                    placeholder="Option1"
                                    value={values.option1}
                                    onChange={(e) => setValue({...values, option1: e.target.value})}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup className="mb-3">
                                <FormControl
                                    type="text"
                                    placeholder="Option2"
                                    value={values.option2}
                                    onChange={(e) => {
                                        setValue({...values, option2: e.target.value});
                                    }}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup className="mb-3">
                                <FormControl
                                    type="text"
                                    placeholder="Option3"
                                    value={values.option3}
                                    onChange={(e) => {
                                        setValue({...values, option3: e.target.value});
                                    }}
                                />
                            </FormGroup>
                        </Col>
                        <Col>
                            <FormGroup className="mb-3">
                                <FormControl
                                    type="text"
                                    placeholder="Option4"
                                    value={values.option4}
                                    onChange={(e) => {
                                        setValue({...values, option4: e.target.value});
                                    }}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col>

                            <DropdownButton
                                title={`${values.correctAnswer ? values.correctAnswer : "Correct option"}`}
                                id="dropdown-menu-align-right"
                                onSelect={(e) => {
                                    setValue({...values, correctAnswer: e});
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
                                    type="number"
                                    placeholder="Question Mark/ Weightage"
                                    value={values.weightage}
                                    onChange={(e) => {
                                        setValue({...values, weightage: e.target.value});
                                    }}
                                />
                            </FormGroup>
                        </Col>

                        <Col>
                            <FormGroup className="mb-3">
                                <FormControl
                                    type="number"
                                    placeholder="Question Time"
                                    value={values.time}
                                    onChange={(e) => {
                                        setValue({...values, time: e.target.value});
                                    }}
                                />
                            </FormGroup>
                        </Col>

                        <Col>
                            <DropdownButton
                                title={`${values.type ? values.type : "Select Type"}`}
                                id="dropdown-menu-align-right"
                                onSelect={(e) => {
                                    setValue({...values, type: e});
                                }}
                            >
                                <Dropdown.Item eventKey="Science" id="item">
                                    Science
                                </Dropdown.Item>
                                <Dropdown.Item eventKey="Technology">Technology</Dropdown.Item>
                                <Dropdown.Item eventKey="GK">GK</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                    </Row>
                    <Button id="button" type="submit">
                        Submit
                    </Button>
                </Form>
            </Container>
        </>
    );
}

export default memo(Addquestion);


