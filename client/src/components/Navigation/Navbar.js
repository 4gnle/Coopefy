import React, {useContext} from 'react'

import './Navbar.css'

import { Link } from 'react-router-dom';

const Navbar = (props) => {

  const loggedIn = (
    <ul>
      <div className="general-links">

          <Link to='/people'><i className= "fas fa-users fa-fw"/><span> People</span></Link>

          <Link to='/projects'><i className= "fas fa-tools fa-fw"/><span> Projects</span></Link>

          <Link to='/about'><i className="fas fa-book-open"/><span> About</span></Link>

        </div>

        <div className="auth-links">

          <Link to='/dashboard'><span ><i className="fas fa-user fa-fw" /> You</span></Link>

          <Link
            to='/' className="sign" >
          <span >
          <i className="fas fa-sign-out-alt"></i> Log Out</span></Link>

        </div>
      </ul>
  )

  const loggedOut = (
    <ul>
      <div className="auth-links">
        <Link to='/login'  className="login"><i className="fas fa-door-open"></i><span> Login</span></Link>

        <Link to='/register' className="sign"><i className= "fas fa-sign-in-alt fa-fw"/><span> Register</span></Link>
      </div>

      <div className="general-links">
        <Link to='/people'><i className= "fas fa-users fa-fw"/><span> People</span></Link>

        <Link to='/projects'><i className= "fas fa-tools fa-fw" />
        <span> Projects</span></Link>

        <Link to='/about'><i className="fas fa-book-open"/><span> About</span></Link>
      </div>
    </ul>
  )

  return (
    <div className="navbar">
          <h1 className="title1">
            <Link to="/" ><i className='fas fa-hands-helping'/><span className="icon-sm"> Coopefy</span></Link>
          </h1>
    </div>
  )
}

export default Navbar;
