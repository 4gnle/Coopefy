import React , {useState, useEffect} from 'react'
import {skillList} from './SkillList'

//Redux
import {getProfile, setProfileSkills} from '../../../redux/actions/profile';
import {connect} from 'react-redux';

//UI CSS
import './SkillsSelect.css'

//Components
import Button from '../../UI/Button'

const stateSkills = {
  skills: ''
};

const SkillsSelect = ({profile: {loading, profile}, setProfileSkills, unSelectSkills}) => {

  const [searchSkills, setSearchSkills] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [profileSkills, setProfileskills] = useState({});
  const [skillConfirm, setSkillConfirm] = useState(false)
  const [formData, setFormData] = useState({
    skills: ''
  })

  const skills1 = skillList;

  useEffect(() => {
     if (!profile) getProfile();
       if (!loading && profile) {
         const receivedSkills = {...profile.skills};
         setProfileskills(profile.skills);
         console.log(profileSkills)
        }
  }, [loading, profile])

  useEffect(() => {
    if (selectedSkills !== formData) {

    const chosenSkills = selectedSkills.map(skill => {
        return skill.skill
      })

    setFormData({
        skills: chosenSkills
      })
    }
  }, [selectedSkills])

  const addSKills = () => {
    setProfileSkills(formData)
  }

  const selectSkill = (e) => {
    setSelectedSkills(prevSkills => {
      const updatedSkills = [...prevSkills];
      updatedSkills.unshift({skill: e, id: Math.random().toString() });
      return updatedSkills;
    }
  )
  setSkillConfirm(true);
}

const deleteSkills = (e) => {
  setSelectedSkills(prevSkills => {
    const updatedSkills = prevSkills.filter(skill => skill.id !== e);
    return updatedSkills;
  })
};

  return (
  <div>
    <div className='backdrop' onClick={unSelectSkills}
    >
    </div>

      <div className='select-skills'>
        <div className='skills-window'>
        <header>Choose Your Skills</header>

        <form className='skills-form' action="/" method="get">
          <label style={{marginBottom: '0px'}}>
          Search Skills
          </label>
          <input
            value={searchSkills}
            onInput={e => setSearchSkills(e.target.value)}
            className='skills-search'
            type="text"
            id="header-search"
            placeholder="Write your desired skill"
            name="s"
          />
        </form>

        <div className='skills-list'>
          {skills1.filter((skill) => {
            if (searchSkills === '') {
              return skill
            } else if (skill.name.toLowerCase().includes(searchSkills.toLowerCase())) {
              return skill
            } {return false};
          }).map((skill) => (
             <button
              className='skills-badge'
              key={skill.id}
              onClick={e => selectSkill(skill.name)}
              >
              {skill.name}
            </button>
          ))}
        </div>

        {skillConfirm && selectedSkills.length > 0 ?
         (<div className="selected-skills">
           <h3>Selected Skills</h3>
           {selectedSkills.length > 0 && selectedSkills.map((skill, index) => {
           <button
             key={index}
             className='selected-skill-badge'
             onClick={e => deleteSkills(skill.id)}
           >{skill.skill}
           </button>})}</div>) : null}


        <div className='skills-buttons'>
          <Button
            className='primary'
            onClick={addSKills}
          >
            Add Skills
          </Button>
          <Button
            className='bad'
            onClick={unSelectSkills}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  </div>
  )
}

const mapStateToProps = state => ({
  profile: state.profile
})

export default connect(mapStateToProps, {getProfile, setProfileSkills})(SkillsSelect)
