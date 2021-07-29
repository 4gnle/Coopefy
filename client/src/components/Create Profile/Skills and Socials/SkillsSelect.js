import React , {useState} from 'react'
import {skillList} from './SkillList'

//UI CSS
import './SkillsSelect.css'

//Components
import Button from '../../UI/Button'

const SkillsSelect = (props) => {

  const [searchSkills, setSearchSkills] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillConfirm, setSkillConfirm] = useState(false)

  const skills = skillList;

  const addSKills = () => {
    console.log(selectedSkills);
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
  });
  console.log(selectedSkills)
};

  return (
  <div>
    <div className='backdrop' onClick={props.unSelectSkills}
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
          {skills.filter((skill) => {
            if (searchSkills == '') {
              return skill
            } else if (skill.name.toLowerCase().includes(searchSkills.toLowerCase())) {
              return skill
            }
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

        {skillConfirm ?
        <div className="selected-skills">
          <h3>Selected Skills</h3>
          {selectedSkills.length > 0 && selectedSkills.map(skill =>
            <button
              className='selected-skill-badge'
              onClick={e => deleteSkills(e)}
            >{skill.skill}
            </button>)}
        </div>
        : null
        }

        <div className='skills-buttons'>
          <Button
            className='primary'
            onClick={addSKills}
          >
            Add Skills
          </Button>
          <Button
            className='bad'
            onClick={props.unSelectSkills}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default SkillsSelect
