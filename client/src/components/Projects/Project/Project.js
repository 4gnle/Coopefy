import React, {useEffect} from 'react'

import {getProjectById} from '../../../redux/actions/project';

const Project = ({project: {project, projectname}, match, getProjectById}) => {

  useEffect(() => {
    getProjectById(match.params.id);
  }, [getProjectById])

  return (
    <div>
      {project && projectname}
    </div>
  )
}

const mapStateToProps = state => ({
  project: state.project
})
export default (mapStateToProps, {getProjectById})(Project)
