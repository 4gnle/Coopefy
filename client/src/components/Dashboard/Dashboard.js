import React from 'react'

//Components
import ActionsView from './DashboardItems/ActionsView'
import ProfileView from './DashboardItems/ProfileView'
import ColumnSection from './DashboardItems/ColumnSection'

//UI and CSS
import './Dashboard.css'
// import Button from '../UI/Button'

const Dashboard = (history) => {

  return (
    <div className='dashboard'>
      <div className='db-text'>
      </div>
        <div className='profile-view'>
          <ProfileView />
        </div>

        <div className='actions-view'>
          <ActionsView />
        </div>
    </div>
  )
}

export default Dashboard


// <div className='projects-view'>
//   <h3>New People</h3>
//   <h2>New Projects</h2>
//   <ColumnSection/>
// </div>
