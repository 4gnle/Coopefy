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
import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = ({match, history}) => {

  const [profileLoaded, setProfileLoaded] = useState(false);

  const dispatch = useDispatch();

  const profileData = useSelector(state => state.profile);
  const isAuthenticated = useSelector(state => state.authenticate)

  const {
    profile
  } = profileData;

  const {
    isAuth,
    userData
  } = isAuthenticated;

  useEffect(() => {
    loadProfile();
  }, [profileData]);

  const loadProfile = async () => {
    await dispatch(getProfileByUsername(match.params.username));
    setProfileLoaded(true);
  }

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
                {isAuth && profile.user && userData._id === profile.user._id && (
                  <Link to="/edit-profile">
                    <Button className="button random">Edit Profile</Button>
                  </Link>
                )}
              </TopButtons>

              <ProfileMain>
                <ProfileMainData>
                  {profile && !profile.profileimage ? (
                      <ProfileImg src={placeholder} />
                  ) : (
                      <ProfileImg src={`${new Buffer(profile.profileimage, "base64")}`} />
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
                  {profile && !profile.profilename ? (
                    <>
                      <div className="no-profile-name">
                        No profile name
                        {isAuth && userData._id === profile.user._id && (
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
                          <ProfileName>{profile.profilename}</ProfileName>
                          &nbsp;&nbsp;
                          <ProfileUsername>@{profile.username}</ProfileUsername>
                        </p>
                      )}
                      <em>{profile.bio}</em>
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
                      {isAuth && userData._id === profile.user._id && (
                        <Link to="edit-profile">
                          <Button className="button small">Add Skills</Button>
                        </Link>
                      )}
                    </div>
                  </>
                ) : null}

                {profile && profile.skills.length > 0 &&
                  profile.skills.map((skill, index) => (
                    <>
                      <Skills key={index}>
                        <Button className="show"> {skill}</Button>
                      </Skills>
                    </>
                  ))}
              </ProfileSkills>

              <ProfileLinks>
                <ProfileIconSection>

                  {profile.sociallinks.producthunt && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      to={{
                        pathname: `https://www.producthunt.com/${profile.sociallinks.producthunt}`,
                      }}
                    >
                      <Icon className="fab fa-product-hunt"></Icon>
                    </Link>
                  )}

                  {profile.sociallinks.github && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      to={{
                        pathname: `https://www.github.com/${profile.sociallinks.github}`,
                      }}
                    >
                      <Icon
                        style={{ color: "black" }}
                        className="fab fa-github-square"
                      ></Icon>
                    </Link>
                  )}

                  {profile.sociallinks.twitter && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      to={{
                        pathname: `https://www.twitter.com/${profile.sociallinks.twitter}`,
                      }}
                    >
                      <Icon className="fab fa-twitter-square"></Icon>
                    </Link>
                  )}

                  {profile.sociallinks.instagram && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      to={{
                        pathname: `https://www.instagram.com/${profile.sociallinks.instagram}`,
                      }}
                    >
                      <Icon className="fab fa-instagram-square"></Icon>
                    </Link>
                  )}

                  {profile.sociallinks.behance && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "black" }}
                      to={{
                        pathname: `https://www.behance.net/${profile.sociallinks.behance}`,
                      }}
                    >
                      <Icon className="fab fa-behance-square"></Icon>
                    </Link>
                  )}

                  {profile.sociallinks.dribbble && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      to={{
                        pathname: `https://www.dribbble.com/${profile.sociallinks.dribbble}`,
                      }}
                    >
                      <Icon className="fab fa-dribbble-square"></Icon>
                    </Link>
                  )}

                  {profile.sociallinks.linkedin && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      to={{
                        pathname: `https://www.linkedin.com/${profile.sociallinks.linkedin}`,
                      }}
                    >
                      <Icon className="fab fa-linkedin-square"></Icon>
                    </Link>
                  )}

                  {profile.sociallinks.facebook && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      to={{
                        pathname: `https://www.facebook.com/${profile.sociallinks.facebook}`,
                      }}
                    >
                      <Icon className="fab fa-facebook-square"></Icon>
                    </Link>
                  )}
                </ProfileIconSection>

                <ProfileWebsite>
                  {profile && profile.website ? (
                    <>
                      <ProfileWebsite
                        target="_blank"
                        rel="noreferrer noopener"
                        href={`${profile.website}`}
                      >
                        Website
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

export default Profile;
