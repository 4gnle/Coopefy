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
              <div style={{marginTop: '10px', marginLeft: '25px'}} key={index}>
                <p><i className="fas fa-check"></i>{' '}{skill}</p>
              </div>
            </>
          ))}
          </div>
        </>)}
        </>

        <>
        {socialLinks && socialLinks.length > 0 && (
          <>
        <h4 style={{textAlign: 'left', margin: '2px'}}>Links</h4>
        <div className='pi-links'>
          <div className='pi-links-icons'>
              {socialLinks.producthunt && <Link target="_blank" rel="noopener noreferrer" to={ {pathname: `https://www.producthunt.com/${socialLinks.producthunt}`}}><i className="fab fa-product-hunt"></i></Link>}

              {socialLinks.github && <Link target="_blank" rel="noopener noreferrer" to={ {pathname: `https://www.github.com/${socialLinks.github}`}}><i style={{color: 'black'}} className="fab fa-github-square"></i></Link>}

              {socialLinks.twitter && <Link target="_blank" rel="noopener noreferrer" to={ {pathname: `https://www.twitter.com/${socialLinks.twitter}`}}><i className="fab fa-twitter-square"></i></Link>}

              {socialLinks.instagram && <Link target="_blank" rel="noopener noreferrer" to={ {pathname: `https://www.instagram.com/${socialLinks.instagram}`}}><i className="fab fa-instagram-square"></i></Link>}

              {socialLinks.behance && <Link target="_blank" rel="noopener noreferrer" style={{color: 'black'}} to={ {pathname: `https://www.behance.net/${socialLinks.behance}`}}><i className="fab fa-behance-square"></i></Link>}

              {socialLinks.dribbble && <Link target="_blank" rel="noopener noreferrer" to={{pathname: `https://www.dribbble.com/${socialLinks.dribbble}`}}><i className="fab fa-dribbble-square"></i></Link>}

              {socialLinks.linkedin && <Link target="_blank" rel="noopener noreferrer" to={{pathname: `https://www.linkedin.com/${socialLinks.linkedin}`}}><i className="fab fa-linkedin-square"></i></Link>}

              {socialLinks.facebook && <Link target="_blank" rel="noopener noreferrer" to={ {pathname: `https://www.facebook.com/${socialLinks.facebook}`}}><i className="fab fa-facebook-square"></i></Link>}
            </div>
          </div>
        </>)}
          </>

          <Link to={`${username}`}><Button
            className='small'>
          View Profile</Button></Link>
        </div>
    </div>
  )
}

export default PeopleItem
