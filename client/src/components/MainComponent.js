import React, {useContext, Fragment} from 'react'

import AuthContextProvider from './auth/auth-context';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

//Components
import Navbar from './Navigation/Navbar'
import Login from './Inputs/Login'
import Register from './Inputs/Register'
import Dashboard from './Main/Dashboard'
import Landing from './Main/Landing'
import About from './Main/About'
import People from './Profiles/People'
import Profile from './Profiles/Profile'
import Projects from './Projects/Projects'

const MainComponent = () => {

  const context = useContext(AuthContextProvider);

  return (
    <div>
      <Router>
        <Navbar loggedin={context.isLoggedIn}/>

        <Switch>
          <Route path='/' exact component={Landing} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/register' component={Register} />
          <Route path='/login' component={Login} />
          <Route path='/projects' component={Projects} />
          <Route path='/people' component={People} />
          <Route path='/profile' component={Profile} />
          <Route path='/about' component={About} />
      </Switch>
      </Router>
    </div>
  )
}

export default MainComponent
