import React, {useState, useEffect, Fragment} from 'react'

// Router
import {Link} from 'react-router-dom'

// UI
import Button from '../UI/Button'

// Redux Functions
import {connect} from 'react-redux'
import {setAlert} from '../../redux/actions/alert'
import {registerUser} from '../../redux/actions/inputs'

import './Inputs.css'

const Register = ({history, registerUser, setAlert }) => {

  if (localStorage.token) {
    history.push('/dashboard')
  }

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [valid, setValid] = useState(false);
  const [validPassword, setValidPassword] = useState(false);

  const {username, email, password, password2 } = formData;

  useEffect(() => {
    setTimeout(() => {
    if (password.trim().length >= 8) {
      checkFirstPassword();
    }
  }, [500])

    setTimeout(() => {
    if (password === password2) {
      checkValidity();
    }
  }, [500])

  console.log('Testing useEffect')
}, [password, password2]);

  const checkValidity = () => {
      setValid(true);
  };

  const checkFirstPassword = () => {
      setValidPassword(true);
  };

  const onChange = e =>
  setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (event) => {
    if (!valid) {
      setAlert('Passwords do not match', 'danger');
    } else {
      registerUser(history, username, email, password);
    };
      event.preventDefault();
  };

  return (
    <div className='input-box'>
      <form>
      <div className='inputs-within'>

        <div className='titles'>
          <h1>Register</h1>
          <p>and co-operate!</p>
        </div>
        <label className="lead">Username ID</label>
          <input
          type='text'
          name='username'
          placeholder='&#xF007; Write a unique username'
          onChange={e => onChange(e)}
          value={formData.username}
          required
          >
          </input>

        <label className="lead">Email</label>
          <input
          type='email'
          name='email'
          placeholder='&#xf0e0; Write a valid email'
          onChange={e => onChange(e)}
          value={formData.email}
          required
          >
          </input>

        <label className="lead">Password</label>
          <input
          type='password'
          name='password'
          placeholder='&#xF084; At least 8 characters'
          onChange={e => onChange(e)}
          value={formData.password}
          required
          >
          </input>

          {validPassword &&
            <Fragment>
              <label className="lead">Confirm Password</label>
              <input
              type='password'
              name='password2'
              placeholder='&#xF084; Confirm Password'
              onChange={e => onChange(e)}
              value={formData.password2}
              >
              </input>
            </Fragment>
          }


          <Button
          className="button m-1"
          type='submit'
          onClick={onSubmit}
          // disabled={!valid}
          >
            Sign Up
          </Button>

          <small>Already have an account? <Link to='/login'>Log in then!</Link></small>
          </div>
      </form>
    </div>  )
}

export default connect(null, {setAlert, registerUser})(Register)
