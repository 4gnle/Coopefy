import React, {useState} from 'react'

import ImageUpload from './Image'

import './Inputs.css'

const Register = () => {

  const [formData, setFormData] = useState({
    username: '',
    profileimage: '',
    email: '',
    password: ''
  });

  const onChange = e =>
  setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className='input-box'>
      <form className='input-within'>
        <label>User Name</label>
          <input
          type='text'
          name='username'
          placeholder='Write your username here'
          onChange={(e) => onChange()}
          value={formData.username}
          >
          </input>

        <ImageUpload profileimage={formData.profileimage}/>

        <label>Email</label>
          <input
          type='email'
          name='email'
          placeholder='Write your username here'
          onChange={(e) => onChange()}
          value={formData.email}
          >
          </input>
        <label>Password</label>
          <input
          type='password'
          name='password'
          placeholder='Select your age'
          onChange={(e) => onChange()}
          value={formData.password}
          >
          </input>

      </form>
    </div>  )
}

export default Register
