import React, {useState, useEffect} from 'react'

import './Profile.css'

//UI
import Spinner from '../UI/Spinner'

//Redux and Router
import {profileData, getProfile, getProfileImage, getUsername} from '../../redux/actions/profile';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const stateLinks = {
  twitter: '',
  dribbble: '',
  behance: '',
  producthunt: '',
  instagram: '',
  linkedin: '',
  facebook: '',
  github: ''
};

const stateSkills = {
  skills: ''
};

const profileInfo = {
  status: '',
  profilename: '',
  location: '',
  bio: '',
  website: ''
};

const Profile = ({profile: {profile, loading, profileimage, bio, skills, username}, getProfileImage, getProfile, getUsername}) => {

  const [imagePrev, setImagePrev] = useState();
  const [socialLinks, setSocialLinks] = useState(stateLinks);
  const [skillsData, setSkillsData] = useState(stateSkills);
  const [profileBio, setProfileBio] = useState('');
  const [profileLoading, setProfileLoading] = useState();
  const [profileName, setProfileName] = useState('');
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

    // eslint-disable-next-line
  }, [getProfileImage, loading, profileimage, username]);

  useEffect(() => {
     if (!profile) getProfile();
     if (!loading && profile) {
       const profileLinks = { ...stateLinks };
       for (const key in profile.sociallinks) {
         if (key in profileLinks) profileLinks[key] = profile.sociallinks[key];
       }
       setSocialLinks(profileLinks);

       const profileSkills = {...stateSkills};
       for (const key in profile) {
         if (key in profileSkills) profileSkills[key] = profile[key];
       }
       setSkillsData(profileSkills)
      }

      if (!profile) getProfile();
      if (!loading && profile) {
        const profileData = { ...profileInfo };
        for (const key in profile) {
          if (key in profileData) profileData[key] = profile[key];
        }
        setProfileBio(profile.bio);
        setProfileLoading(profile.loading);
      }
   }, [loading, getProfile, profile]);

  return (
    <div className='profile-box'>
      <div className='profile-main'>
        <div className='profile-picture'>
            <img src={imagePrev}/>
          </div>
          <div className='profile-top'>
            <p><strong>{profile && profile.profilename}</strong>&nbsp;&nbsp;
            <span>@{username1 && username1}</span></p>
              <em>{profileBio && profileBio}</em>
            </div>
          </div>


          <div className='profile-skills'>
          {skillsData.skills.length > 0 && skillsData.skills.map((skill, index) => (
            <>
            <div key={index}>
                <p><i class="fas fa-check"></i> {' '}{skill}</p>
            </div>
            </>
            ))}
          </div>

          <div className='profile-activity'>
          <h2>Activity</h2>
          </div>
        </div>
    )}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, {getUsername, getProfile, getProfileImage})(Profile)
