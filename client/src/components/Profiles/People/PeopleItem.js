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
      let image = new Uint8Array(profileimage);
      let blob = new Blob([image], {type: 'image/png'});
      let image1 = URL.createObjectURL(blob);
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
        {imagePrev ? <img src={imagePrev}/> : null}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default PeopleItem
