import React, { useState, useEffect } from "react";

import "./Profile.css";

//UI & CSS
import Spinner from "../../UI/Spinner";
import Button from "../../UI/Button";
import Error404 from "../../UI/Error404";
import placeholder from "../../UI/placeholder.png";
import {
ProfileBox,
TopButtons,
ProfileMain,
ProfileTop,
ProfileName,
ProfileUsername,
ProfileMainData,
ProfileImg,
ProfileLinks,
ProfileIconSection,
ProfileWebsite,
Icon,
ProfileLocation,
ProfileSkills,
Skills} from './ProfileStyles';

//Redux and Router
import { getProfileByUsername } from "../../../redux/actions/profile";
import { cleanProfile } from "../../../redux/actions/profile";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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

const stateSkills = {
  skills: "",
};

const profileInfo = {
  status: "",
  username: "",
  profilename: "",
  location: "",
  bio: "",
  website: "",
};

const Profile = ({
  profile: {
    profile,
    loading,
    profileimage,
    bio,
    skills,
    username,
    website,
    sociallinks,
    location,
  },
  authenticate: { isAuth, user },
  getProfileByUsername,
  cleanProfile,
  match,
  history,
}) => {
  const [imagePrev, setImagePrev] = useState();
  const [socialLinks, setSocialLinks] = useState(stateLinks);
  const [skillsData, setSkillsData] = useState(stateSkills);
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    loadProfile();
  }, [getProfileByUsername, match.params.username]);

  const loadProfile = async () => {
    await cleanProfile();
    setImagePrev(false);
    await getProfileByUsername(match.params.username);
    setProfileLoaded(true);
  };

  useEffect(() => {
    if (profile && !loading && profile.profileimage) {
      const fileContents = new Buffer(profile.profileimage, "base64");
      setImagePrev(fileContents);
    }

    if (!loading && profile) {
      const profileLinks = { ...stateLinks };
      for (const key in profile.sociallinks) {
        if (key in profileLinks) profileLinks[key] = profile.sociallinks[key];
      }
      setSocialLinks(profileLinks);

      const profileSkills = { ...stateSkills };
      for (const key in profile) {
        if (key in profileSkills) profileSkills[key] = profile[key];
      }
      setSkillsData(profileSkills);

      const profileData = { ...profileInfo };
      for (const key in profile) {
        if (key in profileData) profileInfo[key] = profile[key];
      }
    }

    // eslint-disable-next-line
  }, [profile, loading, username, profileimage]);

  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      {!profileLoaded ? (
        <Spinner />
      ) : (
        <>
          {!profile ? (
            <Error404 />
          ) : (
            <ProfileBox>
              <TopButtons>
                <Button onClick={goBack} className="button bad">
                  Back
                </Button>
                {isAuth && profile.user && user._id === profile.user._id && (
                  <Link to="/edit-profile">
                    <Button className="button random">Edit Profile</Button>
                  </Link>
                )}
              </TopButtons>

              <ProfileMain>
                <ProfileMainData>
                  {profileLoaded && !imagePrev ? (
                    <>
                      <ProfileImg src={placeholder} />
                      <br />
                    </>
                  ) : (
                    <>
                      <ProfileImg src={imagePrev} />
                    </>
                  )}
                <ProfileLocation>
                  {profile.status ? (

                      <b>
                        <em>{profile.status}</em>
                      </b>
                  ) : null}
                  {profile.location ? (
                    <div className="profile-location">
                      <p>{profile.location}</p>
                    </div>
                  ) : null}
                </ProfileLocation>
              </ProfileMainData>

                <ProfileTop>
                  {profile && !profileInfo.profilename ? (
                    <>
                      <div className="no-profile-name">
                        No profile name
                        {isAuth && user._id === profile.user._id && (
                          <Link to="edit-profile">
                            <Button className="button small">Add Name</Button>
                          </Link>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {profile && (
                        <p>
                          <ProfileName>{profileInfo.profilename}</ProfileName>
                          &nbsp;&nbsp;
                          <ProfileUsername>@{profileInfo.username}</ProfileUsername>
                        </p>
                      )}
                      <em>{profileInfo.bio}</em>
                    </>
                  )}
                </ProfileTop>
              </ProfileMain>

              {!profile ? (
                <>
                  <div className="no-profile">
                    There's no profile to show
                    {isAuth && (
                      <Link to="edit-profile">
                        <Button className="button small">Edit Profile</Button>
                      </Link>
                    )}
                  </div>
                </>
              ) : null}

              <ProfileSkills>
                {profile && profile.skills.length === 0 ? (
                  <>
                    <div className="no-profile">
                      There are no skills show
                      {isAuth && user._id === profile.user._id && (
                        <Link to="edit-profile">
                          <Button className="button small">Add Skills</Button>
                        </Link>
                      )}
                    </div>
                  </>
                ) : null}

                {skillsData.skills.length > 0 &&
                  skillsData.skills.map((skill, index) => (
                    <>
                      <Skills key={index}>
                        <Button className="show"> {skill}</Button>
                      </Skills>
                    </>
                  ))}
              </ProfileSkills>

              <ProfileLinks>
                <ProfileIconSection>

                  {socialLinks.producthunt && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      to={{
                        pathname: `https://www.producthunt.com/${socialLinks.producthunt}`,
                      }}
                    >
                      <Icon className="fab fa-product-hunt"></Icon>
                    </Link>
                  )}

                  {socialLinks.github && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      to={{
                        pathname: `https://www.github.com/${socialLinks.github}`,
                      }}
                    >
                      <Icon
                        style={{ color: "black" }}
                        className="fab fa-github-square"
                      ></Icon>
                    </Link>
                  )}

                  {socialLinks.twitter && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      to={{
                        pathname: `https://www.twitter.com/${socialLinks.twitter}`,
                      }}
                    >
                      <Icon className="fab fa-twitter-square"></Icon>
                    </Link>
                  )}

                  {socialLinks.instagram && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      to={{
                        pathname: `https://www.instagram.com/${socialLinks.instagram}`,
                      }}
                    >
                      <Icon className="fab fa-instagram-square"></Icon>
                    </Link>
                  )}

                  {socialLinks.behance && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "black" }}
                      to={{
                        pathname: `https://www.behance.net/${socialLinks.behance}`,
                      }}
                    >
                      <Icon className="fab fa-behance-square"></Icon>
                    </Link>
                  )}

                  {socialLinks.dribbble && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      to={{
                        pathname: `https://www.dribbble.com/${socialLinks.dribbble}`,
                      }}
                    >
                      <Icon className="fab fa-dribbble-square"></Icon>
                    </Link>
                  )}

                  {socialLinks.linkedin && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      to={{
                        pathname: `https://www.linkedin.com/${socialLinks.linkedin}`,
                      }}
                    >
                      <Icon className="fab fa-linkedin-square"></Icon>
                    </Link>
                  )}

                  {socialLinks.facebook && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      to={{
                        pathname: `https://www.facebook.com/${socialLinks.facebook}`,
                      }}
                    >
                      <Icon className="fab fa-facebook-square"></Icon>
                    </Link>
                  )}
                </ProfileIconSection>

                <ProfileWebsite>
                  {profile && profileInfo.website ? (
                    <>
                      <ProfileWebsite
                        target="_blank"
                        rel="noopener noreferrer"
                        to={{ pathname: `${profileInfo.website}` }}
                      >
                        {profileInfo.website}
                      </ProfileWebsite>
                    </>
                  ) : null}
                </ProfileWebsite>
              </ProfileLinks>
            </ProfileBox>
          )}
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  authenticate: state.authenticate,
});

export default connect(mapStateToProps, { getProfileByUsername, cleanProfile })(
  Profile
);
