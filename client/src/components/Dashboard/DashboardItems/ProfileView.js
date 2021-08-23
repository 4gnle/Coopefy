import React, {useState, useRef, useEffect} from 'react'

//Styles
import './ProfileView.css'

//UI
import Button from '../../UI/Button'
import Spinner from '../../UI/Spinner'

//Redux and Router
import {profileData, getProfile, getProfileImage} from '../../../redux/actions/profile';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

const ProfileView = ({profile: {profile, loading, profileimage, bio}, getProfileImage, getProfile}) => {

  const links = {
    twitter: '',
    dribbble: '',
    behance: '',
    producthunt: '',
    instagram: '',
    linkedin: '',
    facebook: '',
    github: ''
  };

  const [useMenu, setUseMenu] = useState(false);
  const [imagePrev, setImagePrev] = useState();
  const [socialLinks, setSocialLinks] = useState(links);
  const [profileBio, setProfileBio] = useState('');

  const wrapper = useRef(null);

  const hideMenu = () =>{
    setUseMenu(false);
  }

  useEffect(() => {
    if (!profileimage && !imagePrev) getProfileImage();
    if (!loading && profileimage) {
      const image1 = URL.createObjectURL(profileimage);
      setImagePrev(image1);
    }
    // eslint-disable-next-line
  }, [getProfileImage, loading, profileimage]);

  useEffect(() => {
    if (!profile) getProfile();
    if (!loading && profile) {
      const profileData = { ...links };
      for (const key in profile.sociallinks) {
        if (key in profileData) profileData[key] = profile.sociallinks[key];
      }
      setSocialLinks(profileData);
      console.log(profileData);

      const biog = profile.bio
      setProfileBio(biog);
    }
  }, [loading, profile]);

  useEffect(() => {
     const handleClickOutside = (event) => {
         if (wrapper.current && !wrapper.current.contains(event.target)) {
           hideMenu();
         }
     }
     document.addEventListener("mousedown", handleClickOutside);
     return () => {
         document.removeEventListener("mousedown", handleClickOutside);
     };
 }, [wrapper]);

 const showMenu = () => {
   if (!useMenu) {
     setUseMenu(true);
   } else {
     setUseMenu(false)
   }
 }

  const editProfile = () => {
    window.location.href='/edit-profile'
  }

  return (
    <div className='pv-box'>
      <h4>You</h4>
      <p>@angel</p>
      <div className='pv-box-items'>
        <div className='pv-profile-picture'>
          <img src={imagePrev}/>
        </div>
        <Button
        className='small'
        onClick={showMenu}>
        +++
        </Button>

        {useMenu &&
        <div className='pv-menu-wrapper' ref={wrapper}>
          <div className='pv-menu'>
            <Button
              className='pv-menu-button1'
            >View Profile</Button>
            <Button
              className='pv-menu-button2'
              onClick={editProfile}
            >Edit Profile</Button>
          </div>
        </div>}

        <div className='pv-bio'>
          <h4>Bio</h4>
          <div className='pv-bio-box'>
            <p>{profileBio}</p>
          </div>
        </div>

        <div className='pv-links'>


          <h4>Links</h4>
          <div className='pv-links-icons'>
          {socialLinks.producthunt && <Link target="_blank" rel="noopener noreferrer" to={ {pathname: `https://www.producthunt.com/${socialLinks.producthunt}`}}><i className="fab fa-product-hunt"></i></Link>}

          {socialLinks.github && <Link target="_blank" rel="noopener noreferrer" to={ {pathname: `https://www.github.com/${socialLinks.github}`}}><i style={{color: 'black'}} className="fab fa-github-square"></i></Link>}

          {socialLinks.twitter && <Link target="_blank" rel="noopener noreferrer" to={ {pathname: `https://www.twitter.com/${socialLinks.twitter}`}}><i className="fab fa-twitter-square"></i></Link>}

          {socialLinks.instagram && <Link target="_blank" rel="noopener noreferrer" to={ {pathname: `https://www.instagram.com/${socialLinks.instagram}`}}><i className="fab fa-instagram-square"></i></Link>}

          {socialLinks.behance && <Link target="_blank" rel="noopener noreferrer" style={{color: 'black'}} to={ {pathname: `https://www.behance.net/${socialLinks.behance}`}}><i className="fab fa-behance-square"></i></Link>}

          {socialLinks.dribbble && <Link target="_blank" rel="noopener noreferrer" to={{pathname: `https://www.dribbble.com/${socialLinks.dribbble}`}}><i className="fab fa-dribbble-square"></i></Link>}

          {socialLinks.linkedin && <Link target="_blank" rel="noopener noreferrer" to={{pathname: `https://www.linkedin.com/${socialLinks.linkedin}`}}><i className="fab fa-linkedin-square"></i></Link>}

          {socialLinks.facebook && <Link target="_blank" rel="noopener noreferrer" to={ {pathname: `https://www.facebook.com/${socialLinks.facebook}`}}><i className="fab fa-facebook-square"></i></Link>}
          </div>
          </div>

        <div className='pv-projects'>
          <h4>Projects</h4>
          <div className='pv-projects-box'>
          </div>
        </div>

      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, {getProfile, getProfileImage})(ProfileView)
