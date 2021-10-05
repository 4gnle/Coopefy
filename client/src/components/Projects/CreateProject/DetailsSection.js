import React, {useState, useEffect} from 'react'

// UI & CSS
import './CreateProject.css';
import Button from '../../UI/Button'
import Spinner from '../../UI/Spinner'

//Components and Utils
import ProjectSkills from './ProjectSkills'

const stateSkills = {
  projectskills: ''
};

const DetailsSection = ({goToBasics, goToSummary, formData, onChange, setAlert, setFormData}) => {

  const [nextPage1, setNextPage] = useState(false);

  const [changeSkills, setChangeSkills] = useState(false);

  const {
    projectskills,
    projectreward,
    projectamount
  } = formData;

  const addProjectSkills = async (newSkills) => {
    if (newSkills !== projectskills) {

    const chosenSkills = newSkills.map(skill => {
        return skill.skill
      })

    await console.log(chosenSkills)

    setFormData({...formData, [projectskills]: chosenSkills})
    }
  }

  const deleteSkills = (e) => {
    if (formData.projectskills) {
      setFormData(prevSkills => {
        const updatedSkills = prevSkills.projectskills.filter(skill => skill !== e);
        return updatedSkills;
      })
    }
  };

  const nextPage = async () => {
    await console.log(formData);
    goToSummary();
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

          <div className='cp-skills-section'>
            <Button
              onClick={selectSkills}>
              Select Skills
            </Button>

            {formData.projectskills.length > 0 && formData.projectskills.map((skill, index) => (
              <>
              <div className='cp-skill-buttons' key={index}>
                  <Button
                    onClick={e => deleteSkills(e)}
                    >{skill}</Button>
              </div>
              </>
              ))}
          </div>

          <h2 className='cp-input-titles'>Explain reward method {'(optional)'}</h2>
          <select
            name='projectreward'
            value={projectreward}
            onChange={e => onChange(e)}
            >
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
            name='projectamount'
            value={projectamount}
            onChange={e => onChange(e)}
            type='number'
          />

        </div>

      {changeSkills && <ProjectSkills formData={formData} addProjectSkills={addProjectSkills} unSelectSkills={unSelectSkills}/>}

      <div className='cp-button-section'>
        <Button
          onClick={goToBasics}
          className="button bad"
        >Cancel</Button>
        <Button
          onClick={nextPage}
          className='button primary'
        >Continue</Button>
    </div>
  </div>
  )
}

export default DetailsSection
