import "./view-exam.css";
import { Table, Container, Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { viewfetchingIniate } from "../../../Redux/Admin-Side/Action/view-examAction";
import { DeleteOutline } from "@material-ui/icons";
import { RemoveRedEye } from "@material-ui/icons";
import { deleteview } from "../../../Redux/Admin-Side/Action/view-examAction";
import { fetchingIniate } from "../../../Redux/Admin-Side/Action/create-examAction";
import Loader from "../../../Common-Component/Loader/Loader";

function ViewExam() {
  
  const [selectedQue, setselectedQue] = useState([])
  const loading1 = useSelector((state) => state.view.loading);
  const [quesId, setQuesId] = useState("");
  const viewData = useSelector((state) => state.view.data);
  const data2 = useSelector((state) => state.data.data);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(viewfetchingIniate());
    dispatch(fetchingIniate());
  }, [dispatch]);


  useEffect(() => {

    if (viewData?.length && quesId) {
      let list=[]
      const result = viewData?.find((e) => e.id === quesId);
      const { selectedQues } = result;
      
      for (let i = 0; i < selectedQues.length; i++) {
        for (let key in data2) {
          if (data2[key].id === selectedQues[i]) {
            list.push(data2[key]);
          }
         
          
        }
        
      }
      setselectedQue(list)
      
    } 
    
  }, [viewData, quesId]);


  const viewHandle = (id) => {
    setQuesId(id);
    setModalShow2(true);
  };
  const popUpclick = () => {
    dispatch(deleteview(id));
    setModalShow(false);
    // dispatch(viewfetchingIniate());
  };
  const deleteHandle = (id) => {
    setId(id);
    setModalShow(true);
  };
  function MyVerticallyCenteredModal2(props) {
   
    return (
      
      <Modal id='modal' {...props} size="lg">
        <Modal.Header closeButton>Summary</Modal.Header>
        <Table striped bordered>
          <thead id='header1'>
            <tr>
              <th>No.</th>
              <th>Question</th>
              <th>Type</th>
              <th>Weightage</th>
            </tr>
          </thead>
          <tbody>
            {selectedQue.length > 0 ? (
              selectedQue.map((data, key) => {
                return (
                  <tr key={key}>
                    <td>{key+1}</td>
                    <td>{data.question}</td>
                    <td>{data.type}</td>
                    <td>{data.weightage}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td>1</td>
                <td>Sam</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            )}
          </tbody>
        </Table>
      </Modal>
    );
  }
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal {...props} size="lg">
        <Modal.Header 
        onHide={() => setModalShow(false)}
        closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Do You Want to Delete ?
          </Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button variant="danger" onClick={popUpclick}>
            Delete
          </Button>
          <Button variant="success" onClick={()=>setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div class="wrapper">
      <Container id='container3'>
        <MyVerticallyCenteredModal
          show={modalShow}
          backdrop={true}
        />
        {quesId && (
          <MyVerticallyCenteredModal2
            show={modalShow2}
            onHide={() => setModalShow2(false)}
            backdrop={true}
          />
        )}

        {
          viewData.length || loading1?
              loading1? <div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100wh",height:"30vh"}}><Loader/></div>:
              <Table striped id="table">
                <thead id="header">
                <tr>
                  <th>No.</th>
                  <th>Exam-Code</th>
                  <th>Exam-Duration</th>
                  <th>Exam-Date</th>
                  <th>View Details</th>
                  <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {viewData?.map((data, key) => {
                  return (
                      <tr>
                        <td>{key + 1}.</td>
                        <td>{data.uniqueCode}</td>
                        <td>{data.time}</td>
                        <td>{`${data.day} / ${data.month} / ${data.year}`}</td>
                        <td>
                          <button>
                            <RemoveRedEye
                                id="redeye"
                                onClick={() => viewHandle(data.id)}
                            />
                          </button>
                        </td>
                        <td>
                          <button onClick={() => deleteHandle(data.id)}>
                            <DeleteOutline id="deleteicon" />
                          </button>
                        </td>
                      </tr>
                  );
                })}
                </tbody>
              </Table>
              :
              <Table striped id="table">
                <thead id="header">
                <tr>
                  <th>No.</th>
                  <th>Exam-Code</th>
                  <th>Exam-Duration</th>
                  <th>Exam-Date</th>
                  <th>View Details</th>
                  <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                 <td colSpan="6">No Data Found</td>
                </tr>
                </tbody>
              </Table>
        }
      </Container>
    </div>
  );
}

export default ViewExam;
