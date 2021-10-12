import React, {useState, useEffect} from 'react'

import './Profile.css'

//UI
import Spinner from '../../UI/Spinner'
import Button from '../../UI/Button'
import Error404 from '../../UI/Error404'
import placeholder from '../../UI/placeholder.png'

//Redux and Router
import {getProfileByUsername} from '../../../redux/actions/profile';
import {cleanProfile} from '../../../redux/actions/profile';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

const stateLinks = {
  twitter: '',
  dribbble: '',
  behance: '',
  producthunt: '',
  instagram: '',
  linkedin: '',
  facebook: '',
  github: ''
};

const stateSkills = {
  skills: ''
};

const profileInfo = {
  status: '',
  username: '',
  profilename: '',
  location: '',
  bio: '',
  website: ''
};

const Profile = ({
  profile:
  {profile, loading, profileimage,
  bio, skills, username, website,
  sociallinks, location},
  authenticate:
  {isAuth, user},
  getProfileByUsername,
  cleanProfile,
  match,
  history}) => {

  const [imagePrev, setImagePrev] = useState();
  const [socialLinks, setSocialLinks] = useState(stateLinks);
  const [skillsData, setSkillsData] = useState(stateSkills);
  const [profileLoaded, setProfileLoaded] = useState(false);

  useEffect(() => {
    loadProfile();
    console.log(profile);
  }, [getProfileByUsername, match.params.username]);

  const loadProfile = async () => {
    await cleanProfile();
    await getProfileByUsername(match.params.username);
    setProfileLoaded(true);
  }

  useEffect(() => {

    if (profile && !loading && profile.profileimage) {
      let image1 = URL.createObjectURL(new Blob([profile.profileimage]), {type: 'image/jpeg'});
      setImagePrev(image1);
    }

    if (!loading && profile) {
      const profileLinks = { ...stateLinks };
      for (const key in profile.sociallinks) {
        if (key in profileLinks) profileLinks[key] = profile.sociallinks[key];
      }
      setSocialLinks(profileLinks);

      const profileSkills = {...stateSkills};
      for (const key in profile) {
        if (key in profileSkills) profileSkills[key] = profile[key];
      }
      setSkillsData(profileSkills)

       const profileData = { ...profileInfo };
       for (const key in profile) {
         if (key in profileData) profileInfo[key] = profile[key];
       }
     }

    // eslint-disable-next-line
  }, [profile, loading, username, profileimage]);

  const goBack = () =>{
    console.log(imagePrev)
  }

  return (
    <>
    {!profileLoaded ? (<Spinner/>) :
      <>
      {!profile ? <Error404/> :
    <div className='profile-box'>
        <div className='pb-top-buttons'>
        <Button onClick={goBack} className='button bad'>Back</Button>
        {isAuth && profile.user && user._id === profile.user._id && <Link to='/edit-profile'><Button className='button random'>Edit Profile</Button></Link>}
        </div>

      <div className='profile-main'>
        <div className='profile-picture'>
          {profileLoaded && !imagePrev ? (<><img alt='Profile' src={placeholder}/><br/></>)
          : <><img alt='Profile' src={imagePrev}/></>}
          {profile.status ? (
            <div className='profile-location'><b><em>{profile.status}</em></b></div>
          ) : null}
          {profile.location ? (
            <div className='profile-location'><p>{profile.location}</p></div>
          ) : null}
        </div>

        <div className='profile-top'>
          {profile && !profileInfo.profilename ? (<><div className='no-profile-name'>No profile name
            {isAuth && user._id === profile.user._id && <Link to='edit-profile'>
            <Button className='button small'>Add Name</Button></Link>}
        </div></>) :
          <>
          {profile &&
          <p><strong>{profileInfo.profilename}
          </strong>
          &nbsp;&nbsp;
          <span>@{profileInfo.username}</span></p>}
          <em>{profileInfo.bio}</em>
          </>}
        </div>
      </div>

      {!profile ? (<><div className='no-profile'>There's no profile to show
        {isAuth && <Link to='edit-profile'>
        <Button className='button small'>Edit Profile</Button></Link>}
      </div></>) : null}

          <div className='profile-skills'>
            {profile && profile.skills.length === 0 ? (<><div className='no-profile'>There are no skills show
              {isAuth && user._id === profile.user._id &&
                <Link to='edit-profile'>
              <Button className='button small'>Add Skills</Button></Link>}
            </div></>) : null}

            {skillsData.skills.length > 0 && skillsData.skills.map((skill, index) => (
              <>
              <div key={index}>
                  <Button className='show'>{' '}{skill}</Button>
              </div>
              </>
              ))}
          </div>

          <div className='profile-links'>
            <div className='profile-links-icons'>
              {socialLinks.producthunt && <Link target="_blank" rel="noopener noreferrer" to={ {pathname: `https://www.producthunt.com/${socialLinks.producthunt}`}}><i className="fab fa-product-hunt"></i></Link>}

              {socialLinks.github && <Link target="_blank" rel="noopener noreferrer" to={ {pathname: `https://www.github.com/${socialLinks.github}`}}><i style={{color: 'black'}} className="fab fa-github-square"></i></Link>}

              {socialLinks.twitter && <Link target="_blank" rel="noopener noreferrer" to={ {pathname: `https://www.twitter.com/${socialLinks.twitter}`}}><i className="fab fa-twitter-square"></i></Link>}

              {socialLinks.instagram && <Link target="_blank" rel="noopener noreferrer" to={ {pathname: `https://www.instagram.com/${socialLinks.instagram}`}}><i className="fab fa-instagram-square"></i></Link>}

              {socialLinks.behance && <Link target="_blank" rel="noopener noreferrer" style={{color: 'black'}} to={ {pathname: `https://www.behance.net/${socialLinks.behance}`}}><i className="fab fa-behance-square"></i></Link>}

              {socialLinks.dribbble && <Link target="_blank" rel="noopener noreferrer" to={{pathname: `https://www.dribbble.com/${socialLinks.dribbble}`}}><i className="fab fa-dribbble-square"></i></Link>}

              {socialLinks.linkedin && <Link target="_blank" rel="noopener noreferrer" to={{pathname: `https://www.linkedin.com/${socialLinks.linkedin}`}}><i className="fab fa-linkedin-square"></i></Link>}

              {socialLinks.facebook && <Link target="_blank" rel="noopener noreferrer" to={ {pathname: `https://www.facebook.com/${socialLinks.facebook}`}}><i className="fab fa-facebook-square"></i></Link>}
          </div>
            <div className='profile-links-website'>
            {profile && profileInfo.website ?
              <>
            <Link target="_blank" rel="noopener noreferrer" to={{pathname: `${profileInfo.website}`}}>{profileInfo.website}</Link>
            </> : null}
            </div>
        </div>

          <div className='profile-activity'>
          <h2>Activity</h2>
          </div>

        </div>}
        </>}
        </>
    )
  }


const mapStateToProps = state => ({
  profile: state.profile,
  authenticate: state.authenticate
})

export default connect(mapStateToProps, {getProfileByUsername, cleanProfile})(Profile)
