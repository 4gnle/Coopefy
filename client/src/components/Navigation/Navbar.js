import React, {useContext, Fragment} from 'react'

import './Navbar.css'

import { Link } from 'react-router-dom';

import AuthContextProvider from '../auth/auth-context';

const Navbar = (props) => {

  const context = useContext(AuthContextProvider);

  return (
    <div className="navbar">
      <ul>
      {context.isLoggedIn && (
        <Fragment>
          <Link to='/dashboard'><span ><i className="fas fa-user fa-fw" /> Dashboard</span></Link>

          <Link to='/people'><span ><i className= "fas fa-users fa-fw"/> People</span></Link>

          <Link to='/projects'><span ><i className= "fas fa-tools fa-fw"/> Projects</span></Link>

          <Link to='/about'><span ><i className="fas fa-book-open"/> About</span></Link>

          <div className="auth-links">

            <a
            onClick={context.onLogout} href='/' >
            <span className="bad-a" >
            <i class="fas fa-sign-out-alt"></i> Sign Out</span></a>

          </div>

        </Fragment>)}

        {!context.isLoggedIn && (
          <Fragment>

            <div className="auth-links">

              <Link to='/register'><span ><i className= "fas fa-sign-in-alt fa-fw"/> Sign Up</span></Link>

              <Link to='/login'><span ><i class="fas fa-door-open"></i> Login</span></Link>

            </div>

            <div className="general-links">

              <Link to='/projects'><span >
              <i className= "fas fa-tools fa-fw" /> Projects</span>
              </Link>

              <Link to='/about'><span ><i className="fas fa-book-open"/> About</span></Link>

            </div>
          </Fragment>
        )}
      </ul>
    </div>
  )
}

export default Navbar

//USELESS FOR NOW
// import Register from '../Inputs/Register';
// <a href={Register}><span ><i />Register</span></a>
