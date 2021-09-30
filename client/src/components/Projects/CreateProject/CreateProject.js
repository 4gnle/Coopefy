import React, {useState} from 'react';

//Redux
import {profileData, getProfile} from '../../../redux/actions/profile';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

//UI
import './CreateProject.css';
import Button from '../../UI/Button'
import Spinner from '../../UI/Spinner'

//Components
import DetailsSection from './DetailsSection';
import BasicsSection from './BasicsSection';

const CreateProject = () => {

  const [firstPage, setFirstPage] = useState(true);
  const [secondPage, setSecondPage] = useState(false);
  const [thirdPage, setThirdPage] = useState(false);

  const goForward = () => {
    setFirstPage(true);
  }

  const goBack = () => {
    setFirstPage(false);
  }

  return (
  <>
    <div className='create-project-box'>
      {firstPage && !secondPage || !thirdPage ? <BasicsSection goBack={goBack} /> : null}

      {secondPage && !thirdPage ? <DetailsSection goBack={goBack}/> : null}

      {secondPage && !thirdPage ? <DetailsSection /> : null}
    </div>
  </>
  )
}

export default CreateProject
