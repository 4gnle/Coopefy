import React, { useState, useEffect } from "react";

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
SkillButton,
Skills} from './ProfileStyles';

//Redux and Router
import { getProfileByUsername } from "../../../redux/actions/profile";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = ({match, history}) => {

  const [profileLoaded, setProfileLoaded] = useState(false);

  const dispatch = useDispatch();

  const profileData = useSelector(state => state.profile);
  const isAuthenticated = useSelector(state => state.authenticate)

  const {
    profiledata
  } = profileData;

  const {
    isAuth,
    userData
  } = isAuthenticated;

  const loadProfile = async () => {
    await dispatch(getProfileByUsername(match.params.username));
    setProfileLoaded(true);
  }

  useEffect(() => {
    loadProfile();
  });

  const goBack = () => {
    history.goBack();
  };

  return (
    <>
      {!profileLoaded ? (
        <Spinner />
      ) : (
        <>
          {!profiledata ? (
            <Error404 />
          ) : (
            <ProfileBox>
              <TopButtons>
                <Button onClick={goBack} className="button bad">
                  Back
                </Button>
                {isAuth && profiledata.user && userData._id === profiledata.user._id && (
                  <Link to="/edit-profile">
                    <Button className="button random">Edit Profile</Button>
                  </Link>
                )}
              </TopButtons>

              <ProfileMain>
                <ProfileMainData>
                  {profiledata && !profiledata.profileimage ? (
                      <ProfileImg src={placeholder} />
                  ) : (
                      <ProfileImg src={`${new Buffer(profiledata.profileimage, "base64")}`} />
                  )}
                <ProfileLocation>
                  {profiledata.status ? (
                      <b>
                        <em>{profiledata.status}</em>
                      </b>
                  ) : null}
                  {profiledata.location ? (
                    <div className="profile-location">
                      <p>{profiledata.location}</p>
                    </div>
                  ) : null}
                </ProfileLocation>
              </ProfileMainData>

                <ProfileTop>
                  {profiledata && !profiledata.profilename ? (
                    <>
                      <div className="no-profile-name">
                        No profile name
                        {isAuth && userData._id === profiledata.user._id && (
                          <Link to="edit-profile">
                            <Button className="button small">Add Name</Button>
                          </Link>
                        )}
                      </div>
                    </>
                  ) : (
                    <>
                      {profiledata && (
                        <p>
                          <ProfileName>{profiledata.profilename}</ProfileName>
                          &nbsp;&nbsp;
                          <ProfileUsername>@{profiledata.username}</ProfileUsername>
                        </p>
                      )}
                      <em>{profiledata.bio}</em>
                    </>
                  )}
                </ProfileTop>
              </ProfileMain>

              {!profiledata ? (
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
                {profiledata && profiledata.skills.length === 0 ? (
                  <>
                    <div className="no-profile">
                      There are no skills show
                      {isAuth && userData._id === profiledata.user._id && (
                        <Link to="edit-profile">
                          <Button className="button small">Add Skills</Button>
                        </Link>
                      )}
                    </div>
                  </>
                ) : null}

                {profiledata && profiledata.skills.length > 0 &&
                  profiledata.skills.map((skill, index) => (
                    <>
                      <Skills key={index}>
                        <SkillButton className="show"> {skill}</SkillButton>
                      </Skills>
                    </>
                  ))}
              </ProfileSkills>

              <ProfileLinks>
                <ProfileIconSection>

                  {profiledata.sociallinks.producthunt && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      to={{
                        pathname: `https://www.producthunt.com/${profiledata.sociallinks.producthunt}`,
                      }}
                    >
                      <Icon className="fab fa-product-hunt"></Icon>
                    </Link>
                  )}

                  {profiledata.sociallinks.github && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      to={{
                        pathname: `https://www.github.com/${profiledata.sociallinks.github}`,
                      }}
                    >
                      <Icon
                        style={{ color: "black" }}
                        className="fab fa-github-square"
                      ></Icon>
                    </Link>
                  )}

                  {profiledata.sociallinks.twitter && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      to={{
                        pathname: `https://www.twitter.com/${profiledata.sociallinks.twitter}`,
                      }}
                    >
                      <Icon className="fab fa-twitter-square"></Icon>
                    </Link>
                  )}

                  {profiledata.sociallinks.instagram && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      to={{
                        pathname: `https://www.instagram.com/${profiledata.sociallinks.instagram}`,
                      }}
                    >
                      <Icon className="fab fa-instagram-square"></Icon>
                    </Link>
                  )}

                  {profiledata.sociallinks.behance && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "black" }}
                      to={{
                        pathname: `https://www.behance.net/${profiledata.sociallinks.behance}`,
                      }}
                    >
                      <Icon className="fab fa-behance-square"></Icon>
                    </Link>
                  )}

                  {profiledata.sociallinks.dribbble && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      to={{
                        pathname: `https://www.dribbble.com/${profiledata.sociallinks.dribbble}`,
                      }}
                    >
                      <Icon className="fab fa-dribbble-square"></Icon>
                    </Link>
                  )}

                  {profiledata.sociallinks.linkedin && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      to={{
                        pathname: `https://www.linkedin.com/${profiledata.sociallinks.linkedin}`,
                      }}
                    >
                      <Icon className="fab fa-linkedin-square"></Icon>
                    </Link>
                  )}

                  {profiledata.sociallinks.facebook && (
                    <Link
                      target="_blank"
                      rel="noopener noreferrer"
                      to={{
                        pathname: `https://www.facebook.com/${profiledata.sociallinks.facebook}`,
                      }}
                    >
                      <Icon className="fab fa-facebook-square"></Icon>
                    </Link>
                  )}
                </ProfileIconSection>

                <ProfileWebsite>
                  {profiledata && profiledata.website ? (
                    <>
                      <ProfileWebsite
                        target="_blank"
                        rel="noreferrer noopener"
                        href={`${profiledata.website}`}
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
