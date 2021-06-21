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
  const [validPassword2, setValidPassword2] = useState(false);
  const [firstPassword, setFirstPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');

  const onChange = e =>
  setFormData({ ...formData, [e.target.name]: e.target.value });


  const setPassword1 = (event) => {
    setFirstPassword(event.target.value)
    checkPassword1();
  };

  const checkPassword1 = (event) => {
    if (firstPassword.trim().length >= 8) {
      setValidPassword(true);
    };
  };

  const setPassword2 = (event) => {
    setSecondPassword(event.target.value)
    checkPassword2();
  };

  const checkPassword2 = (event) => {
    if (firstPassword === secondPassword) {
      setValidPassword2(true);
    };
  }

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

          {validPassword &&
          <input
          type='password'
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
          disabled={!validPassword2}
          >
            Sign Up
          </Button>
          </div>
      </form>
    </div>  )
}

export default Register
