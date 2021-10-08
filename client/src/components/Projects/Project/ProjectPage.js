import React, {useState, useEffect} from 'react'

//UI & CSS
import './ProjectPage.css'
import Spinner from '../../UI/Spinner'
import Button from '../../UI/Button'
import Error404 from '../../UI/Error404'
import eth from '../../UI/crypto-icons/eth.svg'
import btc from '../../UI/crypto-icons/btc.svg'
import sol from '../../UI/crypto-icons/sol.svg'
import bnb from '../../UI/crypto-icons/bnb.svg'
import usdt from '../../UI/crypto-icons/usdt.svg'
import usdc from '../../UI/crypto-icons/usdc.svg'

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

  const projecticon = () => {
    if (project.projectreward === 'ETH') {
      return eth
    }

    if (project.projectreward  === 'BTC') {
    return btc
    }

    if (project.projectreward  === 'SOL') {
      return sol
    }

    if (project.projectreward  === 'USDC') {
      return usdc
    }

    if (project.projectreward  === 'USDT') {
      return usdt
    }

    if (project.projectreward  === 'BNB') {
      return bnb
    }
  }

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
          {project.projectreward && project.projectamount ?
              <>
              <p><img src={projecticon()}
                           width='21px'
               />{' '}{project.projectamount}{' '}{project.projectreward}</p></> : null}
           <>{' '}</>
            <>
            {project.projectlocation ? <span>{project.projectlocation}</span> : <span><i className="fas fa-globe location-icon"></i>{' '}Remote</span>}
            </>
            <>
            {project.projectduration && <span>{project.projectduration}</span>}
            </>
          </div>
          <hr/>
          <div className='pp-description'>
            {project.projectdescription && project.projectdescription}
          </div>
          <hr/>
          <div className='pp-skills'>
          {project.projectskills.map((skill, index) => (
            <>
              <div key={index}>
                  <Button className='show'>{' '}{skill}</Button>
              </div>
            </>
          ))}
          </div>

          <div className='pp-bottom-section'>
            <Button className='button primary'>
            Apply</Button>
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
