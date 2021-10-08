import React, {useEffect, useState} from 'react'

//UI && CSS
import Button from '../../UI/Button'
import './ProjectItem.css'
import eth from '../../UI/crypto-icons/eth.svg'
import btc from '../../UI/crypto-icons/btc.svg'
import sol from '../../UI/crypto-icons/sol.svg'
import bnb from '../../UI/crypto-icons/bnb.svg'
import usdt from '../../UI/crypto-icons/usdt.svg'
import usdc from '../../UI/crypto-icons/usdc.svg'

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

  const projecticon = () => {
    if (projectreward === 'ETH') {
      return eth
    }

    if (projectreward === 'BTC') {
    return btc
    }

    if (projectreward === 'SOL') {
      return sol
    }

    if (projectreward === 'USDC') {
      return usdc
    }

    if (projectreward === 'USDT') {
      return usdt
    }

    if (projectreward === 'BNB') {
      return bnb
    }
  }

  return (
    <div className='projectitem-box'>
      <div className='pi-projectname'>
        {projectName &&
        (<><h2>{projectname}{' - '}
        {projectreward ?       <img src={projecticon()}
                width='24px'
                height='24px'
              /> : null}
        <Link to={`/project/${_id}/${projectName}`}>
        <Button className='button random'>Learn More</Button></Link></h2></>)}
      </div>
      <div className='pi-projectdescription'>
        <p>{projectdescription}</p>
      </div>
      <br/>
      <div className='pi-projectskills'>
        {projectskills && projectskills.map((skill, index) => (
          <>
            <div key={index}>
                <Button className='show'>{' '}{skill}</Button>
            </div>
          </>
        ))}
      </div>

      <div className='pi-projectbottom'>
        {projectlocation ? <h4>{projectlocation}</h4> : <h4>Remote</h4>}
      </div>

    </div>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps)(ProjectItem)
