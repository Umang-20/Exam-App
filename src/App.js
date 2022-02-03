import {
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Layout from "./Admin-Side/components/Layout/Layout";
import UserProfile from "./Admin-Side/components/Profile/UserProfile";
import Sidebar from "./Admin-Side/components/Dashboard/Sidebar/Sidebar";
import AuthPage from "./Admin-Side/pages/AuthPage";
import HomePage from "./Admin-Side/pages/HomePage";
import Login from "./Admin-Side/components/Auth/login";
import Cookies from "js-cookie";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebarprops from "./Sidebarprops";
import {useSelector} from "react-redux";
import Spinner from "./Admin-Side/components/Spinner/Spinner";
import Addquestion from "./Admin-Side/components/Addquestion/Addquestion";
import CreateExam from "./Admin-Side/components/create-exam/create-exam";
import ViewExam from "./Admin-Side/components/view-Exam/view-exam";
import Results from "./Admin-Side/components/results/results";
import {useEffect, useState} from "react";
import userDashboard from "./User-Side/Dashboard"
import userLogin from "./User-Side/Component/UserLogin/Userlogin"


function App() {
    const [isLogin, setIsLogin] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);

    const user = useSelector(state => state.user)

    useEffect(() => {
        if (Cookies.get("settoken")) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
        }
        if (Cookies.get('isAdmin') === "true") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, [user])
    // console.log('isAdmin', isAdmin);
    // console.log('login', isLogin);

    const {loading} = useSelector(state => state.user)
    // if (loading) {
    //     return <Spinner/>
    // } else {
    //
    // }
    return (
        <div className="App">
            <Layout>
            {
                isLogin === null ? "" :
                    isLogin ?
                        isAdmin ?
                            // <Sidebar>
                                <Switch>
                                    <Route path="/dashboard" exact component={HomePage}/>
                                    <Route path="/profile" exact component={UserProfile}/>
                                    <Route path={"/dashboard/home"} component={Addquestion} exact/>
                                    <Route path={`/dashboard/create-exam`} component={CreateExam} exact/>
                                    <Route path={`/dashboard/view-exam`} component={ViewExam} exact/>
                                    <Route path={`/dashboard/results`} component={Results} exact/>
                                    <Redirect from="*" to="/dashboard"/>
                                </Switch>
                            // </Sidebar>
                            :
                            <Switch>
                                {/*<Route path="/" exact component={Userlogin} />*/}
                                <Route path={'/user-login'} component={userLogin} exact/>
                                <Route path="/exam" exact component={userDashboard} />
                                <Redirect from="*" to="/user-login"/>
                            </Switch>
                        :
                        <Switch>
                            <Route path="/" exact component={HomePage}/>
                            <Route path="/auth" exact component={AuthPage}/>
                            <Route path="/login" exact component={Login}/>
                            <Route path="/invalideurl" exact component={Sidebarprops}/>
                            <Redirect from="*" to="/invalideurl"/>
                        </Switch>
            }
            </Layout>
        </div>
    );

}

export default App;
