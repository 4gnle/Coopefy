import React, {useState} from 'react'

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
      <form>
      <div className='inputs-within'>

        <label>User Name</label>
          <input
          type='text'
          name='username'
          placeholder='&#xF007; Write a unique username'
          required
          onChange={(e => onChange(e))}
          value={formData.username}
          >
          </input>

        <label>Email</label>
          <input
          type='email'
          name='email'
          placeholder='&#xf02a; Write a valid email'
          onChange={(e => onChange(e))}
          value={formData.email}
          >
          </input>

        <label >Password</label>
          <input
          type='password'
          name='password'
          placeholder='&#xF084; At least 8 characters'
          onChange={(e => onChange(e))}
          value={formData.password}
          >
          </input>

          <Button
          className="button m-1"
          type='submit'
          onClick={onSubmit}
          // disabled={!validData}
          >
            Sign Up
          </Button>
          </div>
      </form>
    </div>  )
}

export default Register
