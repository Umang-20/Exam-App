import {Link, useLocation} from "react-router-dom";
import classes from "./MainNavigation.module.css";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router";
import {logoutInitiate} from "../../../Store/Admin-Side/Action/AdminLoginAction";
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import MenuIcon from "@material-ui/icons/Menu";
import {Clear} from "@material-ui/icons";
import UseWindowSize from "./UseWindowSize";
import Student_LogOut_Initialize from "../../../Store/User-Side/Action/StudentLogOutActions";
import Result_Submission_Initialization from "../../../Store/User-Side/Action/SubmitResultAction";


const MainNavigation = ({isMenuOpen, toggleMenu}) => {
    const [isLogin, setIsLogin] = useState(null);
    const [studentLogin, setStudentLogin] = useState(null);
    const [viewResult, setViewResult] = useState(false);
    const dispatch = useDispatch();
    const history = useHistory();
    const path = useLocation().pathname;
    const [showMenu, setShowMenu] = useState(false);
    const size = UseWindowSize();

    useEffect(() => {
        if (size > 1200) {
            setShowMenu(false);
        } else {
            setShowMenu(true);
        }
    }, [size])

    const user = useSelector(state => state.user)
    const {isredirect} = useSelector(state => state.user)
    const studentAnswer = useSelector(state => state.studentAnswer)
    const student = useSelector((state => state.student));
    const studentResult = useSelector((state) => state.studentResult);

    const logoutHandler = () => {
        dispatch(logoutInitiate());
        history.push("/login");
    };

    const studentLogout = () => {
        dispatch(Student_LogOut_Initialize());
        history.push("/student-login");
    }

    const studentSubmit = () => {
        dispatch(Result_Submission_Initialization(1));
        history.push("/studentresult");
    }

    useEffect(() => {
        if (Cookies.get("settoken")) {
            setIsLogin(true);
        } else {
            setIsLogin(false);
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

//Admin Redirect
    useEffect(() => {
        if ((isredirect && isLogin) || (isredirect && path === "/auth")) {
            history.push(isredirect)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLogin, isredirect, history]);

    //Student Redirect
    useEffect(() => {
        if (student.studentRedirect && studentLogin) {
            history.push(student.studentRedirect);
        }
    }, [student.studentRedirect, studentLogin, history])

    // ExamPage Redirect
    useEffect(() => {
        if (studentAnswer.isredirect) {
            history.push(studentAnswer.isredirect);
        }
    }, [studentAnswer.isredirect, history])

    return (
        <>
            <div style={{display: "flex", alignItems: "center", marginLeft: "15px"}}>
                {
                    showMenu && isLogin ?
                        isMenuOpen ? <MenuIcon onClick={toggleMenu}/> : <Clear onClick={toggleMenu}/> : ""
                }
                <header className={classes.header}>

                    <Link to="/">
                        <img
                            alt="Logo"
                            src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAyNS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgdmlld0JveD0iMCAwIDI1MDAgNDQ0LjA4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNTAwIDQ0NC4wODsiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPHN0eWxlIHR5cGU9InRleHQvY3NzIj4NCgkuc3Qwe2ZpbGw6dXJsKCNTVkdJRF8xXyk7fQ0KCS5zdDF7ZmlsbDojMTMzMDRDO30NCgkuc3Qye2ZpbGw6dXJsKCNTVkdJRF8yXyk7fQ0KCS5zdDN7ZmlsbDp1cmwoI1NWR0lEXzNfKTt9DQoJLnN0NHtmaWxsOnVybCgjU1ZHSURfNF8pO30NCgkuc3Q1e2ZpbGw6dXJsKCNTVkdJRF81Xyk7fQ0KCS5zdDZ7ZmlsbDp1cmwoI1NWR0lEXzZfKTt9DQoJLnN0N3tmaWxsOnVybCgjU1ZHSURfN18pO30NCgkuc3Q4e2ZpbGw6dXJsKCNTVkdJRF84Xyk7fQ0KCS5zdDl7ZmlsbDp1cmwoI1NWR0lEXzlfKTt9DQoJLnN0MTB7ZmlsbDp1cmwoI1NWR0lEXzEwXyk7fQ0KCS5zdDExe2ZpbGw6dXJsKCNTVkdJRF8xMV8pO30NCgkuc3QxMntmaWxsOnVybCgjU1ZHSURfMTJfKTt9DQo8L3N0eWxlPg0KPGcgaWQ9IkxheWVyXzEiPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KCTxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfMV8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMzg5LjI2IiB5MT0iLTY0LjE2NTUiIHgyPSIzODYuNTI5OCIgeTI9IjQwMi43MTI0Ij4NCgkJPHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6IzAwRUFFRiIvPg0KCQk8c3RvcCAgb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojMUI3NUJDIi8+DQoJPC9saW5lYXJHcmFkaWVudD4NCgk8cmVjdCB4PSIzNTIuMzEiIHk9IjExMy43OCIgY2xhc3M9InN0MCIgd2lkdGg9IjcwLjM5IiBoZWlnaHQ9IjI0Mi43NiIvPg0KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik03NDUuNjIsMjM1LjE2YzAsNzYuMjYtNTIuNzksMTI0Ljk5LTEyMC45MywxMjQuOTljLTMwLjIzLDAtNTUuMDUtOS40OC03My4xLTI5LjMzdjExMy4yNkg0ODEuMnYtMzMwLjNoNjcuMjMNCgkJdjI3Ljk4YzE3LjYtMjEuMjEsNDMuNzctMzEuNTksNzYuMjYtMzEuNTlDNjkyLjgzLDExMC4xNyw3NDUuNjIsMTU4LjksNzQ1LjYyLDIzNS4xNnogTTY3NC4zMywyMzUuMTYNCgkJYzAtNDEuOTYtMjYuNjItNjcuMjMtNjEuODItNjcuMjNjLTM1LjE5LDAtNjEuODIsMjUuMjctNjEuODIsNjcuMjNjMCw0MS45NiwyNi42Miw2Ny4yMyw2MS44Miw2Ny4yMw0KCQlDNjQ3LjcxLDMwMi4zOSw2NzQuMzMsMjc3LjEyLDY3NC4zMywyMzUuMTZ6Ii8+DQoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTEwMzMuNzgsMjE3LjU2djEzOC45OGgtNzAuMzlWMjI4LjM5YzAtMzkuMjYtMTguMDUtNTcuMzEtNDkuMTgtNTcuMzFjLTMzLjg0LDAtNTguMjEsMjAuNzYtNTguMjEsNjUuNDMNCgkJdjEyMC4wM2gtNzAuMzlWMjEuNzNIODU2djExNy4zMmMxOC45NS0xOC45NSw0Ni4wMi0yOC44OCw3Ny4xNi0yOC44OEM5OTAuNDcsMTEwLjE3LDEwMzMuNzgsMTQzLjU2LDEwMzMuNzgsMjE3LjU2eiIvPg0KCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0xMzI5LjYyLDI1NS4wMWgtMTgzLjY1YzYuNzcsMzAuMjMsMzIuNDksNDguNzMsNjkuNDksNDguNzNjMjUuNzIsMCw0NC4yMi03LjY3LDYwLjkyLTIzLjQ2bDM3LjQ1LDQwLjYxDQoJCWMtMjIuNTYsMjUuNzItNTYuNCwzOS4yNi0xMDAuMTcsMzkuMjZjLTgzLjkzLDAtMTM4LjUzLTUyLjgtMTM4LjUzLTEyNC45OWMwLTcyLjY1LDU1LjUtMTI0Ljk5LDEyOS41LTEyNC45OQ0KCQljNzEuMjksMCwxMjYuMzQsNDcuODMsMTI2LjM0LDEyNS44OUMxMzMwLjk3LDI0MS40OCwxMzMwLjA3LDI0OS4xNSwxMzI5LjYyLDI1NS4wMXogTTExNDUuMDcsMjEzLjk1aDExOS41OA0KCQljLTQuOTYtMzAuNjgtMjcuOTgtNTAuNTQtNTkuNTYtNTAuNTRDMTE3My4wNCwxNjMuNDEsMTE1MC4wMywxODIuODIsMTE0NS4wNywyMTMuOTV6Ii8+DQoJPHBhdGggY2xhc3M9InN0MSIgZD0iTTE1MjQuMDgsMTEwLjE3djY0Ljk4Yy01Ljg3LTAuNDUtMTAuMzgtMC45LTE1Ljc5LTAuOWMtMzguODEsMC02NC41MywyMS4yMS02NC41Myw2Ny42OHYxMTQuNjFoLTcwLjM5VjExMy43OA0KCQloNjcuMjN2MzIuMDRDMTQ1Ny43NSwxMjIuMzUsMTQ4Ni42MywxMTAuMTcsMTUyNC4wOCwxMTAuMTd6Ii8+DQoJPGc+DQoJCTxwYXRoIGNsYXNzPSJzdDEiIGQ9Ik0yMTkuNDUsMjgzLjU0Yy0xNC44Nyw4LjkyLTMyLjI3LDE0LjA1LTUwLjg2LDE0LjA1Yy0xOC41OCwwLTM1Ljk5LTUuMTMtNTAuODYtMTQuMDUNCgkJCWMtMTMuOTgtOC4zOS0yNS43Mi0yMC4xMy0zNC4wOC0zNC4xMWMtOC45Mi0xNC44Ny0xNC4wNS0zMi4yNS0xNC4wNS01MC44M3M1LjEzLTM1Ljk5LDE0LjA1LTUwLjg2DQoJCQljOC4zOS0xMy45OCwyMC4xMy0yNS43MiwzNC4xMS0zNC4wOGMxNC44Ny04LjkyLDMyLjI1LTE0LjA1LDUwLjgzLTE0LjA1YzE4LjU4LDAsMzUuOTYsNS4xMyw1MC44MywxNC4wNQ0KCQkJYzEzLjk4LDguMzYsMjUuNzIsMjAuMSwzNC4xMSwzNC4wOGw1MC4xMS01MC4xMWMtOS42OS0xMi45Mi0yMS4xNi0yNC40Mi0zNC4xMS0zNC4wOGMtMjguMTUtMjEuMDktNjMuMS0zMy41OC0xMDAuOTQtMzMuNTgNCgkJCVM5NS44MSw0Mi40Nyw2Ny42Niw2My41NmMtMTIuOTQsOS42Ny0yNC40MiwyMS4xNi0zNC4xMSwzNC4wOEMxMi40OSwxMjUuNzksMCwxNjAuNzQsMCwxOTguNjFzMTIuNDksNzIuODEsMzMuNTUsMTAwLjk0DQoJCQljOS42OSwxMi45NCwyMS4xNiwyNC40MiwzNC4xMSwzNC4wOGMyOC4xNSwyMS4wOSw2My4xLDMzLjU3LDEwMC45NCwzMy41N3M3Mi43OS0xMi40OSwxMDAuOTQtMzMuNTcNCgkJCWMxMi45NC05LjY3LDI0LjQyLTIxLjE0LDM0LjExLTM0LjA4bC01MC4xMS01MC4xMUMyNDUuMTcsMjYzLjQyLDIzMy40MywyNzUuMTYsMjE5LjQ1LDI4My41NHoiLz4NCgk8L2c+DQoJPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF8yXyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIzODguMTE0NyIgeTE9Ii02NC4xNzIyIiB4Mj0iMzg1LjM4NDQiIHkyPSI0MDIuNzA1NyI+DQoJCTxzdG9wICBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMEVBRUYiLz4NCgkJPHN0b3AgIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6IzFCNzVCQyIvPg0KCTwvbGluZWFyR3JhZGllbnQ+DQoJPHBhdGggY2xhc3M9InN0MiIgZD0iTTQxNS4yOSwxMS41MWMtMTUuMzUtMTUuMzUtNDAuMjMtMTUuMzQtNTUuNTcsMC4wMXYwYy0xNS4zMywxNS4zNC0xNS4zMyw0MC4yMSwwLjAxLDU1LjU1DQoJCWMxNS4zNCwxNS4zNCw0MC4yLDE1LjM0LDU1LjU1LDAuMDFDNDMwLjYzLDUxLjczLDQzMC42MywyNi44NSw0MTUuMjksMTEuNTFMNDE1LjI5LDExLjUxeiIvPg0KCTxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfM18iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMTY5My42NjQ4IiB5MT0iLTU2LjUzNzQiIHgyPSIxNjkwLjkzNDQiIHkyPSI0MTAuMzQwNSI+DQoJCTxzdG9wICBvZmZzZXQ9IjAiIHN0eWxlPSJzdG9wLWNvbG9yOiMwMEVBRUYiLz4NCgkJPHN0b3AgIG9mZnNldD0iMSIgc3R5bGU9InN0b3AtY29sb3I6IzFCNzVCQyIvPg0KCTwvbGluZWFyR3JhZGllbnQ+DQoJPHBhdGggY2xhc3M9InN0MyIgZD0iTTE3MDMuNjcsMTE3LjM5Yy00MS4wNiwwLTczLjA4LDE2LjY5LTkwLjI0LDQ1LjU4di00My43OGgtMzAuNjd2MjM3LjM1aDMyLjAzVjIzMg0KCQljMC01NC4xNCwzMi4wNS04NS43NCw4My4wMy04NS43NGM0NS4xMywwLDcxLjMsMjUuNzIsNzEuMyw3NS44MXYxMzQuNDdoMzIuMDNWMjE4LjkxDQoJCUMxODAxLjE0LDE1MC43OSwxNzYxLjQzLDExNy4zOSwxNzAzLjY3LDExNy4zOXoiLz4NCgk8bGluZWFyR3JhZGllbnQgaWQ9IlNWR0lEXzRfIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjE5NTkuODg4NyIgeTE9Ii01NC45ODA1IiB4Mj0iMTk1Ny4xNTg0IiB5Mj0iNDExLjg5NzMiPg0KCQk8c3RvcCAgb2Zmc2V0PSIwIiBzdHlsZT0ic3RvcC1jb2xvcjojMDBFQUVGIi8+DQoJCTxzdG9wICBvZmZzZXQ9IjEiIHN0eWxlPSJzdG9wLWNvbG9yOiMxQjc1QkMiLz4NCgk8L2xpbmVhckdyYWRpZW50Pg0KCTxwYXRoIGNsYXNzPSJzdDQiIGQ9Ik0yMDM0LjIxLDI0My43M2MwLDU0LjE0LTMxLjEzLDg2LjE5LTgwLjc2LDg2LjE5Yy00NS4xMywwLTcxLjMtMjUuNzItNzEuMy03Ni4yNlYxMTkuMTloLTMyLjA1djEzNy42Mw0KCQljMCw2OC4xNSwzOS43MywxMDEuOTgsMTAwLjE3LDEwMS45OGMzNy45LDAsNjguNi0xNi42OSw4NS4yOS00NS41OHY0My4zM2gzMC43VjExOS4xOWgtMzIuMDVWMjQzLjczeiIvPg0KCTxsaW5lYXJHcmFkaWVudCBpZD0iU1ZHSURfNV8iIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iMjQwNS43Njk1IiB5MT0iLTUyLjM3MyIgeDI9IjI0MDMuMDM5MyIgeTI9IjQxNC41MDQ4Ij4NCgkJPHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6IzAwRUFFRiIvPg0KCQk8c3RvcCAgb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojMUI3NUJDIi8+DQoJPC9saW5lYXJHcmFkaWVudD4NCgk8cG9seWdvbiBjbGFzcz0ic3Q1IiBwb2ludHM9IjIzNDcuOTQsMzI5LjkyIDI0OTcuMywxNDAuNCAyNDk3LjMsMTE5LjE5IDIzMDkuNTgsMTE5LjE5IDIzMDkuNTgsMTQ2LjI2IDI0NTYuMjQsMTQ2LjI2IA0KCQkyMzA2Ljg4LDMzNS4zMyAyMzA2Ljg4LDM1Ni41NCAyNTAwLDM1Ni41NCAyNTAwLDMyOS45MiAJIi8+DQoJPGxpbmVhckdyYWRpZW50IGlkPSJTVkdJRF82XyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIyMTg4LjkyNjgiIHkxPSItNTMuNjQxMSIgeDI9IjIxODYuMTk2NSIgeTI9IjQxMy4yMzY3Ij4NCgkJPHN0b3AgIG9mZnNldD0iMCIgc3R5bGU9InN0b3AtY29sb3I6IzAwRUFFRiIvPg0KCQk8c3RvcCAgb2Zmc2V0PSIxIiBzdHlsZT0ic3RvcC1jb2xvcjojMUI3NUJDIi8+DQoJPC9saW5lYXJHcmFkaWVudD4NCgk8cG9seWdvbiBjbGFzcz0ic3Q2IiBwb2ludHM9IjIxODguOTUsNjcuMyAyMTU2LjkzLDY3LjMgMjE1Ni45MywxMTkuMTkgMjExNC41MiwxMTkuMTkgMjExNC41MiwxNDYuMjYgMjE1Ni45MywxNDYuMjYgDQoJCTIxNTYuOTMsMjg5Ljc2IDIxNTYuOTMsMzU2LjU0IDIxODguOTUsMzU2LjU0IDIxODguOTUsMzUwLjgxIDIxODguOTUsMTQ2LjI2IDIyNjEuMTYsMTQ2LjI2IDIyNjEuMTYsMTE5LjE5IDIxODguOTUsMTE5LjE5IAkiLz4NCjwvZz4NCjwvc3ZnPg0K"
                            // onClick={() => {
                            //     dispatch(Redirect("/"));
                            // }}
                        ></img>
                    </Link>
                    <>
                        <ul>
                            {
                                (isLogin === null || studentLogin === null) ? "" :
                                    isLogin ?
                                        <>
                                            <li>
                                                <Link to="/profile"
                                                    //       onClick={()=>{
                                                    //     dispatch(Redirect("/profile"))}
                                                    // }
                                                >Profile</Link>
                                            </li>
                                            <li>
                                                <button onClick={logoutHandler}>Logout</button>
                                            </li>
                                        </> :
                                        studentLogin ?
                                            !viewResult ?
                                                <>
                                                    <li>
                                                        <button onClick={studentSubmit}>Submit</button>
                                                    </li>
                                                </>
                                                :
                                                <>
                                                    <li>
                                                        <button onClick={studentLogout}>Logout</button>
                                                    </li>
                                                </>
                                            :
                                            <>
                                                <li>
                                                    <Link to="/student-login"
                                                        //       onClick={()=>{
                                                        // dispatch(Redirect("/student-login"))}
                                                        // }
                                                    >Student Portal</Link>
                                                </li>
                                                <li>
                                                    <Link to="/login"
                                                        //       onClick={()=>{
                                                        //     dispatch(Redirect("/login"))}
                                                        // }
                                                    >Admin Portal</Link>
                                                </li>
                                            </>
                            }
                        </ul>
                    </>
                </header>
            </div>
        </>
    );
};

export default MainNavigation;
