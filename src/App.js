import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Layout from "./Components/Common-Component/Layout/Layout";
import UserProfile from "./Components/Admin-Side/Profile/UserProfile";
import AuthPage from "./Pages/Admin-Side/AuthPage";
import HomePage from "./Pages/Admin-Side/HomePage";
import Login from "./Components/Admin-Side/Auth/login";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import ErrorPage from "./ErrorPage";
import {useSelector} from "react-redux";
import Addquestion from "./Components/Admin-Side/Addquestion/Addquestion";
import CreateExam from "./Components/Admin-Side/create-exam/create-exam";
import ViewExam from "./Components/Admin-Side/view-Exam/view-exam";
import Results from "./Components/Admin-Side/results/results";
import {useEffect, useState} from "react";
import userDashboard from "./Pages/User-Side/Dashboard"
import userLogin from "./Components/User-Side/UserLogin/Userlogin"
import ResultPage from "./Components/User-Side/Result-Page/ResultPage";


function App() {
    const [studentLogin, setStudentLogin] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);
    const [viewResult, setViewResult] = useState(null);

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
        if (Cookies.get("Result") === "yes") {
            setViewResult(true);
        } else {
            setViewResult(false);
        }
    }, [studentResult])


    return (
        <div className="App">
            <Layout>
                {
                    isAdmin && isAdmin ?
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
                        studentLogin && studentLogin ?
                            viewResult ?
                                <Switch>
                                    <Route path="/studentresult" exact component={ResultPage}/>
                                    <Redirect from="*" to="/studentresult"/>
                                </Switch>
                                :
                                <Switch>
                                    <Route path="/exam/:id" exact component={userDashboard}/>
                                    <Redirect from="*" to="/exam/1"/>
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
