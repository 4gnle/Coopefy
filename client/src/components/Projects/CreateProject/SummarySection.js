import React from 'react'

// UI & CSS
import './CreateProject.css'
import Button from '../../UI/Button'
import Spinner from '../../UI/Spinner'

const SummarySection = ({projectData, goToDetails}) => {

  const {
    projectname,
    projectdescription,
    projectskills,
    projectwebsite,
    projectreward
  } = projectData;

  return (
    <>
      <div className='cp-button-section'>


        <Button
          onClick={goToDetails}
          className="bad"
        >Cancel</Button>
        <Button
          type='submit'
        >Create Project</Button>
      </div>
    </>
  )
}

export default SummarySection
