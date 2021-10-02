import React, {useEffect, useState} from 'react'

// UI & CSS
import './CreateProject.css'
import Button from '../../UI/Button'
import Spinner from '../../UI/Spinner'

const SummarySection = ({projectData, goToDetails}) => {

  const [rewardAmount, setRewardAmount] = useState();
  const [rewardType, setRewardType] = useState();

  const {
    projectname,
    projectdescription,
    projectskills,
    projectwebsite,
    projectreward
  } = projectData;

  useEffect(() => {
    if (projectreward) {
      let result = projectreward.split(',')[1].trim();
      console.log(result);
    }
  }, [projectreward])

  return (
    <>
    <div className='create-project-box'>
      <div className='cp-summary-reward'>

      </div>
      <div className='cp-button-section'>
        <Button
          onClick={goToDetails}
          className="bad"
        >Cancel</Button>
        <Button
          type='submit'
        >Create Project</Button>
      </div>
    </div>
    </>
  )
}

export default SummarySection
