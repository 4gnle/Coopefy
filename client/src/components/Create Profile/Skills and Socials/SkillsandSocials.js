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
import {Link} from 'react-router-dom'

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
