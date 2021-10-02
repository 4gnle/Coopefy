import React, {useState} from 'react'

// UI & CSS
import './CreateProject.css';
import Button from '../../UI/Button'
import Spinner from '../../UI/Spinner'

//Components and Utils
import ProjectSkills from './ProjectSkills'

const stateSkills = {
  projectskills: ''
};

const DetailsSection = ({goToBasics, goToSummary, projectData, updateProjectData}) => {
  const [nextPage1, setNextPage] = useState(false);

  const [changeSkills, setChangeSkills] = useState(false);

  const [skillsData, setSkillsData] = useState(stateSkills);

  const [formData, setFormData] = useState({
    projectskills: '',
    projectreward: ''
  })

  const {
    projectskills,
    projectreward
  } = formData;

  const addProjectSkills = newSkills => {
    if (newSkills.projectskills !== formData.projectskills) {

    const chosenSkills = newSkills.map(skill => {
        return skill.skill
      })

    setFormData({
        projectskills: chosenSkills
      })
    }
    console.log(formData);
  }

  const nextPage = () => {
    goToSummary();
    updateProjectData(formData)
  }

  const selectSkills = () => {
    setChangeSkills(true);
  }

  const unSelectSkills = () => {
    setChangeSkills(false);
  }

  return (
    <div>
      <div className='cp-top'>
        <h1>Project Details</h1>
        <h2><em>Who you want and what you're offering</em></h2>
      </div>

      <div className='cp-description'>
        <p>Follow these guidelines:</p>
        <ul>
          <li>Choose the ideal <em>skills</em> of the person you're looking for.</li>
          <br/>
          <li>Make it clear what you're collaborators get from working on this project.</li>
          <br/>
          <li>Decide whether it's a remote or location-specific project</li>
        </ul>
        <p>Catch your perfect collaborator's attention with clear details!</p>
      </div>

        <div className='cp-input-section'>
          <h2 className='cp-input-titles'>Pick the skills you need for the project</h2>

          <Button
            onClick={selectSkills}>
            Select Skills
          </Button>

          <h2 className='cp-input-titles'>Explain reward method {'(optional)'}</h2>
          <select>
            <option value="" disabled selected hidden>Token</option>
            <option value="ETH">ETH</option>
            <option value="SOL">SOL</option>
            <option value="BTC">BTC</option>
            <option value="DBUCKS">DBUCKS</option>
            <option value="USDC">USDC</option>
            <option value="USDT">USDT</option>
          </select>

          <input
            className='input-amount'
            placeholder='Amount'
          />

        </div>

      {changeSkills && <ProjectSkills skillsData={skillsData} selectSkills={selectSkills} unSelectSkills={unSelectSkills}/>}

      <div className='cp-button-section'>
        <Button
          onClick={goToBasics}
          className="bad"
        >Cancel</Button>
        <Button
          onClick={nextPage}
          className='primary'
        >Continue</Button>
    </div>
  </div>
  )
}

export default DetailsSection
