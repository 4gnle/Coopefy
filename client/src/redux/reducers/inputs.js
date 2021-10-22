import {
  LOGIN,
  // GOOGLELOGIN,
  // GOOGLELOGOUT,
  LOGOUT,
  REG_SUCCESS,
  REG_FAILED,
  LOADED,
  NOT_LOADED} from '../actions/types'

  const initialState = {
    token: localStorage.getItem('token'),
    isAuth: false,
    isLoad: true,
    userData: null
  };


export default function authenticate(state = initialState, action) {
  const {payload, type} = action;

  switch(type){
    case LOADED:
      return {
        ...state,
        isAuth: true,
        isLoad: false,
        userData: payload
      };
    // case GOOGLELOGIN:
    //   localStorage.getItem('token', payload.token)
    //   return {
    //     ...state
    //   }
    // case GOOGLELOGOUT:
    //   console.log(action.data)
    //   return {
    //     ...state,
    //     ...payload
    //   }
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
      isAuth: false,
      isLoad: false
    };

    default:
      return state;
  }
}
