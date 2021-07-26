import React, {useState} from 'react'

//Styles
import './ProfileView.css'

//UI
import Button from '../../UI/Button'

const ProfileView = () => {

  const [useMenu, setUseMenu] = useState(false);

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
      <div className='pv-box-items'>
        <div className='pv-profile-picture'>
        </div>
        <p>@angel</p>
        <Button
        className='small'
        onClick={showMenu}>
        +++
        </Button>

        {useMenu &&
        <div className='pv-menu'>
          <button
            className='pv-menu-button1'
          >View Profile</button>
          <button
            className='pv-menu-button2'
            onClick={editProfile}
          >Edit Profile</button>
        </div> }

        <div className='pv-bio'>
          <h4>Bio</h4>
          <div className='pv-bio-box'>
          </div>
        </div>

        <div className='pv-links'>
          <h4>Links</h4>
          <div className='pv-links-icons'>
            <i className="fab fa-product-hunt"></i>
            <i className="fab fa-github-square"></i>
            <i className="fab fa-twitter-square"></i>
            <i className="fab fa-facebook-square"></i>
            <i className="fab fa-instagram-square"></i>
            <i className="fab fa-behance-square"></i>
            <i className="fab fa-dribbble-square"></i>
            <i className="fab fa-linkedin-square"></i>
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

export default ProfileView
