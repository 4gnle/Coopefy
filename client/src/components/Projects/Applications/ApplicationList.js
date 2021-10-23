import React, {useEffect, useState} from 'react'

// UI & CSS
import styled from "styled-components";
import Button from "../../UI/Button";
import Spinner from "../../UI/Spinner";

//components
import ApplicationItem from "./ApplicationItem"

const ApplicationList = ({project, applications}) => {

  return (
    <ApplicationsBox>
      <Title>Applications</Title>

      {applications && applications.length > 0 ? applications.map((application, index) => (
          <ApplicationItem
            application={application}
            projectowner={project.projectowner}
            key={index}
          />
      )) : <NoApplications>There are no applications yet - you're lucky! {':)'}</NoApplications>
    }

    </ApplicationsBox>
  )
}

export default ApplicationList

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
  border-radius: 18px;
  overflow: hidden;
  z-index: 1;

  @media (max-width: 650px) {
    position: absolute;
    box-shadow: 0 0 0 0;
    width: 100%;
    top: 55vh;
  }

  @media (max-width: 480px) {
    width: 96%;
    top: 60vh;
  };

  @media (max-width: 390px) {
    top: 65vh;
  };
`
const Title = styled.h1`
  text-align: center;
  font-size: 1.5rem;
`;

const NoApplications = styled.p`
  font-size: 1rem;
  text-align: center;
`
