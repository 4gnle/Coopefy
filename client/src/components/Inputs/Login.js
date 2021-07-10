import React, {useState, useEffect} from 'react'

import './Inputs.css'

// Router
import {Link} from 'react-router-dom'

// UI
import Button from '../UI/Button'

// Redux Functions
import {connect} from 'react-redux'
import {setAlert} from '../../redux/actions/alert'
import {loginUser} from '../../redux/actions/inputs'

const Login = ({history, loginUser, setAlert}) => {

if (localStorage.token) {
  history.push('/dashboard')
}

const [formData, setFormData] = useState({
  email: '',
  password: '',
  username: ''
});

const [userOrEmail, setUserOrEmail] = useState('');

const [validData, setValidData] = useState(false);

const {username, email, password} = formData;

useEffect(() => {
  setTimeout(() => {
    if (password.trim().length >= 8) {
      checkValidity();
    }
}, [50]);
  console.log('Testing useEffect')
}, [password]);

const checkValidity = () => {
  setValidData(true)
}

useEffect(() => {
  setTimeout(() => {
    /** W3C Email regex: (RFC5322) */
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    /** Must starts with a letter then can include underscores (_) & hyphens (-) */
    const usernameRegex = /^[a-zA-Z0-9][\w-]+$/;

    if (emailRegex.test(userOrEmail)) {
      // it is an email, send the value as an email
      setFormData({...formData, email: userOrEmail });
      console.log(email);
    } else if (usernameRegex.test(userOrEmail)) {
      // it is a username, send the value as a username
      setFormData({...formData, username: userOrEmail });
      console.log(username);
    }
  })
}, [userOrEmail])

const userEmail = (e) => {
setUserOrEmail(e.target.value);
}

const onChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
}

const onSubmit = (event) => {
  if (!validData) {
    setAlert('Invalid inputs', 'danger')
  } else {
    loginUser(history, {username, email, password});
  }
  event.preventDefault();
};


  return (
    <div className='input-box'>
        <form>
        <div
        className={`${'inputs-within'} ${
            validData === false ? 'invalid' : ''
          }`}
        >
        <div className='titles'>
          <h1>Log in</h1>
          <p>and collaborate!</p>
        </div>
        <label className="lead">Email or Username</label>
          <input
          type='text'
          name='user-or-email'
          placeholder='&#xf0e0; Write your email'
          onChange={(e) => userEmail(e)}
          value={userOrEmail}
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

export default connect(null, {loginUser, setAlert})(Login);
