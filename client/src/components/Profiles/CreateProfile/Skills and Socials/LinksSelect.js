import React, {useState, useEffect} from 'react'

//UI and Styles
import './LinksSelect.css'
import Button from '../../../UI/Button'

//Redux
import {getProfile} from '../../../../redux/actions/profile';
import {connect} from 'react-redux';

const LinksSelect = ({
  profile: {signedprofile, loading},
  getProfile,
  unSelectLinks,
  selectedLinks,
  stateLinks,
  settingLinks
  }) => {

  const [formData, setFormData] = useState(stateLinks);

  useEffect(() => {
     if (!signedprofile) getProfile();
     if (!loading && signedprofile) {
       const profileData = { ...stateLinks };
       for (const key in signedprofile.sociallinks) {
         if (key in profileData) profileData[key] = signedprofile.sociallinks[key];
       }
       setFormData(profileData);
     }
   }, [loading, getProfile, signedprofile]);

  const {
  github,
  instagram,
  linkedin,
  facebook,
  twitter,
  behance,
  dribbble,
  producthunt
  } = formData;

  const onChange = (e) => setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = (e) => {
    e.preventDefault();
    settingLinks(formData);
    unSelectLinks();
  }

  return (
  <div>
    <div onClick={unSelectLinks} className='link-backdrop'>
    </div>

        <div className='links-box'>

        <header>
        Add Links{' '}
        <Button
          className='small'
          onClick={unSelectLinks}>X</Button>
        </header>


          <form className='links-inputs'>
            <small>Add your ID or Username only</small>
            <br></br>
            <i className="fab fa-product-hunt"></i>
            <input placeholder='@yourusername' name='producthunt' value={producthunt} onChange={e => onChange(e)}></input>
            <br></br>
            <i className="fab fa-github-square"></i>
            <input placeholder='username' name='github' value={github} onChange={e => onChange(e)}></input>
            <br></br>
            <i className="fab fa-twitter-square"></i>
            <input placeholder='username' name='twitter' value={twitter} onChange={e => onChange(e)}></input>
            <br></br>
            <i className="fab fa-behance-square"></i>
            <input name='behance' value={behance} onChange={e => onChange(e)}></input>
            <br></br>
            <i className="fab fa-dribbble-square"></i>
            <input name='dribbble' value={dribbble} onChange={e => onChange(e)}></input>
            <br></br>
            <i className="fab fa-facebook-square"></i>
            <input name='facebook' value={facebook} onChange={e => onChange(e)}></input>
            <br></br>
            <i className="fab fa-instagram-square"></i>
            <input placeholder='username' name='instagram' value={instagram} onChange={e => onChange(e)}></input>
            <br></br>
            <i className="fab fa-linkedin-square"></i>
            <input name='linkedin' value={linkedin} onChange={e => onChange(e)}></input>

            <div className='links-buttons'>
            <Button
              className='button bad'
              onClick={unSelectLinks}>
              Cancel
            </Button>
            <Button
              className='button primary'
              onClick={e => onSubmit(e)}
              >
              Update
            </Button>
            </div>
          </form>
        </div>
  </div>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, {getProfile})(LinksSelect)
