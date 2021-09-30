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
  const [projectData, setProjectData] = useState([{
    projectname: '',
    projectdescription: '',
    projectskills: '',
    projectwebsite: '',
    projectreward: ''
  }]);

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

  const updateProjectData = async newData => {
    await setProjectData(prevProjectData => {
      const updatedData = [...prevProjectData]
      updatedData.unshift({
          projectname: newData.projectname,
          projectdescription: newData.projectdescription,
          projectskills: newData.projectskills,
          projectwebsite: newData.projectwebsite,
          projectreward: newData.projectreward
        })
        return updatedData;
    });
    console.log(projectData)
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
          updateProjectData={updateProjectData}
          /> : null}

        {detailsPage ?
        <DetailsSection
          goToBasics={goToBasics}
          goToSummary={goToSummary}
          projectData={projectData}
          updateProjectData={updateProjectData}
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
