import React, {useState, useEffect} from 'react'
import axios from 'axios'

import {Link} from 'react-router-dom'

import Button from '../UI/Button'

import './Inputs.css'

const Register = (props) => {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const {validPassword, setValidPassword} = useState(false);

  const {username, email, password, password2 } = formData;

  const onChange = e =>
  setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (event) => {
    event.preventDefault();
    // console.log(validData);
    // context.onLogin(emailState.value, passwordState.value);
    props.history.push('/dashboard')
  };

  return (
    <div className='input-box'>
      <form>
      <div className='inputs-within'>

        <h1>Sign Up</h1>
        <p>and co-operate!</p>
        <br></br>

        <label className="lead">Username ID</label>
          <input
          type='text'
          name='username'
          placeholder='&#xF007; Write a unique username'
          required
          onChange={(e => onChange(e))}
          value={formData.username}
          >
          </input>

        <label className="lead">Email</label>
          <input
          type='email'
          name='email'
          placeholder='&#xf02a; Write a valid email'
          onChange={(e => onChange(e))}
          value={formData.email}
          >
          </input>

        <label className="lead">Password</label>
          <input
          type='password'
          name='password'
          placeholder='&#xF084; At least 8 characters'
          onChange={(e) => onChange(e)}
          value={formData.password}
          >
          </input>

          <label className="lead">Confirm Password</label>
          <input
          type='password'
          name='password2'
          placeholder='&#xF084; Confirm Password'
          onChange={(e) => onChange(e)}
          value={formData.password2}
          >
          </input>

          <Button
          className="button m-1"
          type='submit'
          onClick={onSubmit}
          // disabled={!validPassword}
          >
            Sign Up
          </Button>

          <small>Already have an account? <Link to='/login'>Log in then!</Link></small>
          </div>
      </form>
    </div>  )
}

export default Register
