import React from 'react';

//Redux
import {profileData, getProfile} from '../../../redux/actions/profile';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

//UI
import './CreateProject.css';
import Button from '../../UI/Button'
import Spinner from '../../UI/Spinner'

const CreateProject = () => {
  return (
    <div className='create-project-box'>
      <div className='cp-top'>
        <h1>Let everyone know what you're looking for!</h1>
      </div>

      <div className='cp-description'>
        <p>Follow these guidelines for project creation</p>
        <ul>
          <li>{'Choose a clear and descriptive project name (what you are building and who you need)'}</li>
          <br/>
          <li>{'Write a comprehensive description possible (describe your project in-depth, explain your ideas, guidelines, and requirements)'}</li>
        </ul>
        <p>Catch your perfect collaborator attention's with a great first impression!</p>
      </div>
    </div>
  )
}

export default CreateProject
