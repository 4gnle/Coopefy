import React, {useState, useEffect} from 'react'

import './Profile.css'

//UI
import Spinner from '../UI/Spinner'
import Button from '../UI/Button'

//Redux and Router
import {getProfileById} from '../../redux/actions/profile';
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
  profilename: '',
  location: '',
  bio: '',
  website: ''
};

const Profile = ({profile: {profile, loading, profileimage, bio, skills, username, website, sociallinks, _id}, authenticate: {isAuth}, getProfileById, match}) => {

  const [imagePrev, setImagePrev] = useState();
  const [socialLinks, setSocialLinks] = useState(stateLinks);
  const [skillsData, setSkillsData] = useState(stateSkills);
  const [profileBio, setProfileBio] = useState('');
  const [profileLoading, setProfileLoading] = useState();
  const [profileName, setProfileName] = useState('');
  const [username1, setUsername1] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    if (!profile) getProfileById(match.params.id);

    if (!loading && profile.profileimage) {
      const fileContents = new Buffer(profile.profileimage, 'base64');
      let image1 = URL.createObjectURL(new Blob([fileContents]), {type: 'image/jpeg'});
      setImagePrev(image1);
    }

    console.log(profile);

    if (profile && !username1) {
      setUsername1(profile.username);
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
     }

     if (!loading && profile) {
       const profileData = { ...profileInfo };
       for (const key in profile) {
         if (key in profileData) profileData[key] = profile[key];
       }
       setProfileBio(profile.bio);
       setProfileLoading(profile.loading);
     }

    // eslint-disable-next-line
  }, [loading, profileimage, username]);

  return (
    <>
    {loading ? (<Spinner/>) :
    <div className='profile-box'>
      <div className='profile-main'>
        <div className='profile-picture'>
        {profile && !profile.profileimage ? (<><div className='no-profile-image'>No picture<br/>
          {isAuth && <Link to='edit-profile'>
          <Button className='button small'>Add Image</Button></Link>}
        </div></>) : null}
            {profile && profile.profileimage ? <img src={imagePrev}/> : null}
          </div>
          <div className='profile-top'>
          {profile && !profile.profilename ? (<><div className='no-profile-name'>No profile name
            {isAuth && <Link to='edit-profile'>
            <Button className='button small'>Add Name</Button></Link>}
          </div></>) :
            <>
            <p><strong>{profile && profile.profilename}
            </strong>
            &nbsp;&nbsp;
            <span>@{username1 && username1}</span></p>
            <em>{profileBio && profileBio}</em>
            </>}
          </div>
      </div>

      {!profile ? (<><div className='no-profile'>There's no profile to show
        {isAuth && <Link to='edit-profile'>
        <Button className='button small'>Edit Profile</Button></Link>}
      </div></>) : null}

          <div className='profile-skills'>
            {profile && profile.skills.length === 0 ? (<><div className='no-profile'>There are no skills show
              {isAuth && <Link to='edit-profile'>
              <Button className='button small'>Add Skills</Button></Link>}
            </div></>) : null}

            {skillsData.skills.length > 0 && skillsData.skills.map((skill, index) => (
              <>
              <div key={index}>
                  <p><i class="fas fa-check"></i> {' '}{skill}</p>
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
            {profile && profile.website ?
              <>
            <Link rel="noopener noreferrer" to={{pathname: `${profile.website}`}}>{profile.website}</Link>
            </> : null}
            </div>
        </div>

          <div className='profile-activity'>
          <h2>Activity</h2>
          </div>

        </div>}
        </>
    )}

const mapStateToProps = state => ({
  profile: state.profile,
  authenticate: state.authenticate
})

export default connect(mapStateToProps, {getProfileById})(Profile)
