import React from 'react'

//Components
import ActionsView from './DashboardItems/ActionsView'
import ProfileView from './DashboardItems/ProfileView'
import ColumnSection from './DashboardItems/ColumnSection'

// import Button from '../UI/Button'

const Dashboard = (history) => {

  return (
    <div className='dashboard'>
      <h1>Dashboard</h1>
      <div className='db-actions-view'>
        <ActionsView />
      </div>
      <div className='db-profile-view'>
        <ProfileView />
      </div>
      <div className='db-column-section'>
        <ColumnSection/>
      </div>
        <div className='db-profile-description'>


          <div>
          </div>
          <div>
          </div>
        </div>
        <div>
          <div>
          </div>
          <div>
          </div>
        </div>
        <div>
        </div>
    </div>
  )
}

export default Dashboard
