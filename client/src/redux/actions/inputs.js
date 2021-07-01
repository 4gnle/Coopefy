import {
  LOGIN,
  LOGOUT,
  REG_SUCCESS,
  REG_FAILED} from './types'

export const registerUser = (username, password, email) => dispatch => {
  const id = uuid();

  dispatch({
    type: REG_SUCCESS,
    payload: {msg, alertType, id}
  })

  dispatch({
    type: REG_FAILED,
    payload: alert.id
  })
}
