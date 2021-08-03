import React, {useState, useEffect} from 'react'

import './CreateProfile.css'

//Components
import ImageUpload from '../UI/ProfileImage'
import SkillsandSocials from './Skills and Socials/SkillsandSocials'

//Redux
import {profileData, getProfile} from '../../redux/actions/profile';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

//UI
import Button from '../UI/Button'

const initialState = {
  status: '',
  profilename: '',
  location: '',
  bio: '',
  website: ''
};

const CreateProfile = ({  profile: { profile, loading },
getProfile,
profileData}) => {

const [formData, setFormData] = useState(initialState);

useEffect(() => {
   if (!profile) getProfile();
   if (!loading && profile) {
     const profileData = { ...initialState };
     for (const key in profile) {
       if (key in profileData) profileData[key] = profile[key];
     }
     setFormData(profileData);
   }
 }, [loading, getProfile, profile]);

  const {
  status,
  profilename,
  location,
  bio,
  website
  } = formData;

  const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = (e) => {
    e.preventDefault();
    profileData(formData);
  }

  return (
    <div className='createprofile-edit-box'>
      <ImageUpload />
      <div className='createprofile-top-inputs'>
      <label>Name</label>
        <div className='createprofile-top-inputs-name'>
          <input
          placeholder='First and last name'
          className='m-1'
          onChange={e => onChange(e)}
          value={profilename}
          name='profilename'
          >
          </input>
        </div>

       <div className='createprofile-top-inputs-status'>
       <label>Status</label>
          <select
          name='status'
          className='m-1'
          onChange={e => onChange(e)}
          value={status}
          >
            <option value="Looking">Looking</option>
            <option value="Building">Building</option>
            <option value="Collaborating">Collaborating</option>
            <option value="Learning">Learning</option>
            <option value="Teaching">Teaching</option>
          </select>
        </div>
      </div>

      <div className='createprofile-bottom-inputs'>
        <label>Bio</label>
          <textarea
          maxLength='250'
          cols="30"
          rows="5"
          type='text'
          placeholder='Write about yourself (250 characters)'
          className=''
          onChange={e => onChange(e)}
          value={bio}
          name='bio'
          >
          </textarea>

        <label>Location</label>
          <input
          placeholder='State/City + Country  (eg. California, US)'
          onChange={e => onChange(e)}
          value={location}
          name='location'
          >
          </input>

        <label>Website</label>
          <input
          placeholder='Personal website (www.example.com)'
          className=''
          onChange={(e) => onChange(e)}
          value={website}
          name='website'
          >
          </input>
        </div>
        <div className='createprofile-skillsandsocials'>
          <SkillsandSocials />
        </div>
        <div className='createprofile-buttons'>
          <Button
          onClick={e => onSubmit(e)}
          >Save</Button>
          <Button
            className="bad"
          >Cancel</Button>
        </div>
      </div>
  )
}

CreateProfile.propTypes = {
  profileData: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({

  profile: state.profile

})

export default connect(mapStateToProps, {getProfile, profileData})(CreateProfile)
