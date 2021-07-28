import React , {useState} from 'react'

//UI CSS
import './SkillsSelect.css'

//Components
import Button from '../../UI/Button'

const SkillsSelect = (props) => {

  const [searchSkills, setSearchSkills] = useState('')

  const skills = [
      {id: 'Marketing', name: 'Marketing'},
      {id: 'Content Writing', name: 'Content Writing'},
      {id: 'SEO', name: 'SEO'},
      {id: 'Web Development', name: 'Web Development'},
      {id: 'Solidity', name: 'Solidity'},
      {id: 'Community', name: 'Community'},
      {id: 'VR/AR', name: 'VR/AR'},
      {id: 'Social Media', name: 'Social Media'},
      {id: 'UI/UX', name: 'UI/UX'}
  ]

  const addSKills = () => {
    console.log(searchSkills)
  }

  const selectSkill = (e) => {
    console.log(e)
  }

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
