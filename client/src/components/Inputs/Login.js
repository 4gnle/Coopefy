import React, {useState, useContext, useReducer, useEffect} from 'react'

import {Redirect} from 'react-router-dom'

import './Inputs.css'

import AuthContextProvider from '../auth/auth-context';
import Button from '../UI/Button'

const emailReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return {...state, value: action.value }
  };
  if (action.type === 'VALIDATE') {
    return {...state, isValid: state.value.includes('@') }
  };
  return {value: '', isValid: null }
}

const passwordReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return {...state, value: action.value }
  };

  if (action.type === 'VALIDATE') {
    return {...state, isValid: state.value.trim().length > 6 }
  };
  return {value: '', isValid: null }
}

const Login = (props) => {

  const context = useContext(AuthContextProvider);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null
  })

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '', isValid: null
  })

  const [validData, setValidData] = useState(false);

  const {isValid: emailIsValid } = emailState;
  const {isValid: passwordIsValid } = passwordState;

  useEffect(() => {
  const identifier = setTimeout(() => {
    console.log('Checking form validity!');
    setValidData(
      emailIsValid && passwordIsValid
    );
  }, 50);

    return () => {
      console.log('CLEANUP');
      clearTimeout(identifier);
    };
  }, [emailIsValid, passwordIsValid]);

  const addEmail = (event) => {
    dispatchEmail({type: 'INPUT', value: event.target.value})
    dispatchEmail({type: 'VALIDATE'})
  };

  const addPassword = (event) => {
    dispatchPassword({type: 'INPUT', value: event.target.value})
    dispatchPassword({type: 'VALIDATE'})
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log(validData);
    context.onLogin(emailState.value, passwordState.value);
    props.history.push('/dashboard')
  };

  return (
    <div className='input-box'>
        <form>
        <div
        className={`${'inputs-within'} ${
            passwordState.IsValid === false ? 'invalid' : ''
          }`}
        >

        <label>Email</label>
          <input
          type='text'
          name='username'
          placeholder='Write your username'
          onChange={addEmail}
          value={emailState.value}
          >
          </input>
        <label>Password</label>
            <input
            type='password'
            name='userage'
            placeholder='Write your password'
            onChange={addPassword}
            value={passwordState.value}
            >
            </input>

          <Button
          type='submit'
          onClick={onSubmit}
          disabled={!validData}
          className="button m-1"
          >
            Log In
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Login
