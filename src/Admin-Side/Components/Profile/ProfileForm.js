import classes from './ProfileForm.module.css';
import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import {useDispatch, useSelector} from "react-redux";
import {Reset_Error, Reset_Password_Initialize} from "../../../Redux/Admin-Side/Action/actions";
import Loader from "../../../Common-Component/Loader/Loader";

const ProfileForm = () => {

    const [details, setDetails] = useState({
        email:Cookies.get("setemail"),
        password:"",
        confirmPassword:""
    });
    const [errorMsg, setErrorMsg] = useState("");
    const authID = Cookies.get("settoken");
    const dispach = useDispatch();
    const {error} = useSelector((State=>State.user));
    const {loading} = useSelector((State=>State.user));

    useEffect(() => {
        dispach(Reset_Error());
    }, []);

    useEffect(()=>{
        setErrorMsg(error);
    },[error,loading]);

    const changeHandler = (e) => {
        const {name,value} = e.target;
        setDetails({...details,[name]:value});
        setErrorMsg("");
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        if(details.password === details.confirmPassword){
            dispach(Reset_Password_Initialize(authID,details.password));
        }
        else {
            setErrorMsg("Passwords Doesn't Match");
        }
        setDetails({
            email:Cookies.get("setemail"),
            password:"",
            confirmPassword:""
        })
  }

  return (
      <>
          {
              loading?<div style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100wh",height:"20vh"}}><Loader/></div>:
                  <form className={classes.form} onSubmit={submitHandler}>
                      <div className={classes.control}>
                          <input type='text' readOnly placeholder='New Password' value={details.email}/>
                      </div>
                      <div className={classes.control}>
                          <input type='password' id='new-password' name="password" placeholder='New Password' value={details.password} onChange={changeHandler}/>
                      </div>
                      <div className={classes.control}>
                          <input type='password' name="confirmPassword" placeholder='Confirm New Password' value={details.confirmPassword} onChange={changeHandler}/>
                      </div>
                      <div>
                          <p style={{color:"red"}}>{errorMsg}</p>
                      </div>
                      <div className={classes.action}>
                          <button>Change Password</button>
                      </div>
                  </form>
          }
      </>

  );
}

export default ProfileForm;
