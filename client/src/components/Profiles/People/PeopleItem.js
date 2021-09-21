import React, {useEffect, useState} from 'react'

import './PeopleItem.css'

//Redux and Router
import {profileData, getProfile, getProfileImage, getUsername} from '../../../redux/actions/profile';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

const PeopleItem = ({
  getProfileImage,
  username,
  id,
  bio,
  location,
  profilename,
  status,
  website,
  profile: {
    profileimage,
    loading
  }
  }) => {

  const [imagePrev, setImagePrev] = useState();

  useEffect(()=> {
    if (!profileimage) {
      getProfileImage(id);
    }

    if (!loading && profileimage) {
      const image1 = URL.createObjectURL(profileimage);
      setImagePrev(image1);
    }

    console.log(profileimage);
  }, [profileimage])


const base64String = btoa(String.fromCharCode(...new Uint8Array(profileimage)));

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

export default connect(mapStateToProps, {getProfile, getProfileImage})(PeopleItem)
