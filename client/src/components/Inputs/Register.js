import React, {useState} from 'react'

import Button from '../UI/Button'

import './Inputs.css'

const Register = (props) => {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [validPassword, setValidPassword] = useState(false);
  const [firstPassword, setFirstPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');

  const onChange = e =>
  setFormData({ ...formData, [e.target.name]: e.target.value });


  const setPassword1 = (event) => {
    setFirstPassword(event.target.value)
  };

  const checkPassword1 = (event) => {
    if (firstPassword.trim().length >= 8) {
      setFirstPassword(true);
    }
  }

  const setPassword2 = (event) => {
    if (firstPassword === secondPassword) {
      setValidPassword(true);
    }
  };

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
          onChange={setPassword1}
          value={firstPassword}
          >
          </input>

          {firstPassword &&
          <input
          type='password2'
          name='password2'
          placeholder='&#xF084; Confirm Password'
          onChange={setPassword2}
          value={secondPassword}
          >
          </input>}

          <Button
          className="button m-1"
          type='submit'
          onClick={onSubmit}
          disabled={!validPassword}
          >
            Sign Up
          </Button>
          </div>
      </form>
    </div>  )
}

export default Register
