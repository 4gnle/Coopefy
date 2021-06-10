import React, {useState, useContext} from 'react'

import './Inputs.css'

import AuthContext from '../auth/auth-context';
import Button from '../UI/Button'

const Login = (props) => {

  const context = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const [validData, setValidData] = useState(false);

  const addUsername = (event) => {
    setFormData.username(event.target.value)
  };

  const addPassword = (event) => {
    setFormData.password(event.target.value)
  };

  const onSubmit = (event) => {
    event.preventDefault();
    context.onLogin(formData.username, formData.password)
  }

  return (
    <div className='input-box'>
      <form className='input-within'>
        <label>User Name</label>
          <input
          type='text'
          name='username'
          placeholder='Write your username here'
          onChange={addUsername}
          value={formData.username}
          >
          </input>
        <label>Password</label>
            <input
            type='password'
            name='userage'
            placeholder='Write your password'
            onChange={addPassword}
            value={formData.password}
            >
            </input>

          <Button
          type='submit'
          onClick={onSubmit}
          >
            Log In
          </Button>
      </form>
    </div>
  )
}

export default Login
