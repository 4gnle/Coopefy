import React, {useEffect} from 'react'

import './Projects.css'

//Components
import ProjectItem from './Project/ProjectItem'

//Redux and Router
import {getProjects} from '../../redux/actions/project';
import {connect} from 'react-redux';

const Projects = ({project: {project, projects, loading},
   getProjects}) => {

  useEffect(() => {
    if (!project) {
      getProjects();
      console.log(projects);
    }
  }, [getProjects])

  return (
    <div className='projects-page'>
      <div className='projects-top'>
        <h1>Projects</h1>
        <p>
          <i class="fas fa-project-diagram"></i>{' '}
          Find the best project to work on!
        </p>
      </div>
      <div className='projects-grids'>{! loading && projects.length > 0 ? (projects.map(project =>
        <>
        <ProjectItem
          project={project}
        />
        </>
      )): null}</div>
    </div>
  )
}

const mapStateToProps = state => ({
  project: state.project
})

export default connect(mapStateToProps, {getProjects})(Projects)
