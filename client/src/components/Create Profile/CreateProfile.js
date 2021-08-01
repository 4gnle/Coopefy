import React from 'react'

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
  return (
    <div className='createprofile-edit-box'>
      <ImageUpload />
      <div className='createprofile-top-inputs'>
      <label>Name</label>
        <div className='createprofile-top-inputs-name'>
          <input
          placeholder='First and last name'
          className='m-1'>
          </input>
        </div>

       <div className='createprofile-top-inputs-status'>
       <label>Status</label>
          <select
          name='Status'
          className='m-1'>
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
          className=''>
          </textarea>

        <label>Location</label>
          <input
          placeholder='State/City + Country  (eg. California, US)'>
          </input>

        <label>Website</label>
          <input
          placeholder='Personal website (www.example.com)'
          className=''>
          </input>
        </div>
        <div className='createprofile-skillsandsocials'>
          <SkillsandSocials skills={} socials={} />
        </div>
        <div className='createprofile-buttons'>
          <Button
          >Save</Button>
          <Button
            className="bad"
          >Cancel</Button>
        </div>
      </div>
  )
}

export default connect(null, profileData)(CreateProfile)
