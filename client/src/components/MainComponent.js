import React, {useContext, useEffect} from 'react'

import AuthContextProvider from './context/main-context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Redux and Context
import authToken from '../redux/utilities/authToken'
import {getProfile} from '../redux/actions/profile'
import { connect } from "react-redux";

//Components
import Navbar from './Navigation/Navbar'
// import Footer from './Navigation/Footer'
import Login from './Inputs/Login'
import Register from './Inputs/Register'
import Dashboard from './Dashboard/Dashboard'
import Landing from './Main/Landing'
import About from './Main/About'
import People from './Profiles/People/People'
import Profile from './Profiles/Profile/Profile'
import CreateProfile from './Profiles/CreateProfile/CreateProfile'
import Projects from './Projects/ProjectsList'
import Project from './Projects/Project/ProjectPage'
import CreateProject from './Projects/CreateProject/CreateProject'

import Alerts from './UI/Alert'

const MainComponent = ({signedprofile, getProfile}) => {

  if (localStorage.token){
    authToken(localStorage.token)
  }

  useEffect(() => {
    getProfile();
  }, [getProfile])

  const context = useContext(AuthContextProvider);

  return (
      <Router>
        <Navbar profilesign={signedprofile} loggedin={context.isLoggedIn}/>
        <Alerts />
        <Switch>
          <Route path='/' exact component={Landing} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/projects' component={Projects} />
          <Route path='/create-project' component={CreateProject} />
          <Route path='/people' component={People} />
          <Route path='/about' component={About} />
          <Route path='/edit-profile' component={CreateProfile} />
          <Route path='/@:username' component={Profile} />
          <Route path='/project/:id/:projectname' component={Project} />
      </Switch>

      </Router>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, {getProfile})(MainComponent)
