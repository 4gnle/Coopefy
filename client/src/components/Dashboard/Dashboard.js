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
        <h1>Dashboard</h1>
        <h2>New Projects</h2>
        <h3>New People</h3>
      </div>
        <ActionsView />
        <ProfileView />
        <ColumnSection/>
    </div>
  )
}

export default Dashboard
