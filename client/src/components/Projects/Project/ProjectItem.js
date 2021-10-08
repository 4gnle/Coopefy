import React, {useEffect, useState} from 'react'

//UI && CSS
import Button from '../../UI/Button'
import './ProjectItem.css'

// Redux and Router
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';

const ProjectItem = ({project, profile: {username}}) => {

  const [projectName, setProjectName] = useState();

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

  useEffect(() => {
    if(projectname) {
      let newName = projectname;
      newName = newName.replace(/\s+/g, '-').toLowerCase();
      setProjectName(newName);
    }
  }, [username])

  return (
    <div className='projectitem-box'>
      <div className='pi-projectname'>
        {projectName && projectreward ?
        (<><h2>{projectname}{' - '}<span>{projectreward}</span>{' '}<Link to={`/project/${_id}/${projectName}`}>
        <Button className='button random'>Learn More</Button></Link></h2></>)
        : null}
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

      <div className='pi-projectlocation'>
        {projectlocation ? <h4>{projectlocation}</h4> : <h4>Remote</h4>}
      </div>

    </div>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps)(ProjectItem)
