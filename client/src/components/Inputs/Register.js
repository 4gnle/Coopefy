import React, {useState, useEffect, Fragment} from 'react'

// Redux Functions
import {connect} from 'react-redux'
import {setAlert} from '../../redux/actions/alert'
import {registerUser} from '../../redux/actions/inputs'
// import {googleLogin} from '../../redux/actions/inputs'

import {InputBox,
InputsWithin,
Cta,
Cta2,
Titles,
SmallLink,
Label,
Inputs,
InputButton,
Small} from "./Inputs";

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
    <InputBox>
      <form>
      <InputsWithin>

        <Titles>
          <Cta>Register</Cta>
          <Cta2>and co-operate!</Cta2>
        </Titles>
        <Label>Username ID</Label>
          <Inputs
          type='text'
          name='username'
          placeholder='&#xF007; Write a unique username'
          onChange={e => onChange(e)}
          value={formData.username}
          required
          >
          </Inputs>

        <Label>Email</Label>
          <Inputs
          type='email'
          name='email'
          placeholder='&#xf0e0; Write a valid email'
          onChange={e => onChange(e)}
          value={formData.email}
          required
          >
          </Inputs>

        <Label>Password</Label>
          <Inputs
          type='password'
          name='password'
          placeholder='&#xF084; At least 8 characters'
          onChange={e => onChange(e)}
          value={formData.password}
          required
          >
          </Inputs>

          {validPassword &&
            <>
              <Label>Confirm Password</Label>
              <Inputs
              type='password'
              name='password2'
              placeholder='&#xF084; Confirm Password'
              onChange={e => onChange(e)}
              value={formData.password2}
              >
              </Inputs>
            </>
          }


          <InputButton
          className="button"
          type='submit'
          onClick={onSubmit}
          >
            Sign Up
          </InputButton>

          <Small>Already have an account? <SmallLink to='/login'>
          Log in then!</SmallLink></Small>
          </InputsWithin>
      </form>
    </InputBox>  )
}

export default connect(null, {setAlert, registerUser})(Register)
