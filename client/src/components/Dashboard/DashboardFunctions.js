import React from 'react'

import Button from '../UI/Button'


const DashboardFunctions = () => {

  const editPage = () => {
    window.location.href='/profile-edit'
  }

  return (
    <div>
    <Button
    className='small'
    onClick={editPage}>
    Edit Profile
    </Button>

    </div>
  )
}

export default DashboardFunctions
