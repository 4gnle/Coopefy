import React, {useEffect} from 'react'

// UI & CSS
import styled from "styled-components";
import Button from "../../UI/Button";
import Spinner from "../../UI/Spinner";

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

const ApplicationItem = ({application}) => {

  const {
    applicantname,
    applicantid,
    applicationtext,
    applicationdate
  } = application;

  return (
    <ApplicationBox>
      <ApplicantInfo>
      {applicantname}
      </ApplicantInfo>

      <ApplicationText>
        {applicationtext}
      </ApplicationText>
    </ApplicationBox>
  )
}

export default ApplicationItem
