import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Layout from "./Common-Component/Layout/Layout";
import UserProfile from "./Admin-Side/Components/Profile/UserProfile";
import AuthPage from "./Admin-Side/pages/AuthPage";
import HomePage from "./Admin-Side/pages/HomePage";
import Login from "./Admin-Side/Components/Auth/login";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorPage from "./ErrorPage";
import {useSelector} from "react-redux";
import Addquestion from "./Admin-Side/Components/Addquestion/Addquestion";
import CreateExam from "./Admin-Side/Components/create-exam/create-exam";
import ViewExam from "./Admin-Side/Components/view-Exam/view-exam";
import Results from "./Admin-Side/Components/results/results";
import {useEffect, useState} from "react";
import userDashboard from "./User-Side/Component/Exam-Page/Dashboard"
import userLogin from "./User-Side/Component/UserLogin/Userlogin"
import ResultPage from "./User-Side/Component/Result-Page/ResultPage";


function App() {
    const [studentLogin, setStudentLogin] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const [viewResult, setViewResult] = useState(false);

    const user = useSelector(state => state.user);
    const student = useSelector((state => state.student));
    const studentResult = useSelector((state) => state.studentResult);

    useEffect(() => {
        if (Cookies.get('isAdmin') === "true") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [user])

    useEffect(() => {
        if (Cookies.get("setUnicode")) {
            setStudentLogin(true);
        } else {
            setStudentLogin(false);
        }
    }, [student])

    useEffect(() => {
        if (localStorage.getItem("Result")) {
            setViewResult(true);
        } else {
            setViewResult(false);
        }
    }, [studentResult])

    return (
        <div className="App">
            <Layout>
                {
                    (isAdmin === null || studentLogin === null) ? "" :
                        isAdmin ?
                            <Switch>
                                <Route path="/dashboard" exact component={HomePage}/>
                                <Route path="/profile" exact component={UserProfile}/>
                                <Route path={"/dashboard/home"} component={Addquestion} exact/>
                                <Route path={`/dashboard/create-exam`} component={CreateExam} exact/>
                                <Route path={`/dashboard/view-exam`} component={ViewExam} exact/>
                                <Route path={`/dashboard/results`} component={Results} exact/>
                                <Redirect from="*" to="/dashboard"/>
                            </Switch>
                            :
                            studentLogin ?
                                !viewResult ?
                                    <Switch>
                                        <Route path="/exam/:id" exact component={userDashboard}/>
                                        <Redirect from="*" to="/exam/1"/>
                                    </Switch>
                                    :
                                    <Switch>
                                        <Route path="/studentresult" exact component={ResultPage}/>
                                        <Redirect from="*" to="/studentresult"/>
                                    </Switch>
                                :
                                <Switch>
                                    <Route path="/" exact component={HomePage}/>
                                    <Route path="/auth" exact component={AuthPage}/>
                                    <Route path="/login" exact component={Login}/>
                                    <Route path="/student-login" exact component={userLogin}/>
                                    <Route path="/invalideurl" exact component={ErrorPage}/>
                                    <Redirect from="*" to="/invalideurl"/>
                                </Switch>
                }
            </Layout>
        </div>
    );

}

export default App;
