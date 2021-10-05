import React, {useState} from 'react';

//Redux
import {profileData, getProfile} from '../../../redux/actions/profile';
import {setAlert} from '../../../redux/actions/alert'
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

const CreateProject = ({setAlert, history}) => {

  //Data States
  const [formData, setFormData] = useState({
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
  } = formData;

  //Page States
  const [basicsPage, setBasicsPage] = useState(true);
  const [detailsPage, setDetailsPage] = useState(false);
  const [summaryPage, setSummaryPage] = useState(false);

  const goToBasics = () => {
    setBasicsPage(true);
    console.log(formData);
    setDetailsPage(false);
  }

  const goToDetails = () => {
    setDetailsPage(true);
    console.log(formData);
    setBasicsPage(false);
  }

  const goToSummary = () => {
    setSummaryPage(true);
    console.log(formData);
    setDetailsPage(false);
  }

  const goBack = () => {
    history.goBack();
  }

  const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const createProject = async (e) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
  <>
    <div className='create-project-box'>
      <form onSubmit={e => createProject(e)}>
        {basicsPage ? <BasicsSection
          goToDetails={goToDetails}
          goBack={goBack}
          formData={formData}
          onChange={onChange}
          setAlert={setAlert}
          /> : null}

        {detailsPage ?
        <DetailsSection
          goToBasics={goToBasics}
          goToSummary={goToSummary}
          formData={formData}
          onChange={onChange}
          setAlert={setAlert}
          /> : null}

        {summaryPage ?
          <SummarySection
          formData={formData}
          goToDetails={goToDetails}
          createProject={createProject}
          setAlert={setAlert}
          /> : null}
      </form>
    </div>
  </>
  )
}

const mapStateToProps = state => ({
  alert: state.alert
})

export default connect(mapStateToProps, {setAlert})(CreateProject)
