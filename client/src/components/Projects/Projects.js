import React, {useEffect} from 'react'

//Redux
import {getProjects} from '../../redux/actions/project';
import {connect} from 'react-redux';

const Projects = ({project: projects, getProjects}) => {

  useEffect(() => {
    if (projects) {
      getProjects();
    }
  }, [getProjects])

  return (
    <div className='projects-page'>

    <div>{projects.length > 0 && projects.map(project1 => (
      <>
      <h1>{project1.projectname}</h1>
      </>
    ))}</div>

    </div>
  )
}

const mapStateToProps = state => ({
  project: state.project
})

export default connect(mapStateToProps, {getProjects})(Projects)
