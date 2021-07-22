import React, {useState} from 'react'

// CSS
import './SkillsandSocials.css'

//Components
import SocialsSelect from './SocialsSelect'
import SkillsSelect from './SkillsSelect'

// UI
import Button from '../../UI/Button'

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

  const unSelectSkills = () => {
    setChangeSkills(false);
  }

  return (
    <div className="bottom-section">
      <div className='socials'>

        <label>Social Links{' '}      <Button
          className='small'
        >Edit+</Button></label>

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
          <label>Skills{' '}
          <Button
            onClick={selectSkills}
            className='small'
          >Edit+</Button></label>

          {changeSkills && <SkillsSelect unSelectSkills={unSelectSkills}/>}

          <div className='skills-text'>
            <p>Marketing</p>
            <p>SEO</p>
            <p>Content Writing</p>
            <p>Ethereum</p>
            <p>HTML/CSS</p>
            <p>React</p>
          </div>
      </div>
    </div>
  )
}

export default SocialLinks
