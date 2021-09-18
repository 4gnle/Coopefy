import React from 'react'

import './PeopleItem.css'

const PeopleItem = ({
  username,
  profileimage,
  bio,
  location,
  profilename,
  status,
  website
  }) => {

  return (
    <div className='pi-box'>
      <p>{username}</p>
      <img src={profileimage}/>
      <p>{profilename}</p>
    </div>
  )
}

export default PeopleItem
