import React, {useState, useEffect} from 'react'

// UI and CSS
import styled from 'styled-components';

//Redux & Router
import {useSelector, useDispatch} from 'react-redux'
import {Link} from 'react-router-dom';

import {logUserOut} from '../../redux/actions/inputs'
import {getProfile} from '../../redux/actions/profile';

const Navbar = ({logUserOut, profilesign}) => {

  const authData = useSelector(state => state.authenticate);

  const profileData = useSelector(state => state.profile);

  const dispatch = useDispatch();

  const {signedprofile, loading, username, _id} = profileData;

  const {isAuth} = authData;

  useEffect(() => {
    dispatch(getProfile());
  }, [loading, signedprofile])

  const logOUT = () => {
    dispatch(logUserOut);
  }

  const loggedIn = (
    <ul>
      <GeneralLinks>

          <Links to='/dashboard'><i className="fas fa-columns"></i><Span> Dashboard</Span></Links>

          <Link to='/projects'><i className= "fas fa-tools fa-fw"/><Span> Projects</Span></Link>

          <Links to='/people'><i className= "fas fa-users fa-fw"/><Span> People</Span></Links>

          <Links to='/about'><i className="fas fa-book-open"/><Span> About</Span></Links>

        </GeneralLinks>

        <AuthLinks>

          {signedprofile && <Links to={`/@${signedprofile.username}`}><i className="fas fa-user fa-fw" /><Span>You</Span></Links>}

          <AuthLink to='/' onClick={logOUT}>
          <i className="fas fa-sign-out-alt"></i><Span>Log Out</Span></AuthLink>

        </AuthLinks>
      </ul>
  )

  const loggedOut = (
    <ul>
      <AuthLinks>
        <Links to='/login'><i className="fas fa-door-open"></i><Span> Login</Span></Links>

        <AuthLink to='/register'><i className= "fas fa-sign-in-alt fa-fw"/><Span> Register</Span></AuthLink>
      </AuthLinks>

      <GeneralLinks>
        <Links to='/people'><i className= "fas fa-users fa-fw"/><Span> People</Span></Links>

        <Links to='/projects'><i className= "fas fa-tools fa-fw" />
        <Span> Projects</Span></Links>

        <Links to='/about'><i className="fas fa-book-open"/><Span> About</Span></Links>
      </GeneralLinks>
    </ul>
  )

  return (
    <Navbar1>
          <NavbarTitle>
            <Links to="/" ><i className='fas fa-hands-helping'/><Span className="icon-sm"> Coopefy</Span></Links>
          </NavbarTitle>

    {isAuth ? loggedIn : loggedOut}
    </Navbar1>
  )
}

export default Navbar;

const Span = styled.span`

`;

const Navbar1 = styled.div`
  display: block;
  background-color: #000000;
  justify-content: space-between;
  text-align: center;
  z-index: 1;
  width: 100%;
  height: 10%;
  border-bottom: solid 1px gray;
  opacity: 0.8;
  overflow: hidden;

  @media (max-width: 480px) {
    position: fixed;
    display: block;
    text-align: center;
    z-index: 1000;
  }
`;

const Links = styled(Link)`
  color: white;
  padding: 0.45rem;
  margin: 0 0.25rem;
  cursor: pointer;
  float: left;
  align-items: right;
  text-decoration: none;
  border-radius: 18px;

  @media (max-width: 650px) {
    ${Span} {
      display: none;
      justify-content: center;
    }
  }
`;

const AuthLink = styled(Links)`
  border-radius: 10px;
  border: 1px solid;
`;

const NavbarTitle = styled.h1`
display: block;
float: left;
font-size: 20px;
`;

const GeneralLinks = styled.div`
  display: inline-block;
  align-items: center;
  text-align: center;
  float: center;
`;

const AuthLinks = styled.div`
  display: inline-block;
  align-items: right;
  text-align: right;
  float: right;
`;
