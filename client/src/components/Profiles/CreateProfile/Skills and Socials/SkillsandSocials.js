import React, {useState, useEffect, Fragment} from 'react'

// CSS
import './SkillsandSocials.css'

//Components
import LinksSelect from './LinksSelect'
import SkillsSelect from './SkillsSelect'

// UI
import Button from '../../../UI/Button'

// Router and Redux
import {getProfile} from '../../../../redux/actions/profile';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom'

const SkillsandSocials = (
  {profile: {
  loading,
  signedprofile,
  skills},
  getProfile,
  skillsData,
  setSkills,
  stateSkills,
  setLinks,
  stateLinks,
  linksData
  }) => {

  const [changeLinks, setChangeLinks] = useState(false);

  const [changeSkills, setChangeSkills] = useState(false);

  useEffect(() => {
     if (!signedprofile) getProfile();

     if (!loading && signedprofile) {
       const profileLinks = { ...stateLinks };
       for (const key in signedprofile.sociallinks) {
         if (key in profileLinks) profileLinks[key] = signedprofile.sociallinks[key];
       }
       setLinks(profileLinks);

       const profileSkills = {...stateSkills};
       for (const key in signedprofile) {
         if (key in profileSkills) profileSkills[key] = signedprofile[key];
       }
       setSkills(profileSkills);
     }
   }, [loading, getProfile, signedprofile]);

  const selectLinks = () => {
    setChangeLinks(true);
  }

  const unSelectLinks = () => {
    setChangeLinks(false);
  }

  const selectSkills = () => {
    setChangeSkills(true);
  }

  const unSelectSkills = (e) => {
    e.preventDefault()
    setChangeSkills(false);
  }

  const settingSkills = (data) => {
    setSkills(data);
  }

  const settingLinks = (data) => {
    setLinks(data);
  }

  return (
    <div className="bottom-section">
      <div className='socials'>

        <label>Social Links{' '}
        <Button
          className='button small'
          onClick={selectLinks}
        >Edit+</Button></label>

        {changeLinks && <LinksSelect
          unSelectLinks={unSelectLinks}
          settingLinks={settingLinks}
          linksData={linksData}
          stateLinks={stateLinks}
          />}

        <div className='social-icons'>
          {linksData.producthunt && <Link target="_blank" rel="noopener noreferrer" to={ {pathname: `https://www.producthunt.com/${linksData.producthunt}`}}><i className="fab fa-product-hunt"></i></Link>}

          {linksData.github && <Link target="_blank" rel="noopener noreferrer" to={ {pathname: `https://www.github.com/${linksData.github}`}}><i style={{color: 'black'}} className="fab fa-github-square"></i></Link>}

          {linksData.twitter && <Link target="_blank" rel="noopener noreferrer" to={ {pathname: `https://www.twitter.com/${linksData.twitter}`}}><i className="fab fa-twitter-square"></i></Link>}

          {linksData.instagram && <Link target="_blank" rel="noopener noreferrer" to={ {pathname: `https://www.instagram.com/${linksData.instagram}`}}><i className="fab fa-instagram-square"></i></Link>}

          {linksData.behance && <Link target="_blank" rel="noopener noreferrer" style={{color: 'black'}} to={ {pathname: `https://www.behance.net/${linksData.behance}`}}><i className="fab fa-behance-square"></i></Link>}

          {linksData.dribbble && <Link target="_blank" rel="noopener noreferrer" to={{pathname: `https://www.dribbble.com/${linksData.dribbble}`}}><i className="fab fa-dribbble-square"></i></Link>}

          {linksData.linkedin && <Link target="_blank" rel="noopener noreferrer" to={{pathname: `https://www.linkedin.com/${linksData.linkedin}`}}><i className="fab fa-linkedin-square"></i></Link>}

          {linksData.facebook && <Link target="_blank" rel="noopener noreferrer" to={ {pathname: `https://www.facebook.com/${linksData.facebook}`}}><i className="fab fa-facebook-square"></i></Link>}

        </div>
      </div>

      <div className='skills'>
          <label>Skills{' '}
          <Button
            onClick={selectSkills}
            className='button small'
          >Edit+</Button></label>

          {changeSkills && <SkillsSelect
            skillsData={skillsData}
            unSelectSkills={unSelectSkills}
            settingSkills={settingSkills}
            />}

          <div className='skills-text'>
          {skillsData.skills.length > 0 && skillsData.skills.map((skill, index) => (
            <>
            <div className='skill-each' key={index}>
                <p>{skill}</p>
            </div>
            </>
            ))}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({

  profile: state.profile

})

export default connect(mapStateToProps, {getProfile})(SkillsandSocials)
