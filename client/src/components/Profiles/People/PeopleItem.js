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
    console.log(profileimage);

    if (!loading && profileimage) {
      setImagePrev(profileimage);
    }

  }, [profileimage])

  const toBase64 = (arr) => {
     arr = new Uint8Array(arr);

     return btoa(
        arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
     );
  }

  return (
    <div className='pi-box'>
      <div className='pi-top'>
        <p>{profilename}</p>
        <p>@{username}</p>
      </div>

      <div className='pi-profile-picture'>
    {profileimage &&<img src={`data:image/jpeg;base64,${toBase64(profileimage)}`}/>}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default PeopleItem
