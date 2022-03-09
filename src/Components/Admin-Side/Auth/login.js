import React, {useState, useEffect} from "react";
import classes from "./AuthForm.module.css";
import {useHistory} from "react-router";
import {loginInitiate, Reset_Error} from "../../../Store/Admin-Side/Action/AdminLoginAction";
import {useSelector, useDispatch} from "react-redux";
import Spinner from "../../Common-Component/Spinner/Spinner";

function Login() {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    const {error} = useSelector((state) => state.user);
    const [errorMsg, setErrorMsg] = useState('')
    const dispatch = useDispatch();
    const {email, password} = userData;
    const {loading} = useSelector(state => state.user)
    const history = useHistory();

    useEffect(() => {
        dispatch(Reset_Error());
    }, [dispatch]);

    useEffect(() => {
        setErrorMsg(error);
    }, [error, loading]);

    const switchAuthModeHandler = () => {
        setErrorMsg('')
        history.push("/auth")
    };

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(loginInitiate(email, password));
    };

    return (
        <>
            {
                loading ? <Spinner/> : <section className={classes.auth}>
                    <h1>Login</h1>

                    <form onSubmit={submitHandler}>
                        <div className={classes.control}>
                            <input
                                type="email"
                                id="email"
                                value={userData.email}
                                placeholder="Email"
                                onChange={(e) => {
                                    setUserData({...userData, email: e.target.value})
                                    setErrorMsg("");
                                }
                                }
                            />
                        </div>
                        <div className={classes.control}>
                            <input
                                type="password"
                                id="password"
                                placeholder="Password"
                                onChange={(e) => {
                                    setUserData({...userData, password: e.target.value})
                                    setErrorMsg("");
                                }
                                }
                            />
                        </div>
                        <div className={classes.control}>
                            <p style={{color: "red"}}>{errorMsg}</p>
                        </div>
                        <div className={classes.actions}>
                            {/*{errorMsg}*/}
                            <button>Login</button>
                            <button
                                type="button"
                                className={classes.toggle}
                                onClick={switchAuthModeHandler}
                            >
                                Create new account
                            </button>
                        </div>
                    </form>
                </section>
            }

        </>
    );
}

export default Login;
