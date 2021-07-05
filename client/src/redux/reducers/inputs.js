import {
  LOGIN,
  LOGOUT,
  REG_SUCCESS,
  REG_FAILED,
  LOADED,
  NOT_LOADED} from '../actions/types'

  const initialState = {
    token: localStorage.getItem('token'),
    isAuth: false,
    isLoad: true,
    user: null
  };


export default function authenticate(state = initialState, action) {
  const {payload, type} = action;

  switch(type){
    case LOADED:
      return {
        ...state,
        isAuth: true,
        isLoad: false,
        user: payload
      };

    case REG_SUCCESS:
    case LOGIN:
      localStorage.getItem('token', payload.token)
      return {
        ...state,
        ...payload,
        isAuth: true,
        isLoad: false
      };

    case REG_FAILED:
    case LOGOUT:
    case NOT_LOADED:
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
