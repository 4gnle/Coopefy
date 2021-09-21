import React, {useEffect, useState} from 'react'

import './PeopleItem.css'

import {Link} from 'react-router-dom'

const PeopleItem = ({
  username,
  id,
  bio,
  location,
  profilename,
  status,
  website,
  profileimage,
  loading
  }) => {

  const [imagePrev, setImagePrev] = useState();

  useEffect(()=> {
    if (!loading && profileimage) {
      const image1 = URL.createObjectURL(profileimage);
      setImagePrev(image1);
    }

    console.log(imagePrev);
  }, [profileimage])

  return (
    <div className='pi-box'>
      <div className='pi-top'>
        <p>{profilename}</p>
        <p>@{username}</p>
      </div>

      <div className='pi-profile-picture'>
        <img src={imagePrev}/>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default PeopleItem
