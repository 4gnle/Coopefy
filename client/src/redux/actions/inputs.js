import {
  LOGIN,
  LOGOUT,
  REG_SUCCESS,
  REG_FAILED} from './types'


export const registerUser = (token) => dispatch => {
  const id = uuid();

  dispatch({
    type: REG_SUCCESS,
    payload: {msg, alertType, id}
  })

  dispatch({
    type: REG_FAILED,
    payload: null
  })

}
