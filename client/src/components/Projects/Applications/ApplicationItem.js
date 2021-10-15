import React, {useEffect} from 'react'

// UI & CSS
import styled from "styled-components";
import Button from "../../UI/Button";
import Spinner from "../../UI/Spinner";

//Redux & Router
import {} from "../../../redux/actions/project";
import {getProfileByUsername} from "../../../redux/actions/project";
import {connect} from "react-redux";

const ApplicationItem = ({application}) => {

  const {
    applicantname,
    applicantusername,
    applicantid,
    applicationtext,
    applicationdate
  } = application;

  return (
    <ApplicationBox>
      <ApplicantInfo>
        <ApplicantName>
          {applicantname}{' '}
        <ApplicantUsername>
          @{applicantusername}
        </ApplicantUsername>
        </ApplicantName>
      </ApplicantInfo>

      <ApplicationText>
        {applicationtext}
      </ApplicationText>
    </ApplicationBox>
  )
}

export default ApplicationItem

const ApplicationBox = styled.div`
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
  margin-left: 2%;
  padding: 5px;
`;

const ApplicantInfo = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: fit-content;
  grid-gap: 0rem;
  width: 100%;
  margin-left: 2.5%;
  margin-top: -5px;
  margin-bottom: 10px;
`;

const ApplicantName = styled.h2`
  font-size: 1rem;
`
const ApplicantUsername = styled.span`
  font-weight: normal;
`

const ApplicantImage = styled.div`
  padding: 1.5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 180px;
  background-color: black;
`;
