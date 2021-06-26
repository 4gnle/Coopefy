import React, {useState, useContext, useReducer, useEffect} from 'react'
import axios from 'axios'

import {Redirect, Link} from 'react-router-dom'

import './Inputs.css'

import AuthContextProvider from '../auth/auth-context';
import Button from '../UI/Button'

const Login = (props) => {

const [formData, setFormData] = useState({
  email: '',
  password: ''
});

const {validPassword, setValidPassword} = useState(false);

const {email, password } = formData;

const onChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
}

const onSubmit = async (event) => {
  event.preventDefault();
  console.log(formData);
  // context.onLogin(emailState.value, passwordState.value);
  // props.history.push('/dashboard')
};


  return (
    <div className='input-box'>
        <form>
        <div
        className={`${'inputs-within'} ${
            validPassword === false ? 'invalid' : ''
          }`}
        >
          <h1>Log in</h1>
          <p>and collaborate!</p>
          <br></br>
        <label className="lead">Email / Username</label>
          <input
          type='text'
          name='email'
          placeholder='&#xF007; Write your username or email'
          onChange={(e) => onChange(e)}
          value={formData.email}
          />

        <label className="lead">Password</label>
            <input
            type='password'
            name='password'
            placeholder='&#xF084; Write your password'
            onChange={(e) => onChange(e)}
            value={formData.password}
            />

          <Button
          type='submit'
          onClick={onSubmit}
          // disabled={!validPassword}
          className="button m-1"
          >
            Log In
          </Button>

          <small>Don't have an account? <Link to='/register'>Sign up then!</Link></small>
        </div>
      </form>
    </div>
  )
}

export default Login
