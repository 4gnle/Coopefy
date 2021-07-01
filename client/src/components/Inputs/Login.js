import React, {useState, useEffect} from 'react'

import {Link} from 'react-router-dom'

import './Inputs.css'

import AuthContextProvider from '../auth/auth-context';
import Button from '../UI/Button'

import {loginUser} from '../../redux/actions/inputs'

const Login = (setAlert, loginUser) => {

const [formData, setFormData] = useState({
  email: '',
  password: ''
});

const [validData, setValidData] = useState(false);

const {email, username, password} = formData;

useEffect(() => {
  const performingCheck = setTimeout(() => {
    if (password.trim().length >= 8 && email.trim().contains('@')) {
      checkValidity();
    }
  }, [500])

  console.log('Testing useEffect')
}, [password, email]);

const checkValidity = () => {
  setValidData(true)
}

const onChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
}

const onSubmit = async (event) => {
  if (validData) {
    event.preventDefault();
    loginUser({email, username, password});
  } else {
    setAlert('Your email/username or password is wrong', 'danger')
  }
};


  return (
    <div className='input-box'>
        <form>
        <div
        className={`${'inputs-within'} ${
            validData === false ? 'invalid' : ''
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
          disabled={!validData}
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
