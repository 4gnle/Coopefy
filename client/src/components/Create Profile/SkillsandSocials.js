import React, {useState} from 'react'

// CSS
import './SkillsandSocials.css'

//Components
import SocialsSelect from './SocialsSelect'
import SkillsSelect from './SkillsSelect'

// UI
import Button from '../UI/Button'

//Router
import {Link} from 'react-router'

const SocialLinks = () => {

  const [changeSocials, setChangeSocials] = useState(false);

  const [changeSkills, setChangeSkills] = useState(false);

  const selectSocials = () => {
    setChangeSocials(true);
  }

  const selectSkills = () => {
    setChangeSkills(true);
  }


  return (
    <div className="bottom-section">
      <div className='socials'>
        <p>Social Links{' '}      <Button
          className='small'
        >Add+</Button></p>
        {changeSocials && <SocialsSelect />}
        <div className='social-icons'>
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

      <div className='skills'>
          <p>Skills{' '}
          <Button
            className='small'
          >Add+</Button></p>
          {changeSkills && <SkillsSelect />}
          <div className='skills-text'>
            <p>Marketing</p>
            <p>Web Development</p>
            <p>Content Writing</p>
          </div>
      </div>
    </div>
  )
}

export default SocialLinks
