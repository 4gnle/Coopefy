import React from 'react'

//Components
import ActionsView from './DashboardItems/ActionsView'
import ProfileView from './DashboardItems/ProfileView'
// import ColumnSection from './DashboardItems/ColumnSection'

//UI and CSS
import './Dashboard.css'
import Error404 from '../UI/Error404'

import {connect} from 'react-redux';


const Dashboard = ({authenticate: {isAuth, user}, history}) => {

  return (
    <>
    {!isAuth ? <Error404/> :
    <div className='dashboard'>
      <div className='db-text'>
          <h1>Dashboard</h1>
      </div>

        <div className='profile-view'>
          <ProfileView />
        </div>

        <div className='actions-view'>
          <ActionsView />
        </div>
    </div>}
    </>
  )
}

const mapStateToProps = state => ({
  authenticate: state.authenticate
})

export default connect(mapStateToProps)(Dashboard)


// <div className='projects-view'>
//   <h3>New People</h3>
//   <h2>New Projects</h2>
//   <ColumnSection/>
// </div>
