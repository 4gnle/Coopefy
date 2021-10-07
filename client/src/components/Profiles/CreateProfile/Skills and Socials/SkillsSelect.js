import React , {useState, useEffect} from 'react'
import {skillList} from '../../../Utils/SkillList'

//Redux
import {setProfileSkills} from '../../../../redux/actions/profile';
import {connect} from 'react-redux';

//UI CSS
import './SkillsSelect.css'

//Components
import Button from '../../../UI/Button'
// import Alert from '../../UI/Alert'

const SkillsSelect = ({profile: {skills, loading}, setProfileSkills, unSelectSkills, skillsData}) => {

  const [searchSkills, setSearchSkills] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillConfirm, setSkillConfirm] = useState(false)
  const [formData, setFormData] = useState({
    skills: ''
  })

  // Receives the skills from database and adds them to the front-end
  useEffect(() => {
      if (skillsData.skills && selectedSkills < 1) {
        skillsData.skills.forEach(skill => {
          const e = skill
          selectSkill(e);
        })
      }

      if (skillsData.skills && selectedSkills) {
        skillsData.skills.forEach(skill => {
          skills1.filter(skill => skill.name !== skill)
        })
      }
   }, [skillsData])

  // Adds the skills to the formdata so they're sent to the database
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

  let skills1 = skillList;

  const addSKills = (event) => {
    event.preventDefault()
    console.log(selectedSkills);
    setProfileSkills(formData)
  }

// Adds the selected skills to the Selected Skills section
  const selectSkill = (e) => {
    const isInArray = selectedSkills.find(element => element.skill === e);
    if (isInArray || selectedSkills.length >= 6) {return}

    setSelectedSkills(prevSkills => {
      const updatedSkills = [...prevSkills];
      updatedSkills.unshift({skill: e, id: Math.random().toString()});
      return updatedSkills;
    }
  )
    setSkillConfirm(true);
  }

// Deletes the skills in the Selected Skill section on click
const deleteSkills = (e) => {
  setSelectedSkills(prevSkills => {
    const updatedSkills = prevSkills.filter(skill => skill.id !== e);
    return updatedSkills;
  })
};

  return (
  <div>
    <div className='backdrop' onClick={unSelectSkills}>
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
            } else if
             (skill.name.toLowerCase().includes(searchSkills.toLowerCase())) {
              return skill
            } {return false};
          }).map((skill, index) => (
             <button
              className='skills-badge'
              key={index}
              onClick={e => selectSkill(skill.name)}
              >
              {skill.name}
            </button>
          ))}
        </div>

        {skillConfirm && selectedSkills ? (
          <div className='selected-skills'>
            <div><h3>Selected Skills</h3><em>(Max 6 skills)</em></div>
          {selectedSkills && selectedSkills.map((skill, index) => (
              <button
                key={index}
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
            onClick={addSKills}>
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

export default connect(mapStateToProps, {setProfileSkills})(SkillsSelect)
