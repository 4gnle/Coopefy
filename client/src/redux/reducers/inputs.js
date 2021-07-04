import {
  LOGIN,
  LOGOUT,
  REG_SUCCESS,
  REG_FAILED} from '../actions/types'

  const initialState = {
    token: localStorage.getItem('token'),
    isAuth: false,
    isLoading: true,
    user: null
  };


export default function authenticate(state = initialState, action) {
  const {payload, type} = action;

  switch(type){
    case REG_SUCCESS:
    case LOGIN:
      localStorage.getItem('token', payload.token)
      return {
        ...state,
        ...payload,
        isAuth: true,
        isLoading: false
      };

    case REG_FAILED:
    case LOGOUT:
      localStorage.removeItem('token');

      return {
      ...state,
      token: null,
      isAuth: true,
      isLoad: false
    };

    default:
      return state;
  }
}
