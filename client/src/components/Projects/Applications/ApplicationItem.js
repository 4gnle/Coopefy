import React, {useEffect, useState} from 'react'

// UI & CSS
import styled from "styled-components";
import Button from "../../UI/Button";
import Spinner from "../../UI/Spinner";
import placeholder from '../../UI/placeholder.png'

//Redux & Router
import {getProfileByUsername} from "../../../redux/actions/profile";
import {useDispatch, useSelector} from "react-redux";

const ApplicationItem = ({
  projectowner,
  application,
  getProfileByUsername}) => {

  const applicantProfile = useSelector(state => state.profile.profile)

  const isAuthenticated = useSelector(state => state.authenticate.isAuth);

  const dispatch = useDispatch();

  const gettingApplicantProfile = () => {
    dispatch(getProfileByUsername);
  }

  const {
    applicantname,
    applicantusername,
    applicantid,
    applicationtext,
    applicationdate
  } = application;

  const [imagePrev, setImagePrev] = useState();

  const [loadedItem, setLoadedItem] = useState(false);

  const loadProfile = async () => {
    await gettingApplicantProfile(applicantusername);
    console.log(applicantProfile);
    setLoadedItem(true);
  }

  useEffect(() => {
    loadProfile();

    if (loadedItem) {
      const fileContents = new Buffer(applicantProfile.profileimage, "base64");
      setImagePrev(fileContents);
    }
  }, [getProfileByUsername, application, loadedItem])

  const hirePerson = () => {
    console.log(applicantusername);
  }

  return (
    <ApplicationBox>
      <ApplicantInfo>
        <ApplicantPicture src={imagePrev}/>
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
      {isAuthenticated &&
        <SelectApplicant
          className='button primary'
          onClick={hirePerson}
        >
          Hire
        </SelectApplicant>
      }
    </ApplicationBox>
  )
}

export default ApplicationItem;

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
  display: inline;
  margin-left: 2.5%;
  margin-top: -5px;
  margin-bottom: 10px;
`;

const ApplicantPicture = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 180px;
  background-color: black;
`

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

const SelectApplicant = styled(Button)`
`
