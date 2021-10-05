import React from 'react'

import './ProjectItem.css'

const ProjectItem = ({project}) => {

  const {
    projectname,
    projectdescription,
    projectskills,
    projectlocation,
    projectwebsite,
    projectreward
  } = project;

  return (
    <div className='projectitem-box'>
      <div className='pi-projectname'>
        <h1>{projectname}</h1>
      </div>
    {projectlocation}

    </div>
  )
}

export default ProjectItem
