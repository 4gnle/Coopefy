import React, { useState, useEffect } from "react";

import "./CreateProfile.css";

//Components
import SkillsandSocials from "./Skills and Socials/SkillsandSocials";
import Error404 from "../../UI/Error404";

//Redux
import {
  profileData,
  getProfile,
  setProfileSkills,
  profileLinks,
} from "../../../redux/actions/profile";
import { connect } from "react-redux";
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
  profile: { signedprofile, loading },
  getProfile,
  profileData,
  history,
  setProfileSkills,
  profileLinks,
  authenticate: { isAuth },
}) => {
  const [formData, setFormData] = useState(initialState);

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
    await setProfileSkills(skillsData, signedprofile ? true : false);
    await profileLinks(linksData);
    profileData(formData);
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
            <div className="createprofile-edit-box">
              <ImageUpload />
              <div className="createprofile-top-inputs">
                <label>Name</label>
                <div className="createprofile-top-inputs-name">
                  <input
                    placeholder="First and last name"
                    className="m-1"
                    onChange={(e) => onChange(e)}
                    value={profilename}
                    name="profilename"
                  ></input>
                </div>

                <div className="createprofile-top-inputs-status">
                  <label>Status</label>
                  <select
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
                  </select>
                </div>
              </div>

              <div className="createprofile-bottom-inputs">
                <label>Bio</label>
                <textarea
                  maxLength="250"
                  cols="30"
                  rows="5"
                  type="text"
                  placeholder="Write about yourself (250 characters)"
                  className=""
                  onChange={(e) => onChange(e)}
                  value={bio}
                  name="bio"
                ></textarea>

                <label>Location</label>
                <input
                  placeholder="State/City + Country  (eg. California, US)"
                  onChange={(e) => onChange(e)}
                  value={location}
                  name="location"
                ></input>

                <label>Website</label>
                <input
                  placeholder="Personal website (www.example.com)"
                  className=""
                  onChange={(e) => onChange(e)}
                  value={website}
                  name="website"
                ></input>
              </div>
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
              <div className="createprofile-buttons">
                <Button className="button bad" onClick={goBack}>
                  Cancel
                </Button>
                <Button className="button primary" onClick={(e) => onSubmit(e)}>
                  Save
                </Button>
              </div>
            </div>
          ) : (
            <Error404 />
          )}
        </>
      )}
    </>
  );
};

CreateProfile.propTypes = {
  profileData: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  authenticate: state.authenticate,
});

export default connect(mapStateToProps, {
  getProfile,
  profileData,
  setProfileSkills,
  profileLinks,
})(CreateProfile);
