import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Button from '../UI/Button'

import './Inputs.css'

const Register = (props) => {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const {username, email, password } = formData;

  const [validPassword, setValidPassword] = useState(false);
  const [validPassword2, setValidPassword2] = useState(false);
  const [firstPassword, setFirstPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');
  const [validData, setValidData] = useState(false);

  const onChange = e =>
  setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
  const identifier = setTimeout(() => {
    console.log('Checking form validity!');

    if (firstPassword === secondPassword) {
      setValidPassword2(true);
    };
  }, 50);
  return () => {
    console.log('CLEANUP');
    clearTimeout(identifier);
  };
  }, [firstPassword, secondPassword]);


  const setPassword1 = (event) => {
    setFirstPassword(event.target.value)
    checkPassword1();
  };

  const checkPassword1 = (event) => {
    if (firstPassword.trim().length === 8) {
      setValidPassword(true);
    };
  };

  const setPassword2 = (event) => {
    setSecondPassword(event.target.value)
    checkPassword2();
  };

  const checkPassword2 = () => {
    if (validPassword && validPassword2) {
      setValidData(true);
    };
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    if (validData) {
      const newUser = {
        username,
        email,
        password
      }

      try {
        const config = {
          headers: {'Content-Type': 'application/json'}
        }

        const body = JSON.stringify(newUser);

        const res = await axios.post('/api/users', body, config);
        console.log(res.data)
      } catch(err) {
        console.error(err.response.data)
      }
    } else {
      console.log('Data not valid.')
    }
    // console.log(validData);
    // context.onLogin(emailState.value, passwordState.value);
    props.history.push('/dashboard')
  };

  return (
    <div className='input-box'>
      <form>
      <div className='inputs-within'>

        <h1>Sign Up</h1>
        <p>and build your team!</p>
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
          onChange={setPassword1}
          value={firstPassword}
          >
          </input>

          {validPassword &&
          <div>
          <label className="lead">Confirm Password</label>
          <input
          type='password'
          name='password2'
          placeholder='&#xF084; Confirm Password'
          onChange={setPassword2}
          value={secondPassword}
          >
          </input></div>}

          <Button
          className="button m-1"
          type='submit'
          onClick={onSubmit}
          disabled={!validData}
          >
            Sign Up
          </Button>
          </div>
      </form>
    </div>  )
}

export default Register
