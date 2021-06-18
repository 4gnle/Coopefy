import React, {useState} from 'react'

import ImageUpload from './Image'
import Button from '../UI/Button'

import './Inputs.css'

const Register = (props) => {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const onChange = e =>
  setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (event) => {
    event.preventDefault();
    // console.log(validData);
    // context.onLogin(emailState.value, passwordState.value);
    props.history.push('/dashboard')
  };

  return (
    <div className='input-box'>
      <div className='input-within'>
      <form className="form">

        <label className="lead">User Name</label>
          <input
          type='text'
          name='username'
          placeholder='Unique username'
          onChange={(e => onChange(e))}
          value={formData.username}
          >
          </input>

        <label className="lead">Email</label>
          <input
          type='email'
          name='email'
          placeholder='Valid email'
          onChange={(e => onChange(e))}
          value={formData.email}
          >
          </input>
        <label className="lead">Password</label>
          <input
          type='password'
          name='password'
          placeholder='At least 8 characters'
          onChange={(e => onChange(e))}
          value={formData.password}
          >
          </input>

          <Button
          className="button my-1"
          type='submit'
          onClick={onSubmit}
          // disabled={!validData}
          >
            Sign Up
          </Button>

      </form>
      </div>
    </div>  )
}

export default Register
