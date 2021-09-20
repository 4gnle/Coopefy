import React, {useEffect, useState} from 'react'

import './PeopleItem.css'

const PeopleItem = ({
  username,
  profileimage,
  bio,
  location,
  profilename,
  status,
  website,
  loading
  }) => {

    const [imagePrev, setImagePrev] = useState();

    useEffect(()=> {
      if (!profileimage) {return};
      if (profileimage & !imagePrev) {
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
        <img src={`data:image/jpeg;base64,${imagePrev}`}/>
      </div>
    </div>
  )
}

export default PeopleItem
