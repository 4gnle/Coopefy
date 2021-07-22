import React from 'react'

//UI CSS
import './SkillsSelect.css'

//Components
import Button from '../../UI/Button'

const SkillsSelect = (props) => {
  return (
  <div>
    <div className='backdrop'>
    </div>

      <div className='select-skills'>
        <div className='skills-window'>
        <header>Select Skills</header>

        <select>
          <option value='Marketing'>Marketing</option>
          <option value='SEO'>SEO</option>
          <option value='Web Development'>Web Development</option>
          <option value='Content Writing'>Content Writing</option>
          <option value='Solidity'>Solidity</option>
          <option value='Community'>Community</option>
          <option value='VR/AR'>VR/AR</option>
          <option value='Social Media'>Social Media</option>
          <option value='UI/UX'>UI/UX</option>
        </select>

        <Button
          onClick={props.unSelectSkills}
        >
        OK
        </Button>
      </div>
    </div>
  </div>
  )
}

export default SkillsSelect
