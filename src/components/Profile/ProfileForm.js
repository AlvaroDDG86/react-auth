import { useRef, useState, useContext } from 'react'
import { API_KEY } from '../../shared/constants';
import AuthContext from '../../store/AuthContext';
import classes from './ProfileForm.module.css';

const URL = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=' + API_KEY

const ProfileForm = () => {
  const { token, login } = useContext(AuthContext)
  const newPasswordRef = useRef()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const submitHandler = (event) => {
    event.preventDefault()

    const newPasswordVal = newPasswordRef.current.value
    fetch(URL, {
      method: 'POST',
      body: JSON.stringify({
        idToken: token,
        password: newPasswordVal,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async res => {
      const data = await res.json()
      if (res.ok) {
        login(data.idToken)
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
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newPasswordRef} required minLength="6" />
      </div>
      <div className={classes.action}>
        { isLoading && <p>Loading...</p> }
        { !isLoading && <button>Change Password</button> }
      </div>
      { error && <p>{ error }</p>}
    </form>
  );
}

export default ProfileForm;
