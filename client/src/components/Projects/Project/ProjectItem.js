import React, {useEffect, useState} from 'react'

//UI && CSS
import Button from '../../UI/Button'
import styled from 'styled-components';
import eth from '../../UI/crypto-icons/eth.svg'
import btc from '../../UI/crypto-icons/btc.svg'
import sol from '../../UI/crypto-icons/sol.svg'
import bnb from '../../UI/crypto-icons/bnb.svg'
import usdt from '../../UI/crypto-icons/usdt.svg'
import usdc from '../../UI/crypto-icons/usdc.svg'

// Redux and Router
import {Link} from 'react-router-dom'

const ProjectItem = ({projectData}) => {

  const [projectName, setProjectName] = useState();
  const {
    projectname,
    projectdescription,
    projectskills,
    projectlocation,
    projectreward,
    _id
  } = projectData;

  useEffect(() => {
    if(projectname) {
      let newName = projectname;
      newName = newName.replace(/\s+/g, '-').toLowerCase();
      setProjectName(newName);
    }
  }, [projectname])

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
    <ProjectItemBox>
      <ProjectItemSeparator/>
      <ProjectItemLink to={`/project/${_id}/${projectName}`}>
      <ProjectItemName>
        {projectName &&
        (<><h3>{projectname}{' - '}
        {projectreward ?       <ProjectItemTitleIcon src={projecticon()}
                width='21px'
                height='21px'
              /> : null}
        {projectlocation ? <ProjectItemTitleDetails>{' - '}<ProjectItemLocationIcon>{projectlocation}</ProjectItemLocationIcon></ProjectItemTitleDetails> : <span>{' - '}<i className="fas fa-globe location-icon"></i>{' '}Remote</span>}
        </h3></>)}
      </ProjectItemName>
      </ProjectItemLink>

      <ProjectItemDescription>
        <p>{projectdescription}</p>
      </ProjectItemDescription>
      <br/>
      <ProjectItemSkills>
        {projectskills && projectskills.map((skill, index) => (
            <div key={index}>
                <SkillButton className=' show'>{' '}{skill}</SkillButton>
            </div>
        ))}
      </ProjectItemSkills>
    <br/>
    </ProjectItemBox>
  )
}

export default ProjectItem;

const ProjectItemBox = styled.div`
  box-sizing: border-box;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25), 1px 0px 1px rgba(0, 0, 0, 0.25);
  border-radius: 6px;
  width: 80%;
  height: fit-content;
  margin-left: auto;
  margin-right: auto;
  padding: 5px;

  @media (max-width: 650px){
    height: fit-content;
    width: 100%;
    box-sizing: content-box;
    box-shadow: 0 0 0 0;
    margin-left: -2%;
  }
`;

const ProjectItemSeparator = styled.hr`
display: none;

@media (max-width: 650px) {
  display: block;
  opacity: 0.25;
  width: 106%;
  margin-left: -0.5%;
}
`;

const ProjectItemLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

const ProjectItemName = styled.div`
width: 80%;
margin-left: 5%;
`;

const ProjectItemTitleDetails = styled.span`
    opacity: 0.5;
`;

const ProjectItemTitleIcon = styled.img`
  position: relative;
  top: 5px;
`;

const ProjectItemLocationIcon = styled.div`
  position: relative;
  top: 1px;
`;

const ProjectItemDescription = styled.div`
width: 90%;
height: 40px;
margin-left: 5%;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
font-size: 14px;
padding: 5px;
`;

const ProjectItemSkills = styled.div`
display: grid;
grid-template-columns: repeat(6, 1fr);
grid-auto-rows: 2rem;
grid-gap: 1rem;
width: 90%;
margin-left: 5%;
font-size: 14px;

@media (max-width: 650px) {
  display: grid;
  grid-template-columns: repeat(3, 2fr);
  grid-auto-rows: 2rem;
  grid-gap: 2rem;
  width: 90%;
  margin-left: 5%;
  font-size: 10px;
}
`;

const SkillButton = styled(Button)`
  font-size: 0.7rem;
  margin: 1px;
  border: 0;
  border-radius: 8px;
  width: max-content;
`;
