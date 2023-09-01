import { useRef, useState } from "react";
import classes from './LoginPage.module.css';

const LoginPage = () => {

    const emailInputRef = useRef();
    const passwordInputRef = useRef();
    const confirmPasswordInputRef = useRef();

    const [haveAccount, setHaveAccount] = useState (true);

    const switchAuthModeHandler = () => {
        setHaveAccount((prevState) => !prevState)
    }

    let url;
        if(haveAccount){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB9oKh0vg7xF7p2cMslMybT_3tcOmg31bA'
        } else {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB9oKh0vg7xF7p2cMslMybT_3tcOmg31bA'
        }

    const submitHandler = async (event) => {
        event.preventDefault();
       
       if(!haveAccount) {
        if(passwordInputRef.current.value !== confirmPasswordInputRef.current.value) {
            return alert('Password and Confirm password are not matched');
        }
       }

       try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                email: emailInputRef.current.value,
                password: passwordInputRef.current.value,
                returnSecureToken: true,
            }),

            headers: {
                'Content-Type' : 'application/json'
            }
        });
        
        if(response.ok) {
            const data = await response.json();
            localStorage.setItem('idToken', JSON.stringify(data));
            setHaveAccount(true);
            } else {
                const data = await response.json();
                throw data.error;
                }
            } catch(err) {
                alert(err.message);
            }
    };
        

    return(
        <section className={classes.auth}>
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
        </div>

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

        <div className={classes.action}>
       <button>{haveAccount ? 'Login' : 'Create Account'}</button>
         {/* {isLoading && <p>Loading....</p>}  */}
          {/* {errorMessage === "Please fill in all the required fields." && (
          <p className={classes.error}>{errorMessage}</p>
        )} */}

        <button
        type="button"
        className={classes.toggle}
        onClick={switchAuthModeHandler}
        >
          {haveAccount ? 'Create new account' : 'Login with existing account'}
        </button>
        </div>
      </form>
    </section>
    )
};

export default LoginPage;