import {
  LOGIN,
  LOGOUT,
  REG_SUCCESS,
  REG_FAILED,
  LOADED,
  NOT_LOADED} from './types'

import {setAlert} from './alert'
import authToken from '../utilities/authToken'
import api from '../utilities/api'

export const registerUser = ({username, email, password}) => async dispatch => {

  const body = JSON.stringify({username, email, password});

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {

    const res = await api.post('/users', body, config);

    dispatch({
      type: REG_SUCCESS,
      payload: res.data
     })

     dispatch (
       setAlert('Registered Successfully', 'success')
     );


  } catch(err) {
    console.error(err.message)

    const errors = err.response.data.errors;

    if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({ type: REG_FAILED })
    }
  }

export const loginUser = (email, password) => async dispatch => {

  const body = JSON.stringify({email, password});

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {

    const res = await api.post('/auth', body, config);

    dispatch({
      type: LOGIN,
      payload: res.data
     })

     dispatch (
       setAlert('Logged In', 'success')
     );

     dispatch(loadUser())

  } catch(err) {
    console.error(err.message)

    const errors = err.response.data.errors;

    if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({ type: LOGOUT })
    }
  }

  export const loadUser = () => async dispatch => {

    if (localStorage.token) {
      authToken(localStorage.token);
    }

    try {

      const res = await api.get('/auth');

      dispatch({
        type: LOADED,
        payload: res.data
      })

    } catch (err) {

      console.error(err.message)

      dispatch({
        type: NOT_LOADED
      })
    }
  }
