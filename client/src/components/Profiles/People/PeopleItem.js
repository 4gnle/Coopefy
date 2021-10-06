import React, {useEffect, useState} from 'react'

import './PeopleItem.css'

//UI
import Button from '../../UI/Button'

import {Link} from 'react-router-dom'

const PeopleItem = ({
  profile: {
  username,
  bio,
  location,
  profilename,
  status,
  skills,
  socialLinks,
  website,
  profileimage,
  loading}
  }) => {

  const [imagePrev, setImagePrev] = useState();

  useEffect(()=> {
    if (!loading && profileimage) {
      const fileContents = new Buffer(profileimage, 'base64');

      let image1 = URL.createObjectURL(new Blob([fileContents]), {type: 'image/jpeg'});

      setImagePrev(image1);
    }
  }, [profileimage, username, loading])

  return (
    <div className='pi-box'>
      <div className='pi-top'>
        <h3 style={{margin: '5px'}}>{profilename}</h3>
        <p>@{username}</p>
      </div>

      <div className='pi-profile-picture'>
        {imagePrev ? <img alt='Profile'  src={imagePrev}/> : null}
      </div>

      <div className='pi-bottom'>
        <div className='pi-status'>
          <em>{status}</em>
        </div>

        <>
        {skills.length > 0 && (
          <>
          <h4 style={{textAlign: 'left', margin: '5px'}}>Skills</h4>
          <div className='pi-skills'>
          {skills.map((skill, index) => (
            <>
              <div style={{marginTop: '10px', marginLeft: '15px'}} key={index}>
                <p><i className="fas fa-check"></i>{' '}{skill}</p>
              </div>
            </>
          ))}
          </div>
        </>)}
        </>

          <Link to={`/u/${username}`}><Button
            className='button random'>
          View Profile</Button></Link>
        </div>
    </div>
  )
}

export default PeopleItem
