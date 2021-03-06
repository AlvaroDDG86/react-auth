import { useState, useRef, useContext } from 'react';
import AuthContext from '../../store/AuthContext';
import { API_KEY } from '../../shared/constants';

import classes from './AuthForm.module.css';
import { useHistory } from 'react-router-dom';

const AuthForm = () => {
  const history = useHistory()
  const { isLoggedIn, login } = useContext(AuthContext)
  const emailRef = useRef()
  const passwordRef = useRef()
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault()
    const emailVal = emailRef.current.value
    const passwordVal = passwordRef.current.value
    setIsLoading(true)
    setError(null)
    const URL = isLogin ? 
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + API_KEY :
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + API_KEY
    fetch(URL, {
      method: 'POST',
      body: JSON.stringify({
        email: emailVal,
        password: passwordVal,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async res => {
      const data = await res.json()
      if (res.ok) {
        login(data.idToken)
        history.replace('/')
      } else {
        setError(data.error.message)
      }
    }).catch((error) => {
      setError(error.message)
    }).finally(() => {
      setIsLoading(false)
    })
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'} { isLoggedIn.toString() }</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passwordRef} />
        </div>
        <div className={classes.actions}>
          { isLoading && <p className={classes.loading}>Loading...</p> }
          { !isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button> }
            <button
              type='button'
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
            
        </div>
        { error && <p className={classes.error}>{ error }</p>}
      </form>
    </section>
  );
};

export default AuthForm;
