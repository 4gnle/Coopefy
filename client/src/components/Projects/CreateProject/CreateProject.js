import React, {useState, useEffect} from 'react';

//Redux
import {postProject} from '../../../redux/actions/project';
import {getProfile} from '../../../redux/actions/profile';
import {setAlert} from '../../../redux/actions/alert'
import {connect} from 'react-redux';

//UI
import './CreateProject.css';
import Button from '../../UI/Button'
import Spinner from '../../UI/Spinner'

//Components
import DetailsSection from './DetailsSection';
import BasicsSection from './BasicsSection';
import SummarySection from './SummarySection';

const CreateProject = ({profile: {signedprofile, username}, setAlert, postProject, getProfile, history}) => {

  useEffect(() => {
    if (!signedprofile) {
      getProfile()
    }
    if (signedprofile) {
      console.log(signedprofile.username);
    }
  }, [signedprofile, getProfile])

  //Data States
  const [formData, setFormData] = useState({
    projectname: '',
    projectwebsite: '',
    projectdescription: '',
    projectskills: '',
    projectreward: '',
    projectlocation: '',
    projectduration: ''
  });

  const {
    projectname,
    projectwebsite,
    projectdescription,
    projectskills,
    projectreward,
    projectlocation,
    projectduration
  } = formData;

  const [locationActive, setLocationActive] = useState(false)
  const [durationActive, setDurationActive] = useState(false)


  const [spinner, setSpinner] = useState(false);

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
    setSummaryPage(false);
  }

  const goToSummary = () => {
    setSummaryPage(true);
    console.log(formData);
    setDetailsPage(false);
  }

  const goBack = () => {
    history.goBack();
  }

  const addLocation = () => {
    setLocationActive(true);
  }
  const addDuration = () => {
    setDurationActive(true);
  }

  const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const updateProjectSkills = (e) => {
    console.log(e);
    setFormData({...formData, projectskills: e})
  }

  const deleteSkills = (e) => {
    if (formData.projectskills) {
      setFormData(prevSkills => {
        const updatedSkills = prevSkills.projectskills.filter(skill => skill !== e);
        return updatedSkills;
      })
    }
  };

  const createProject = async (e) => {
    e.preventDefault();
    if (projectname && projectdescription && projectskills) {
      setSpinner(true);
      await postProject(formData);
      await history.push(`/@${signedprofile.username}/projects`);
      setSpinner(false);
    }
  }
  
  return (
  <>
    {spinner && <Spinner/>}
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
          setFormData={setFormData}
          updateProjectSkills={updateProjectSkills}
          deleteSkills={deleteSkills}
          locationActive={locationActive}
          durationActive={durationActive}
          addLocation={addLocation}
          addDuration={addDuration}
          onChange={onChange}
          setAlert={setAlert}
          /> : null}

        {summaryPage ?
          <SummarySection
          formData={formData}
          goToDetails={goToDetails}
          goToBasics={goToBasics}
          createProject={createProject}
          setAlert={setAlert}
          /> : null}
      </form>
    </div>
  </>
  )
}

const mapStateToProps = state => ({
  alert: state.alert,
  profile: state.profile
})

export default connect(mapStateToProps, {setAlert, postProject, getProfile})(CreateProject)
