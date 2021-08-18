import React , {useState, useEffect} from 'react'
import {skillList} from './SkillList'

//Redux
import {getProfileSkills, setProfileSkills} from '../../../redux/actions/profile';
import {connect} from 'react-redux';

//UI CSS
import './SkillsSelect.css'

//Components
import Button from '../../UI/Button'

const SkillsSelect = ({profile: {skills, loading}, getProfileSkills, setProfileSkills, unSelectSkills}) => {

  const [searchSkills, setSearchSkills] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [profileskills, setProfileskills] = useState([]);
  const [skillConfirm, setSkillConfirm] = useState(false)
  const [formData, setFormData] = useState({
    skills: ''
  })

  const skills1 = skillList;

  useEffect(() => {
     if (!skills) getProfileSkills();
       if (!loading && skills) {
         const profileSkills = {...skills};
         for (const key in skills) {
           if (key in profileSkills) profileSkills[key] = skills[key];
         }
         setProfileskills(profileSkills)
       }
       console.log(selectedSkills);
  }, [loading, skills])

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
    console.log(selectedSkills);
    // setProfileSkills(formData)
  }

  const selectSkill = (e) => {
    setSelectedSkills(prevSkills => {
      const updatedSkills = [...prevSkills];
      updatedSkills.unshift({skill: e, id: Math.random().toString()});
      return updatedSkills;
    }
  )
  setSkillConfirm(true);
  console.log(selectedSkills);
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

        {skillConfirm && selectedSkills ? (
          <div className='selected-skills'>
          <h3>Selected Skills</h3>
          {selectedSkills && selectedSkills.map(skill => (
              <button
                className='selected-skill-badge'
                onClick={e => deleteSkills(skill.id)}>
                {skill.skill}
              </button>
          ))}
          </div>
        ) : null}

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

export default connect(mapStateToProps, {getProfileSkills, setProfileSkills})(SkillsSelect)
