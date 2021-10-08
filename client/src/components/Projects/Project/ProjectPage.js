import React, {useState, useEffect} from 'react'

//UI & CSS
import './ProjectPage.css'
import Spinner from '../../UI/Spinner'
import Error404 from '../../UI/Error404'

//Redux & Router
import {getProjectById} from '../../../redux/actions/project';
import {connect} from 'react-redux';

const Project = ({project: {
  project,
  loading}, match, getProjectById}) => {

  const [loadProject, setLoadProject] = useState(false);

  const getProjectData = async () => {
    await getProjectById(match.params.id);
    setLoadProject(true)
  }

  useEffect(() => {
    getProjectData();
  })

  return (
    <div>
      {!loadProject ? <Spinner/> :
        <>
        {project ?

        <div className='project-box'>

          <div className='pp-title'>
            <h2>{project.projectname}</h2>
          </div>
          <hr/>
          <div className='pp-details'>
           <p><b>{project.projectreward && <>{project.projectreward}</>}
           <>{' '}</>
           {project.projectamount && <>{project.projectamount}</>}</b></p>
            <>
            {project.projectlocation && <>{project.projectlocation}</>}
            </>
            <>
            {project.projectduration && <p>{project.projectduration}</p>}
            </>
          </div>
          <hr/>
          <div className='pp-description'>

          </div>
          <hr/>
          <div className='pp-skills'>

          </div>
        </div>
         : <Error404/>}
        </>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  project: state.project
})
export default connect(mapStateToProps, {getProjectById})(Project)
