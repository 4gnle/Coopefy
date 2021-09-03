import React, {useState, useEffect} from 'react'

import './Profile.css'

//UI
import Spinner from '../UI/Spinner'

//Redux and Router
import {profileData, getProfile, getProfileImage, getUsername} from '../../redux/actions/profile';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

const Profile = ({profile: {profile, profilename, loading, profileimage, bio, skills}, username, getProfileImage, getProfile, getUsername}) => {

  const links = {
    twitter: '',
    dribbble: '',
    behance: '',
    producthunt: '',
    instagram: '',
    linkedin: '',
    facebook: '',
    github: ''
  };

  const [imagePrev, setImagePrev] = useState();
  const [socialLinks, setSocialLinks] = useState(links);
  const [profileBio, setProfileBio] = useState('');
  const [username1, setUsername1] = useState();

  useEffect(() => {
    if (!profileimage && !imagePrev) getProfileImage();
    if (!loading && profileimage) {
      const image1 = URL.createObjectURL(profileimage);
      setImagePrev(image1);
    }

    if (!username) getUsername();
    if (!loading && username) {
      setUsername1(username);
    }
    console.log(username)

    // eslint-disable-next-line
  }, [getProfileImage, loading, profileimage]);

  useEffect(() => {
    if (!profile) getProfile();
    if (!loading && profile) {
      const profileData = { ...links };
      for (const key in profile.sociallinks) {
        if (key in profileData) profileData[key] = profile.sociallinks[key];
      }
      setSocialLinks(profileData);
      console.log(profileData);

      const biog = profile.bio
      setProfileBio(biog);
    }
  }, [loading, profile]);

  return (
    <div className='profile-box'>
      <div className='profile-main'>
        <div className='profile-picture'>
          <img src={imagePrev}/>
        </div>
      </div>
      <div className='profile-top'>
        <p>{profilename}</p>
        <p>@{username1}</p>

      </div>

      <div className='profile-skills'>

      </div>
      <div className='profile-activity'>

      </div>

    </div>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, {getUsername, getProfile, getProfileImage})(Profile)
