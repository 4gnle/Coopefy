import React, {useState, useRef, useEffect} from 'react'

//Styles
import './ProfileView.css'

//UI
import Button from '../../UI/Button'
import Spinner from '../../UI/Spinner'

//Redux and Router
import {getProfile} from '../../../redux/actions/profile';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

const ProfileView = ({profile: {signedprofile, loading, profileimage, bio, username}, getProfile}) => {

  const [useMenu, setUseMenu] = useState(false);
  const [imagePrev, setImagePrev] = useState();
  const [username1, setUsername1] = useState();
  const [profileReady, setProfileReady] = useState(false);

  const wrapper = useRef(null);

  const hideMenu = () =>{
    setUseMenu(false);
  }

  const profileGet = async () => {
    await getProfile();
    setProfileReady(true);
  }

  useEffect(() => {
    profileGet();
  });

  useEffect(() => {
    if (signedprofile && signedprofile.profileimage && !imagePrev) {
      const imageBuffer = new Buffer(signedprofile.profileimage, 'base64');
      setImagePrev(imageBuffer);
    }

    if (signedprofile && !loading && signedprofile.username) {
      setUsername1(signedprofile.username);
    }

  }, [loading, signedprofile, username, profileimage, imagePrev]);

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

  return (
    <div className='pv-box'>
    {loading && !profileReady ? <Spinner/> :
      <>
      <h4>You</h4>
      <p>@{username1}</p>
      <div className='pv-box-items'>
        <div className='pv-profile-picture'>
        {signedprofile && !signedprofile.profileimage ? (<><div className='pv-no-picture'><p>No image</p>
         <Link to='edit-profile'>
          <Button className='button small'>Add Image</Button></Link>
        </div></>) :
          <img src={imagePrev} alt='profile'/>
        }
        </div>
        <Button
        className='button small'
        onClick={showMenu}>
        +++
        </Button>

        {useMenu &&
        <div className='pv-menu-wrapper' ref={wrapper}>
          <div className='pv-menu'>
            <Link to={`/@${username1}`}><Button
              className='pv-menu-button1'
            >View Profile</Button></Link>
            <Link to="/edit-profile"><Button
              className='pv-menu-button2'
            >Edit Profile</Button></Link>
          </div>
        </div>}

        <div className='pv-projects'>
          <h4>Projects</h4>
          <div className='pv-projects-box'>
          </div>
        </div>

      </div>
      </>}
    </div>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, {getProfile})(ProfileView)
