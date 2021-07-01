import {
  LOGIN,
  LOGOUT,
  REG_SUCCESS,
  REG_FAILED} from './types'

  import {setAlert} from './alert'


import axios from 'axios'

export const registerUser = (history, username, email, password) => async dispatch => {

  const body = JSON.stringify({username, email, password});

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {

    const res = await axios.post('/api/users', body, config)

    dispatch({ type: REG_SUCCESS, payload: res.data })

    history.push('/dashboard')

  } catch(err) {
    console.error(err.message)

    const errors = err.response.data.errors;

    if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({ type: REG_FAILED })
    }
  }
