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

const [data, setData] = useState({data1: ''});

const {username, email, password} = formData;

const {data1} = data;


useEffect(() => {
  setTimeout(() => {
      checkValidity();
  }, [50])
  console.log('Testing useEffect')
}, [password]);


const checkValidity = (e) => {
  if (data1.contains('@')) {
    email(e.target.value)
  } else {
    username(e.target.value)
  }
}

const onChange = (e) => {
setFormData({ ...formData, [e.target.name]: e.target.value });
}

const onSubmit = (event) => {
  if (!data) {
    setAlert('Invalid inputs', 'danger')
  } else {
    loginUser(history, formData);
  }
  event.preventDefault();
};

  return (
    <div className='input-box'>
        <form>
        <div
        className='inputs-within'
        >
        <div className='titles'>
          <h1>Log in</h1>
          <p>and collaborate!</p>
        </div>
        <label className="lead">Email or Username</label>
          <input
          type='text'
          placeholder='&#xf0e0; Write your email or username'
          onChange={(e) => checkValidity(e)}
          value={data.data}
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
