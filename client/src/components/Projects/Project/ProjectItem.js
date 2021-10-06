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
    _id
  } = project;

  return (
    <div className='projectitem-box'>
      <div className='pi-projectname'>
        <h2>{projectname}{' '}<Link to={`/project/${_id}`}><Button>See More</Button></Link></h2>
      </div>
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

      <div className='pi-projectreward'>
        <h3>{projectreward}{' '}{projectamount}</h3>
      </div>

      <div className='pi-projectlocation'>
        {projectlocation ? projectlocation : <h3>Worldwide</h3>}
      </div>

    </div>
  )
}

export default ProjectItem
