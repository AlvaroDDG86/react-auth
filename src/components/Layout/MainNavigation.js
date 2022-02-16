import { useContext, Fragment } from 'react'
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AuthContext from '../../store/AuthContext';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const history = useHistory()
  const { isLoggedIn, logout } = useContext(AuthContext)

  const logoutHandler = () => {
    logout()
    history.replace('/')
  }
  
  let links = (<li><Link to='/auth'>Login</Link></li>)
  if (isLoggedIn) {
    links = (
      <Fragment>
        <li>
          <Link to='/profile'>Profile</Link>
        </li>
        <li>
          <button onClick={logoutHandler}>Logout</button>
        </li>
      </Fragment>
    )
  }
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>{ links }</ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
