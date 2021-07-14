import React, {useState, useEffect} from 'react'

// import GoogleLogin from 'react-google-login'

import './Inputs.css'

// Router
import {Link} from 'react-router-dom'

// UI
import Button from '../UI/Button'

// Redux Functions
import {connect} from 'react-redux'
import {setAlert} from '../../redux/actions/alert'
import {loginUser} from '../../redux/actions/inputs'
// import {googleLogin} from '../../redux/actions/inputs'
// import {googleLogout} from '../../redux/actions/inputs'

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
    console.log('Testing useEffect')
  }, [50])
})

useEffect(() => {
  setTimeout(() => {

    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const usernameRegex = /^[a-zA-Z0-9][\w-]+$/;

    if (emailRegex.test(userOrEmail)) {
      setFormData({ ...formData, email: userOrEmail });
    } else if (usernameRegex.test(userOrEmail)) {
      setFormData({ ...formData, username: userOrEmail});
    }
}, [50]);
}, [formData]);

const checkValidity = () => {
  setValidData(true)
}

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
    <div className='input-box-login'>
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

// <h3>OR</h3>
// <GoogleLogin
//   clientId={process.env.REACT_APP_CLIENT_ID}
//   render={(renderProps) => (
//     <Button
//     className="button m-1"
//     onClick={renderProps.onClick}
//     ><i class="fab fa-google"></i> Login with Google</Button>
//   )}
//   onSuccess={loginWithGoogle}
//   onFailure={googleLogout}
//   cookiePolicy={'single_host_origin'}
// />
// <br></br>
