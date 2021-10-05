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
    <div className='create-project-box'>
      <div className='cp-summary-reward'>
        {projectreward}
        {projectamount}
      </div>
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
    </div>
    </>
  )
}

export default SummarySection
