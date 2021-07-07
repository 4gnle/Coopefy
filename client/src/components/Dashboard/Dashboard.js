import React from 'react'

import DashboardFunctions from './DashboardFunctions'
import Button from '../UI/Button'

const Dashboard = (history) => {

  return (
    <div className='dashboard'>
      <h1>Dashboard</h1>
      <DashboardFunctions/>
    </div>
  )
}

export default Dashboard
