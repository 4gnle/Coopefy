import React, {useContext, Fragment} from 'react'

import './Footer.css'

import { Link } from 'react-router-dom';

import AuthContextProvider from '../auth/auth-context';

const Footer = (props) => {

  const context = useContext(AuthContextProvider);

  const loggedIn = (
    <ul>
      <div className="general-links">

          <Link to='/people'><span> People</span></Link>

          <Link to='/projects'><span> Projects</span></Link>

          <Link to='/about'><span> About</span></Link>

        </div>

        <div className="auth-links">

          <Link to='/dashboard'><span > You</span></Link>

          <Link
          onClick={context.onLogout} to='/' className="sign" >
          <span >
          Sign Out</span></Link>

        </div>
      </ul>
  )

  const loggedOut = (
    <ul>
      <div className="auth-links">
        <Link to='/login'  className="login"><span> Login</span></Link>

        <Link to='/register' className="sign"><span> Sign Up</span></Link>
      </div>

      <div className="general-links">
        <Link to='/people'><span> People</span></Link>

        <Link to='/projects'>
        <span> Projects</span></Link>

        <Link to='/about'><span> About</span></Link>
      </div>
    </ul>
  )

  return (
    <div className="footer">
          <h1 className="title1">
            <Link to="/" ><span className="icon-sm"> Coopefy</span></Link>
          </h1>
        {context.isLoggedIn ? loggedIn : loggedOut}
    </div>
  )
}

export default Footer;
