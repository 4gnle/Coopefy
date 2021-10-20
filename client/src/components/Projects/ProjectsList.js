import React, {useState, useEffect} from 'react'

// UI & CSS
import './ProjectsList.css'
import Spinner from '../UI/Spinner'

//Components
import ProjectItem from './Project/ProjectItem'

//Redux and Router
import {getProjects} from '../../redux/actions/project';
import {useSelector, useDispatch} from 'react-redux';

const Projects = ({getProjects}) => {

  const [projectsReady, setProjectsReady] = useState(false);

  const dispatch = useDispatch()
  const projectsState = useSelector(state => state.project.projects)
  const loading = useSelector(state => state.project.loading)

  useEffect(() => {
    gettingProjects();
  }, [getProjects])

  const gettingProjects = async () => {
    await dispatch(getProjects);
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
              !loading && projectsState.length > 0
                ? (projectsState.map(project => <> < ProjectItem project = {
                  project
                } /> </>))
                : null
            }
          </div>
    }
  </div>)
}

export default Projects;
