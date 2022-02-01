import React, {useState, useEffect} from "react";
import classes from "./AuthForm.module.css";
import {useHistory} from "react-router";
import {loginInitiate, Reset_Error} from "../../redux/actions";
import {useSelector, useDispatch} from "react-redux";

function Login() {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    const {isloggedin} = useSelector((state) => state.user);
    const {error} = useSelector((state) => state.user);
    const [errorMsg, setErrorMsg] = useState('')
    const dispatch = useDispatch();
    const {email, password} = userData;
    const history = useHistory();

    // useEffect(() => {
    //     dispatch(Reset_Error());
    // }, []);

    const switchAuthModeHandler = () => {
        setErrorMsg('')
        history.push("/auth");
    };

    const {isredirect} = useSelector((state) => state.user);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(loginInitiate(email, password));
    };

    useEffect(() => {
        if (isredirect) {
            history.push(isredirect);
            console.log('isredirect', isredirect);
        }
    }, [isredirect, history]);

    return (
        <section className={classes.auth}>
            <h1>Login</h1>

            <form onSubmit={submitHandler}>
                <div className={classes.control}>
                    <input
                        type="email"
                        id="email"
                        value={userData.email}
                        placeholder="Email"
                        onChange={(e) =>
                            setUserData({...userData, email: e.target.value})
                        }
                    />
                </div>
                <div className={classes.control}>
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        onChange={(e) =>
                            setUserData({...userData, password: e.target.value})
                        }
                    />
                </div>
                <div className={classes.control}>
                    {/*<p style={{color: "red"}}>{error}</p>*/}
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
    );
}

export default Login;
