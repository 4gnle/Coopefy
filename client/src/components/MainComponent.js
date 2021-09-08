import React, {useContext, useState, useEffect} from 'react'

import AuthContextProvider from './context/main-context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Redux and Context
import {Provider} from 'react-redux';
import store from '../redux/store/store'
import authToken from '../redux/utilities/authToken'
import {loadUser} from '../redux/actions/inputs'

//Components
import Navbar from './Navigation/Navbar'
// import Footer from './Navigation/Footer'
import Login from './Inputs/Login'
import Register from './Inputs/Register'
import Dashboard from './Dashboard/Dashboard'
import Landing from './Main/Landing'
import About from './Main/About'
import People from './Profiles/People'
import Profile from './Profiles/Profile'
import CreateProfile from './Create Profile/CreateProfile'
import Projects from './Projects/Projects'
import Alerts from './UI/Alert'

const MainComponent = () => {

  if (localStorage.token){
    authToken(localStorage.token)
  }

  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  const context = useContext(AuthContextProvider);

  return (
    <Provider store={store}>
      <Router>
        <Navbar loggedin={context.isLoggedIn}/>
        <Alerts />
        <Switch>
          <Route path='/' exact component={Landing} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/projects' component={Projects} />
          <Route path='/people' component={People} />
          <Route path='/about' component={About} />
          <Route path='/edit-profile' component={CreateProfile} />
          <Route path='/:user' component={Profile} />
      </Switch>

      </Router>
    </Provider>
  )
}

export default MainComponent

// <footer>
//   <Footer loggedin={context.isLoggedIn}/>
// </footer>

// <Route path='/profile' component={Profile} />
