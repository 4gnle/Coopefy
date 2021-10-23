import React, {useState, useEffect} from 'react'

// UI & CSS
import './ProjectsList.css'
import Spinner from '../UI/Spinner'

//Components
import ProjectItem from './Project/ProjectItem'

//Redux and Router
import {getProjects} from '../../redux/actions/project';
import {connect} from 'react-redux';

const Projects = ({
  project: {projects, loading},
  getProjects}) => {

  const [projectsReady, setProjectsReady] = useState(false);

  useEffect(() => {
    gettingProjects();
  }, [getProjects])

  const gettingProjects = async () => {
    await getProjects();
    setProjectsReady(true)
  }

  return (<div className='projects-page'>
    <div className='projects-top'>
      <h1>Projects</h1>
      <p>
        <i class="fas fa-project-diagram"></i>{' '}
        Find the best projects to collaborate!
      </p>
    </div>
    {
      !projectsReady
        ? <Spinner/>
        : <div className='projects-grids'>
            {
              !loading && projects.length > 0
                ? (projects.map(project => <> <ProjectItem projectData =
                  {project}/> </>))
                : null
            }
          </div>
    }
  </div>)
}

const mapStateToProps = state => ({project: state.project})

export default connect(mapStateToProps, {getProjects})(Projects);
