import { useContext, useRef, useState } from "react";
import classes from './LoginPage.module.css';
import { Link } from "react-router-dom";
import AuthContext from "../Store/AuthContext";

const LoginPage = () => {

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();

    const [haveAccount, setHaveAccount] = useState (true);

    const authCtx = useContext(AuthContext);

    const switchAuthModeHandler = () => {
        setHaveAccount((prevState) => !prevState)
    }

    let url;
        if(haveAccount){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB9oKh0vg7xF7p2cMslMybT_3tcOmg31bA'
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB9oKh0vg7xF7p2cMslMybT_3tcOmg31bA'
        }

    const submitHandler = (event) => {
        event.preventDefault();

        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

       if(!haveAccount) {
        if(passwordInputRef.current.value !== confirmPasswordInputRef.current.value) {
            return alert('Password and Confirm password are not matched');
        }
       }

       fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: enteredEmail,
                password: enteredPassword,
                returnSecureToken: true,
            }),

            headers: {
                'Content-Type' : 'application/json'
            },
        })
        
        .then((response) => {
            if(response.ok) {
                return response.json();
            } else {
                return response.json().then((data) => {
                    let errorMessage = "Authentication Failed";

                    throw new Error (errorMessage);
                });
            }
        }) 
        .then((data) => {
            authCtx.login(data.idToken);
            console.log(data.idToken);
            console.log("User has successfully signed up")
        })
        .catch((err) => {
            alert(err.message);
        })
    }  

    return(
       
        <div className={classes.auth}>
    <h1>{haveAccount ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
            <label htmlFor="email">Email -</label>
            <input 
            id="email" 
            type="email" 
            placeholder="Email"
           ref={emailInputRef}
            />
        </div>

        <div className={classes.control}>
            <label htmlFor="password">Password -</label>
            <input 
            id="password" 
            type="password" 
            placeholder="Enter Password"
            ref={passwordInputRef}
            />
    {!haveAccount && (
        <div className={classes.control}>
        <label htmlFor="confirm-password">Confirm Password -</label>
        <input
        id="confirm-password" 
        type="password" 
        placeholder="Confirm Password"
        ref={confirmPasswordInputRef}
        />
         {/* {errorMessage && <p className={classes.error}>{errorMessage}</p>} */}
         </div>
    )}
            
        </div>

        <div className={classes.action}>
       <button>{haveAccount ? 'Login' : 'Create Account'}</button>
         {/* {isLoading && <p>Loading....</p>}  */}
          {/* {errorMessage === "Please fill in all the required fields." && (
          <p className={classes.error}>{errorMessage}</p>
        )} */}
        </div>
        
        {haveAccount && (
            <div >
                <Link to="/forget-password">
                Forget password
                </Link>
            </div>
        )}

<div className={classes.action}>
        <button
        type="button"
        className={classes.toggle}
        onClick={switchAuthModeHandler}
        >
          {haveAccount ? 'Create new account' : 'Login with existing account'}
        </button>
        </div>
      </form>
    </div>

    )
};

export default LoginPage;