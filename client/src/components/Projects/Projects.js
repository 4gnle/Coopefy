import React, {useEffect} from 'react'


import './Projects.css'

//Components
import ProjectItem from './Project/ProjectItem'

//Redux
import {getProjects} from '../../redux/actions/project';
import {connect} from 'react-redux';

const Projects = ({project: {project, projects, projectname, projectlocation, projectskills, loading}, getProjects}) => {

  useEffect(() => {
    if (!project) {
      getProjects();
    }
  }, [getProjects])

  return (
    <div className='projects-page'>
    <div>{! loading && projects.length > 0 ? (projects.map(project1 =>
      <>
      <h1>Name:</h1><p>{project1.projectname}</p>
      </>
    )): null}</div>

    </div>
  )
}

const mapStateToProps = state => ({
  project: state.project
})

export default connect(mapStateToProps, {getProjects})(Projects)
