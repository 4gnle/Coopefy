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
    if (projectData) {
      let amount = projectskills.split(',')[1].trim();

      let reward = projectskills.split(',')[0].trim();

      setRewardAmount(amount);
      setRewardType(reward);
      console.log(rewardType)
    }
  }, [projectreward]);

  return (
    <>
    <div className='create-project-box'>
      <div className='cp-summary-reward'>
        {rewardType}
        {rewardAmount}
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
