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
import SummarySection from './SummarySection';

const projectData = {
  projectname: '',
  projectdescription: '',
  projectskills: '',
  projectwebsite: ''
}

const CreateProject = ({history}) => {

  //Data States
  const [formData, setFormData] = useState(projectData)

  //Page States
  const [basicsPage, setBasicsPage] = useState(true);
  const [detailsPage, setDetailsPage] = useState(false);
  const [summaryPage, setSummaryPage] = useState(false);

  const goToBasics = () => {
    setBasicsPage(true);
    setDetailsPage(false);
  }

  const goToDetails = () => {
    setDetailsPage(true);
    setBasicsPage(false);
  }

  const goToSummary = () => {
    setSummaryPage(true);
    setDetailsPage(false);
  }

  const goBack = () => {
    history.goBack();
  }

  const createProject = () => {
    console.log('Perform Redux Action')
  }

  return (
  <>
    <div className='create-project-box'>
      <form>
        {basicsPage ? <BasicsSection
          goToDetails={goToDetails}
          goBack={goBack}
          formData={formData}
          /> : null}

        {detailsPage ?
        <DetailsSection
          goToBasics={goToBasics}
          goToSummary={goToSummary}
          formData={formData}
          /> : null}

        {summaryPage ?
          <SummarySection
          formData={formData}
          goToDetails={goToDetails}
          createProject={createProject}
          /> : null}
      </form>
    </div>
  </>
  )
}

export default CreateProject
