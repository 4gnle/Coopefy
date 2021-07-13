import React from 'react'

import './ProfileEdit.css'

import ImageUpload from './Image'

const CreateProfile = ({profileImage}) => {
  return (
    <div className='edit-box'>
      <ImageUpload />

      <div className='top-inputs-name'>
        <input
        placeholder='Name'
        className='name m-1'>
        </input>
      </div>

     <div className='top-inputs-bio'>
        <input
        placeholder='Bio'
        className='bio m-1'>
        </input>
      </div>

      <div className='bottom-inputs'>
        <input
        placeholder='Status'
        className='m-1'>
        </input>

        <input
        placeholder='Location'
        className='m-1'>
        </input>

        <input
        placeholder='Website'
        className='m-1'>
        </input>
      </div>
    </div>
  )
}

export default CreateProfile

// profileimage={formData.profileimage}
