import {
  LOGIN,
  LOGOUT,
  REG_SUCCESS,
  REG_FAILED} from './types'

import axios from 'axios'

export const registerUser = (username, email, password) => async dispatch => {

  const body = JSON.stringify({username, email, password});

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {

    const res = await axios.post('/api/users', body, config)

    dispatch({ type: REG_SUCCESS, payload: res.data })

    console.log('Registered User Successfully')

  } catch(err) {
    console.error(err.message)

    dispatch({ type: REG_FAILED })
  }

  }
