import React, {useContext, Fragment} from 'react'

import './Navbar.css'

import { Link } from 'react-router-dom';

import AuthContextProvider from '../auth/auth-context';

const Navbar = (props) => {

  const context = useContext(AuthContextProvider);

  const loggedIn = (
    <ul>
    <div className="general-links">

        <Link to='/people'><span ><i className= "fas fa-users fa-fw"/> People</span></Link>

        <Link to='/projects'><span ><i className= "fas fa-tools fa-fw"/> Projects</span></Link>

        <Link to='/about'><span ><i className="fas fa-book-open"/> About</span></Link>

      </div>

      <div className="auth-links">

        <Link to='/dashboard'><span ><i className="fas fa-user fa-fw" /> You</span></Link>

        <Link
        onClick={context.onLogout} to='/' className="sign" >
        <span >
        <i class="fas fa-sign-out-alt"></i> Sign Out</span></Link>

      </div>
      </ul>
  )

  const loggedOut = (
    <ul>
    <div className="auth-links">
      <Link to='/login'  className="login"><span ><i class="fas fa-door-open"></i> Login</span></Link>

      <Link to='/register' className="sign"><span ><i className= "fas fa-sign-in-alt fa-fw"/> Sign Up</span></Link>
    </div>

    <div className="general-links">
      <Link to='/projects'><span >
      <i className= "fas fa-tools fa-fw" /> Projects</span></Link>

      <Link to='/about'><span ><i className="fas fa-book-open"/> About</span></Link>
    </div>
    </ul>
  )

  return (
    <div className="navbar">
        {context.isLoggedIn ? loggedIn : loggedOut}
    </div>
  )
}

export default Navbar

//USELESS FOR NOW
// import Register from '../Inputs/Register';
// <a href={Register}><span ><i />Register</span></a>
