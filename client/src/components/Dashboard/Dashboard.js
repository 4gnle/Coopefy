import React from 'react'

//Components
import DashboardFunctions from './DashboardFunctions'
import ActionsView from './ActionsView'
import ProfileView from './ProfileView'


// import Button from '../UI/Button'

const Dashboard = (history) => {

  return (
    <div className='dashboard'>
      <h1>Dashboard</h1>
      <DashboardFunctions/>
      <div className='actions-view'>
        <ActionsView />
      </div>
      <div className='profile-view'>
        <ProfileView />
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
