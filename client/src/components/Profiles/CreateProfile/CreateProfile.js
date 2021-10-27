import React, { useState, useEffect } from "react";

import styled from 'styled-components';

//Components
import SkillsandSocials from "./Skills and Socials/SkillsandSocials";
import Error404 from "../../UI/Error404";

//Redux
import {
  profileEdit,
  getProfile,
  setProfileSkills,
  profileLinks,
} from "../../../redux/actions/profile";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

//UI
import Button from "../../UI/Button";
import Spinner from "../../UI/Spinner";
import ImageUpload from "../../UI/ProfileImage";

const initialState = {
  status: "",
  profilename: "",
  location: "",
  bio: "",
  website: "",
};

const stateSkills = {
  skills: "",
};

const stateLinks = {
  twitter: "",
  dribbble: "",
  behance: "",
  producthunt: "",
  instagram: "",
  linkedin: "",
  facebook: "",
  github: "",
};

const CreateProfile = ({
  history
}) => {
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();

  const profileData = useSelector(state => state.profile);
  const authData = useSelector(state => state.authenticate);

  const {signedprofile, loading} = profileData;
  const {isAuth} = authData;

  const [skillsData, setSkillsData] = useState(stateSkills);
  const [linksData, setLinksData] = useState(stateLinks);

  useEffect(() => {
    if (!signedprofile) getProfile();
    if (!loading && signedprofile) {
      const profileData = { ...initialState };
      for (const key in signedprofile) {
        if (key in profileData) profileData[key] = signedprofile[key];
      }
      setFormData(profileData);
    }
  }, [loading, getProfile, signedprofile]);

  const { status, profilename, location, bio, website } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const setSkills = (skills) => {
    setSkillsData(skills);
  };

  const setLinks = (links) => {
    setLinksData(links);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await dispatch(setProfileSkills(skillsData, signedprofile ? true : false));
    await dispatch(profileLinks(linksData));
    dispatch(profileEdit(formData));
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {signedprofile && isAuth ? (
            <EditBox>
              <ImageUpload />
              <TopInputBox>
                <TopLabel>Name</TopLabel>
                  <TopNameInput
                    placeholder="First and last name"
                    onChange={(e) => onChange(e)}
                    value={profilename}
                    name="profilename"
                  />

                  <TopLabel>Status</TopLabel>
                  <TopStatusSelect
                    name="status"
                    onChange={(e) => onChange(e)}
                    value={status}
                  >
                    <option value="" disabled selected hidden>
                      Choose Status
                    </option>
                    <option value="Looking">Looking</option>
                    <option value="Building">Building</option>
                    <option value="Collaborating">Collaborating</option>
                    <option value="Learning">Learning</option>
                    <option value="Teaching">Teaching</option>
                  </TopStatusSelect>
              </TopInputBox>

              <BottomInputBox>
                <BottomLabel>Bio</BottomLabel>
                <BottomTextArea
                  maxLength="250"
                  cols="30"
                  rows="5"
                  type="text"
                  placeholder="Write about yourself (250 characters)"
                  className=""
                  onChange={(e) => onChange(e)}
                  value={bio}
                  name="bio"
                />

                <BottomLabel>Location</BottomLabel>
                <BottomInput
                  placeholder="State/City + Country  (eg. California, US)"
                  onChange={(e) => onChange(e)}
                  value={location}
                  name="location"
                />

                <BottomLabel>Website</BottomLabel>
                <BottomInput
                  placeholder="Personal website (www.example.com)"
                  className=""
                  onChange={(e) => onChange(e)}
                  value={website}
                  name="website"
                />
              </BottomInputBox>

              <div className="createprofile-skillsandsocials">
                <SkillsandSocials
                  skillsData={skillsData}
                  stateSkills={stateSkills}
                  setSkills={setSkills}
                  linksData={linksData}
                  stateLinks={stateLinks}
                  setLinks={setLinks}
                />
              </div>
              <Buttons>
                <Button className="button bad" onClick={goBack}>
                  Cancel
                </Button>
                <Button className="button primary" onClick={(e) => onSubmit(e)}>
                  Save
                </Button>
              </Buttons>
            </EditBox>
          ) : (
            <Error404 />
          )}
        </>
      )}
    </>
  );
};

export default CreateProfile;

const EditBox = styled.div`
  height: auto;
  max-width: 50%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  padding: 2rem;
  text-align: center;
  background: #C4C4C4;
  border-radius: 28px;
  box-shadow: 0 2px 12px grey;
  background-color: white;
  overflow: hidden;
  z-index: 1;

  @media (max-width: 650px) {
    position: absolute;
    top: 10%;
    left: 0;
    right: 0;
    margin: auto;
    max-width: 90%;
    box-shadow: 0 0 0;
  }
`;

const TopLabel = styled.label`
  font-size: 1rem;
  font-weight: bold;
  margin-left: 0px;
  margin-bottom: 5px;
  float:left;
`;

const TopInputBox = styled.div`
  float: right;
  margin-top: -10vh;
  width: 60%;

  @media (max-width: 650px) {
    margin-right: 0px;
    margin-top: 0;
    float: none;
    width: 100%;
  }
`;

const TopNameInput = styled.input`
  border-radius: 6px;
  border: 1px solid #000000;
  box-sizing: border-box;
  width: 100%;
  height: 25%;
  padding: 5px;
  font-size: 1rem;
  float: left;
  margin-bottom: 10px;
`;

const TopStatusSelect = styled.select`
  display: inline-block;
  border-radius: 6px;
  border: 1px solid #000000;
  background-color: white;
  box-sizing: border-box;
  width: 100%;
  height: 25%;
  font-size: 1rem;
  padding: 5px;
  margin-top: 0px;
`;

const BottomInputBox = styled.div`
  margin-top: 55px;
  float: center;

  @media (max-width: 650px) {
    margin-top: 25px;
  }
`;

const BottomLabel = styled.label`
  font-size: 1rem;
  font-weight: bold;
  float:left;
`;

const BottomInput = styled.input`
  border-radius: 6px;
  border: 1px solid #000000;
  box-sizing: border-box;
  margin-bottom: 20px;
  width: 100%;
  height: 25%;
  font-size: 1rem;
  padding: 5px;
`;

const BottomTextArea = styled.textarea`
  resize: none;
  margin-bottom: 20px;
  border-radius: 6px;
  background: white;
  border: 1px solid #000000;
  box-sizing: border-box;
  width: 100%;
  left: 350px;
  font-size: 1rem;
  font-family: 'Nunito';
  padding: 5px;
`;

const Buttons = styled.div`
  margin-top: 20%;
  text-align: center;
`;
