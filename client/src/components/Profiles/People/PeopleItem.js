import React, {useEffect, useState} from 'react'

// UI & CSS
import styled from 'styled-components';
import placeholder from '../../UI/placeholder.png'

//UI
import Button from '../../UI/Button'
import {Link} from 'react-router-dom'

const PeopleItem = ({profileData}) => {

  const {
    username,
    profilename,
    status,
    skills,
    profileimage,
    loading} = profileData;

  return (
    <ProfileItemBox>
    <LinkCover to={`/@${username}`}>
        <ProfileItemTop>
          <h3 style={{margin: '5px'}}>{profilename}</h3>
            <p>@{username}</p>
        </ProfileItemTop>

        <ProfileImageCover>
          {profileData && profileimage ? <ProfileImage alt='Profile'  src={`${new Buffer(profileimage, 'base64')}`}/>: <ProfileImage alt='Profile' src={placeholder}/>}
        </ProfileImageCover>

      </LinkCover>
      <br/>

      <ProfileItemStatus>
        <em>{status}</em>
      </ProfileItemStatus>
        <>
        {skills.length > 0 && (
          <ProfileItemSkills>
            {skills.map((skill, index) => (
              <>
              <SkillButton>{' '}{skill}</SkillButton>
              </>
            ))}
          </ProfileItemSkills>)}
        </>

          <Link to={`/@${username}`}><Button
            className='button random'>
          View Profile</Button></Link>
    </ProfileItemBox>
  )
}

export default PeopleItem;

const ProfileItemBox = styled.div`
  display: grid;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  height: fit-content;
  padding: 0.5rem;
  box-shadow: 0 2px 5px grey;
  background: #C4C4C4;
  border-radius: 18px;
  background-color: white;
  overflow: hidden;
  z-index: 1;
`;

const ProfileItemTop = styled.div`
`;

const LinkCover = styled(Link)`
  text-decoration: none;
  color: black;
`;

const ProfileImageCover = styled.div`
  width: 6rem;
  height: 6rem;
  border: 2px solid black;
  margin-bottom: 10px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 180px;
  background-color: black;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 180px;
  object-fit: cover;
`;

const ProfileItemSkills = styled.div`
  display: grid;
  box-sizing: border-box;
  border-radius: 18px;
  grid-template-columns: repeat(3, 2fr);
  grid-auto-rows: 3rem;
  margin-top: 5px;
  margin-bottom: 10px;
  text-align: left;
  height: fit-content;
  overflow: visible;
`;

const SkillButton = styled(Button)`
  font-size: 0.7rem;
  margin: 1px;
  border: 0;
  border-radius: 8px;
`;

const ProfileItemStatus = styled.div`
  box-sizing: border-box;
  border-radius: 12px;
  width: min-content;
  padding: 1px;
  margin-left: auto;
  margin-right: auto;
`;
