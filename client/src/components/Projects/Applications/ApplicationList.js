import React, {useEffect, useState} from 'react'

// UI & CSS
import styled from "styled-components";
import Button from "../../UI/Button";
import Spinner from "../../UI/Spinner";

//components
import ApplicationItem from "./ApplicationItem"

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

      {applications && applications.length > 0 ? applications.map(application => (
        <>
          <ApplicationItem
            application={application}
          />
        </>
      )) : <NoApplications>There are no applications yet - you're lucky! {':)'}</NoApplications>
    }

    </ApplicationsBox>
  )
}

export default ApplicationList
