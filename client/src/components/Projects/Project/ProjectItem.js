import React from 'react'

//UI && CSS
import Button from '../../UI/Button'
import './ProjectItem.css'

import {Link} from 'react-router-dom'

const ProjectItem = ({project}) => {

  const {
    projectname,
    projectdescription,
    projectskills,
    projectlocation,
    projectwebsite,
    projectreward,
    projectamount,
    projectowner,
    _id
  } = project;

  return (
    <div className='projectitem-box'>
      <div className='pi-projectname'>
        <h2>{projectname}{' - '}<span>{projectreward}</span>{' '}<Link to={`/project/${_id}`}>
        <Button className='button random'>See More</Button></Link></h2>
      </div>
      <h4>{projectowner}</h4>
      <div className='pi-projectdescription'>
        <p>{projectdescription}</p>
      </div>
      <br/>
      <div className='pi-projectskills'>
        {projectskills && projectskills.map((skill, index) => (
          <>
            <div key={index}>
                <p><i class="fas fa-check"></i> {' '}{skill}</p>
            </div>
          </>
        ))}
      </div>

      <div className='pi-projectlocation'>
        {projectlocation ? <h4>{projectlocation}</h4> : <h4>Remote</h4>}
      </div>

    </div>
  )
}

export default ProjectItem
