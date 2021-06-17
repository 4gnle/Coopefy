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
          <Link to='/dashboard'><span ><i />Dashboard</span></Link>
          <Link to='/people'><span ><i />People</span></Link>
          <Link to='/projects'><span ><i />Projects</span></Link>
          <Link to='/about'><span ><i />About</span></Link>
          <a onClick={context.onLogout} href='/' ><span className="bad" ><i/>{''}Sign Out</span></a>
        </Fragment>)}

        {!context.isLoggedIn && (
          <Fragment>
            <Link to='/login'><span ><i />Login</span></Link>
            <Link to='/register'><span ><i />Register</span></Link>
            <Link to='/projects'><span ><i />Projects</span></Link>
            <Link to='/about'><span ><i />About</span></Link>
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
