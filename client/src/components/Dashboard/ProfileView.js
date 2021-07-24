import React from 'react'

//Styles
import './ProfileView.css'

//UI
import Button from '../UI/Button'

const ProfileView = () => {

  const editProfile = () => {
    window.location.href='/edit-profile'
  }

  return (
    <div className='pv-box'>
      <h4>You</h4>
      <div className='pv-box-items'>
        <div className='pv-profile-picture'>
        </div>

      </div>

      <Button
      className='small'
      onClick={editProfile}>
      Edit Profile
      </Button>
    </div>
  )
}

export default ProfileView
