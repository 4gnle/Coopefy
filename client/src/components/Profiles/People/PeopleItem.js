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
  skills,
  website,
  profileimage,
  loading
  }) => {

  const [imagePrev, setImagePrev] = useState();

  useEffect(()=> {
    if (!loading && profileimage) {
      const fileContents = new Buffer(profileimage, 'base64');

      let image1 = URL.createObjectURL(new Blob([fileContents]), {type: 'image/jpeg'});

      setImagePrev(image1);
    }
  }, [profileimage])

  return (
    <div className='pi-box'>
      <div className='pi-top'>
        <h3 style={{margin: '5px'}}>{profilename}</h3>
        <p>@{username}</p>
      </div>

      <div className='pi-profile-picture'>
        {imagePrev ? <img src={imagePrev}/> : null}
      </div>

      <div className='pi-bottom'>
        <div className='pi-status'>

        </div>

        <div className='pi-skills'>
          {skills && skills.map((skill, index) => (
            <>
              <div key={index}>
                <i class="fas fa-check"></i>{' '}<p>{skill}</p>
              </div>
            </>
          ))}
        </div>

      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default PeopleItem
