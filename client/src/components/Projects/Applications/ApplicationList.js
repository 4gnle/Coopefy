import React, {useEffect, useState} from 'react'

// UI & CSS
import styled from "styled-components";
import Button from "../../UI/Button";
import Spinner from "../../UI/Spinner";

const ApplicationsBox = styled.div`
  position: static;
  display: block;
  align-items: center;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  width: 90%;
  height: fit-content;
  padding: 0.5rem;
  box-shadow: 0 0px 5px grey;
  border-radius: 18px;
  overflow: hidden;
  z-index: 1;

  @media (max-width: 650px) {
    position: absolute;
    box-shadow: 0 0 0 0;
    width: 100%;
    top: 60%;
  }
`
const Title = styled.h1`
  text-align: center;
  font-size: 1.5rem;
`;

const Application = styled.div`
  box-sizing: border-box;
  margin-top: 1px;
  margin-bottom: 1px;
  padding: 1rem;
  width: auto;
  height: auto;
  background-color: #EEEEEE;
  border: 1px solid #lightgray;
  border-radius: 18px;
`;

const ApplicationText = styled.div`

`;

const ApplicantInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: fit-content;
  grid-gap: 0rem;
  width: 100%;
  margin-left: 5%;
  margin-top: -5px;
`;

const ApplicantImage = styled.div`
  padding: 1.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 180px;
  background-color: black;
`;

const NoApplications = styled.p`
  font-size: 1rem;
  text-align: center;
`

const ApplicationList = ({applications}) => {

  useEffect(() => {

  })

  return (
    <ApplicationsBox>
      <Title>Applications</Title>

      {applications.length > 0 ? applications.map(application => (
        <>
          <ApplicantInfo>
          {application.applicantname}
          </ApplicantInfo>
          <Application>
            {application.application}
          </Application>
        </>
      )) : <NoApplications>There are no applications yet - you're lucky! {':)'}</NoApplications>
    }

    </ApplicationsBox>
  )
}

export default ApplicationList
