import React from 'react'

import Button from '../UI/Button'


const DashboardFunctions = () => {

  const editProfile = () => {
    window.location.href='/edit-profile'
  }

  return (
    <div>
    <Button
    className='small'
    onClick={editProfile}>
    Edit Profile
    </Button>

    </div>
  )
}

export default DashboardFunctions
