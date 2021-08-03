import React, {useState, useEffect} from 'react'

// CSS
import './SkillsandSocials.css'

//Components
import LinksSelect from './LinksSelect'
import SkillsSelect from './SkillsSelect'

// UI
import Button from '../../UI/Button'

// Router and Redux
// import {Link} from 'react-router'
import {getProfile} from '../../../redux/actions/profile';
import {connect} from 'react-redux';


const initialState = {
  twitter: '',
  dribbble: '',
  behance: '',
  producthunt: '',
  instagram: '',
  linkedin: '',
  facebook: '',
  github: ''
};

const SkillsandSocials = ({profile: {loading, profile}, getProfile}) => {

  const [changeLinks, setChangeLinks] = useState(false);

  const [changeSkills, setChangeSkills] = useState(false);

  const [socialLinks, setSocialLinks] = useState(initialState);

  useEffect(() => {
     if (!profile) getProfile();
     if (!loading && profile) {
       const profileData = { ...initialState };
       for (const key in profile.sociallinks) {
         if (key in profileData) profileData[key] = profile.sociallinks[key];
       }
       setSocialLinks(profileData);
     }
   }, [loading, getProfile, profile]);

  const selectLinks = () => {
    setChangeLinks(true);
  }

  const unSelectLinks = () => {
    setChangeLinks(false);
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
          onClick={selectLinks}
        >Edit+</Button></label>

        {changeLinks && <LinksSelect unSelectLinks={unSelectLinks}/>}

        <div className='social-icons'>
          {socialLinks.producthunt && <i className="fab fa-product-hunt"></i>}
          {socialLinks.github && <i className="fab fa-github-square"></i>}
          {socialLinks.twitter && <i className="fab fa-twitter-square"></i>}
          {socialLinks.facebook && <i className="fab fa-facebook-square"></i>}
          {socialLinks.instagram && <i className="fab fa-instagram-square"></i>}
          {socialLinks.behance && <i className="fab fa-behance-square"></i>}
          {socialLinks.dribbble && <i className="fab fa-dribbble-square"></i>}
          {socialLinks.linkedin && <i className="fab fa-linkedin-square"></i>}
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

const mapStateToProps = state => ({

  profile: state.profile

})

export default connect(mapStateToProps, {getProfile})(SkillsandSocials)
