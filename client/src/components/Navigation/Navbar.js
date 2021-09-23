import React, {useState, useEffect} from 'react'

import './Navbar.css'

//Redux & Router
import {connect} from 'react-redux'
import {Link} from 'react-router-dom';

import {logUserOut} from '../../redux/actions/inputs'
import {getProfile} from '../../redux/actions/profile';

const Navbar = ({ authenticate: {isAuth}, profile: {profile, loading, username, _id}, logUserOut }) => {

  const [username1, setUsername1] = useState();

  useEffect(() => {
    if (!profile) getProfile();

    if (profile && !loading && profile.username) {
      setUsername1(profile.username);
    }
  }, [loading, profile])


  const loggedIn = (
    <ul>
      <div className="general-links">

          <Link to='/dashboard'><i className="fas fa-columns"></i><span> Dashboard</span></Link>

          <Link to='/projects'><i className= "fas fa-tools fa-fw"/><span> Projects</span></Link>

          <Link to='/people'><i className= "fas fa-users fa-fw"/><span> People</span></Link>

          <Link to='/about'><i className="fas fa-book-open"/><span> About</span></Link>

        </div>

        <div className="auth-links">

          <Link to={`/${username1}`}><i className="fas fa-user fa-fw" /><span>You</span></Link>

          <Link to='/' className="sign" onClick={logUserOut}>
          <i className="fas fa-sign-out-alt"></i><span>Log Out</span></Link>

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

    {isAuth ? loggedIn : loggedOut}
    </div>


  )
}

const mapStateToProps = state => ({
  authenticate: state.authenticate,
  profile: state.profile
})

export default connect(mapStateToProps, {logUserOut, getProfile})(Navbar);
