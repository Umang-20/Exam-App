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
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState ,memo} from "react";
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
    type: "",
  });
  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(values);

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
    type: "",
    })
  };
console.log('hello')
 const inputHandler=(e)=>{
   e.stopPropagation()
   setValue({ ...values, question: e.target.value })
 }
  return (
    <Container id="container2">
      <Form onSubmit={submitHandler}>
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
                onChange={(e) =>  setValue({ ...values, option1: e.target.value })}
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
                  setValue({ ...values, option2: e.target.value });
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
                  setValue({ ...values, option3: e.target.value });
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
                  setValue({ ...values, option4: e.target.value });
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
                setValue({ ...values, correctAnswer: e });
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
                  setValue({ ...values, weightage: e.target.value });
                }}
              />
            </FormGroup>
          </Col>

          <Col>
            <DropdownButton
              title={`${values.type ? values.type : "Select Type"}`}
              id="dropdown-menu-align-right"
              onSelect={(e) => {
                setValue({ ...values, type: e });
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
        <Button id="button" type="submit" >
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default memo(Addquestion);


