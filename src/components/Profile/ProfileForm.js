import classes from './ProfileForm.module.css';



const ProfileForm = () => {

  
  const submitHandler=()=>{
   
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        
        <input type='password' id='new-password' placeholder='New Password' />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
