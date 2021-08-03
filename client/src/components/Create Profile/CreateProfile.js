import React, {useState} from 'react'

import './CreateProfile.css'

//Components
import ImageUpload from '../UI/ProfileImage'
import SkillsandSocials from './Skills and Socials/SkillsandSocials'

//Redux
import {profileData} from '../../redux/actions/profile';
import {connect} from 'react-redux';

//UI
import Button from '../UI/Button'

const CreateProfile = ({profileData}) => {

  const [formData, setFormData] = useState({
    status: '',
    name: '',
    location: '',
    bio: '',
    website: ''
  });

  const {
  status,
  name,
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
          value={name}
          name='name'
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
            <option value="looking">Looking</option>
            <option value="building">Building</option>
            <option value="collaborating">Collaborating</option>
            <option value="learning">Learning</option>
            <option value="teaching">Teaching</option>
          </select>
        </div>
      </div>

      <div className='createprofile-bottom-inputs'>
        <label>Bio</label>
          <textarea
          maxLength='50'
          cols="30"
          rows="5"
          type='text'
          placeholder='Write about yourself (50 characters)'
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

export default connect(null, {profileData})(CreateProfile)
