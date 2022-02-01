import AuthContext from '../../store/auth-context';
import { useContext, useRef } from 'react';
import classes from './ProfileForm.module.css';
import { useHistory } from 'react-router-dom';

const ProfileForm = () => {

  const history = useHistory()

  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const newPasswordHandler = (event) => {
    event.preventDefault();

    const newPasswordInput = newPasswordInputRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC-5z6SeUBW2DtXNRKBoI8aXUtB9gpVYLc',
      {
        method : 'POST',
        body : JSON.stringify({
          idToken : authCtx.token,
          password : newPasswordInput,
          returnSecureToken : false
        }),
        headers : {
          'Content-Type' : 'application/json'
        }
      }
    ).then(res => {
      if(res.ok){
        return res.json();
      }else{
        return (res.json().then(data=> {
          let errorMessage = "Authentication Failed";
          if(data && data.error && data.error.message){
            errorMessage = data.error.message;
          }
          alert(errorMessage);
          throw new Error(errorMessage);
        }))
      }
    }).then((data) => {
      console.log(data);
      history.replace('/');
    }).catch(error=>{
      alert(error.message);
    })
  }
  
  return (
    <form onSubmit={newPasswordHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' minLength='7' id='new-password'  ref={newPasswordInputRef}  />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
