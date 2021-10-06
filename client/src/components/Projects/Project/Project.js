import React, {useState, useEffect} from 'react'

//UI & CSS
// import './Project.css'
import Spinner from '../../UI/Spinner'
import Error404 from '../../UI/Error404'

//Redux & Router
import {getProjectById} from '../../../redux/actions/project';
import {connect} from 'react-redux';

const Project = ({project: {project, projectname}, match, getProjectById}) => {

  const [loadProject, setLoadProject] = useState(false);

  useEffect(() => {
    getProjectData();
  }, [])

  const getProjectData = async () => {
    await getProjectById(match.params.id);
    setLoadProject(true);
    console.log(project);
  }

  return (
    <div>
      {!loadProject ? <Spinner/> :
        <>
        {project ? projectname : <Error404/>}
        </>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  project: state.project
})
export default connect(mapStateToProps, {getProjectById})(Project)
