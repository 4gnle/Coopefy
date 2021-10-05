import React, {useEffect, useState} from 'react'

// UI & CSS
import './CreateProject.css'
import Button from '../../UI/Button'
import Spinner from '../../UI/Spinner'

const SummarySection = ({formData, goToDetails, createProject}) => {

  const [rewardAmount, setRewardAmount] = useState();
  const [rewardType, setRewardType] = useState();

  const {
    projectname,
    projectdescription,
    projectskills,
    projectwebsite,
    projectreward,
    projectamount
  } = formData;

  return (
    <>
      <div className='cp-project-basics'>
        <h3>Name</h3> {projectname}
        <h4>Description</h4> {projectdescription}
        <h4>Website</h4> {projectwebsite}
      </div>

      <div className='cp-project-skills'>
        <h4>Skills</h4>
        {projectskills.length > 0 && projectskills.map((skill, index) => (
          <>
          <div key={index}>
              <p><i class="fas fa-check"></i> {' '}{skill}</p>
          </div>
          </>
        ))}
      </div>
      {formData && projectreward && projectamount ? (<div className='cp-summary-reward'>
        <h4>Project Reward</h4>
        <p>{projectamount}{' '}{projectreward}</p>
      </div>) : null}

      <div className='cp-button-section'>
        <Button
          onClick={goToDetails}
          className="bad"
        >Cancel</Button>
        <Button
          type='submit'
          onClick={createProject}
        >Create Project</Button>
      </div>
    </>
  )
}

export default SummarySection
