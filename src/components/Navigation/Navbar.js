import React, {useContext, Fragment} from 'react'

import './Navbar.css'

import AuthContext from '../auth/auth-context';
import Login from '../Inputs/Login';
import Dashboard from '../Main/Dashboard';
import Landing from '../Main/Landing';

const Navbar = () => {

  const context = useContext(AuthContext);

  return (
    <div className="navbar">
      <ul>
      {!context.isLoggedIn &&
        <Fragment>
          <a href='/login'><span ><i />Login</span></a>
          <a href='/projects'><span ><i />Projects</span></a>
          <a href='/about'><span ><i />About</span></a>
        </Fragment>}
      {context.isLoggedIn &&
        <Fragment>
          <a href='/dashboard'><span ><i />Dashboard</span></a>
          <a href='/people'><span ><i />People</span></a>
          <a href='/projects'><span ><i />Projects</span></a>
          <a href='/about'><span ><i />About</span></a>
          <a onClick={context.onLogout}><span className="bad"><i/>{''}Sign Out</span></a>
        </Fragment>
      }

      </ul>
    </div>
  )
}

export default Navbar

//USELESS FOR NOW
// import Register from '../Inputs/Register';
// <a href={Register}><span ><i />Register</span></a>
