import React, {useState} from 'react'

// CSS
import './SkillsandSocials.css'

//Components
import SocialsSelect from './SocialsSelect'
import SkillsSelect from './SkillsSelect'

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
        <p>Social Links</p>
        {changeSocials && <SocialsSelect />}
        <div className='social-icons'>
          <i className="fab fa-product-hunt"></i>
          <i className="fab fa-github-square"></i>
          <i className="fab fa-twitter-square"></i>
          <i className="fab fa-facebook-square"></i>
          <i className="fab fa-instagram"></i>
          <i className="fab fa-behance-square"></i>
          <i className="fab fa-dribbble-square"></i>
          <i className="fab fa-linkedin-square"></i>

        </div>
      </div>

      <div className='skills'>
          <p>Skills</p>
          {changeSkills && <SkillsSelect />}
          <div className='skills-text'>

        </div>
      </div>
    </div>
  )
}

export default SocialLinks
