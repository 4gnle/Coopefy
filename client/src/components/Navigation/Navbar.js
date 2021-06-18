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

          <a
          onClick={context.onLogout} href='/' >
          <span className="bad-a" >
          <i/>Sign Out</span></a>

        </Fragment>)}

        {!context.isLoggedIn && (
          <Fragment>
            <Link to='/login'><span ><i className= "fas fa-egg fa-fw"/> Login</span></Link>

            <Link to='/register'><span ><i className= "fas fa-sign-in-alt fa-fw"/> Register</span></Link>

            <Link to='/projects'><span >
            <i className= "fas fa-tools fa-fw" /> Projects</span>
            </Link>

            <Link to='/about'><span ><i className="fas fa-book-open"/> About</span></Link>
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
