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

const CreateProject = ({history}) => {

  //Data States
  const [projectData, setProjectData] = useState({
    projectname: '',
    projectwebsite: '',
    projectdescription: '',
    projectskills: '',
    projectreward: ''
  });

  const {
    projectname,
    projectwebsite,
    projectdescription,
    projectskills,
    projectreward
  } = projectData;

  //Page States
  const [basicsPage, setBasicsPage] = useState(true);
  const [detailsPage, setDetailsPage] = useState(false);
  const [summaryPage, setSummaryPage] = useState(false);

  const goToBasics = () => {
    setBasicsPage(true);
    console.log(projectData);
    setDetailsPage(false);
  }

  const goToDetails = () => {
    setDetailsPage(true);
    console.log(projectData);
    setBasicsPage(false);
  }

  const goToSummary = () => {
    setSummaryPage(true);
    console.log(projectData);
    setDetailsPage(false);
  }

  const goBack = () => {
    history.goBack();
  }

  const updateProjectBasics = async newData => {
    await setProjectData({...projectData, [projectname]: newData.projectname})

    await setProjectData({...projectData, [projectwebsite]: newData.projectwebsite})

    await setProjectData({...projectData, [projectdescription]: newData.projectdescription})

    console.log(projectData);
  }

  const updateProjectDetails = async newData => {
    console.log(newData)

    await setProjectData({...projectData, [projectskills]: newData.projectskills})

    await setProjectData({...projectData, [projectreward]: newData.projectreward})

    console.log(projectData);
  }

  const createProject = async (e) => {
    e.preventDefault()
    console.log(projectData)
  }

  return (
  <>
    <div className='create-project-box'>
      <form onSubmit={e => createProject(e)}>
        {basicsPage ? <BasicsSection
          goToDetails={goToDetails}
          goBack={goBack}
          projectData={projectData}
          updateProjectBasics={updateProjectBasics}
          /> : null}

        {detailsPage ?
        <DetailsSection
          goToBasics={goToBasics}
          goToSummary={goToSummary}
          projectData={projectData}
          updateProjectDetails={updateProjectDetails}
          /> : null}

        {summaryPage ?
          <SummarySection
          projectData={projectData}
          goToDetails={goToDetails}
          createProject={createProject}
          /> : null}
      </form>
    </div>
  </>
  )
}

export default CreateProject
