import {useState, useEffect} from "react";
import classes from "./AuthForm.module.css";
import {useSelector, useDispatch} from "react-redux";
import {registerInitiate, Reset_Error} from "../../../Store/Admin-Side/Action/AdminLoginAction";
import Spinner from "../../Common-Component/Spinner/Spinner";

const AuthForm = () => {
    const {error} = useSelector((state) => state.user);
    const {loading} = useSelector((state) => state.user);
    const [errorMsg, setErrorMsg] = useState('')
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        isAdmin: false
    });
    const {email, password, isAdmin} = userData;

    useEffect(() => {
        dispatch(Reset_Error());
    }, [dispatch]);

    useEffect(() => {
        setErrorMsg(error);
    }, [error, loading]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(registerInitiate(email, password, isAdmin));
    };

    return (
        loading ? <Spinner/> :
            <section className={classes.auth}>
                <h1>Sign Up</h1>

                <form onSubmit={submitHandler}>
                    <div className={classes.control}>
                        <input
                            type="text"
                            id="email"

                            value={userData.email}
                            placeholder="Email"
                            onChange={(e) => {
                                setUserData({...userData, email: e.target.value});
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
                                setUserData({...userData, password: e.target.value});
                                setErrorMsg("");
                            }
                            }
                        />
                    </div>
                    <div className={classes.control}>
                        <input
                            type="checkbox"
                            id="admin"
                            name="admin"
                            value={userData.isAdmin}
                            onChange={(e) => {
                                setUserData({...userData, isAdmin: e.target.checked});
                                setErrorMsg("");
                            }
                            }
                        />

                        <label htmlFor='admin'>Admin</label>
                        <p style={{color: "red"}}>{errorMsg}</p>
                    </div>
                    <div className={classes.actions}>
                        <button>Create Account</button>
                    </div>
                </form>
            </section>
    );
};

export default AuthForm;
