import {
  LOGIN,
  LOGOUT,
  REG_SUCCESS,
  REG_FAILED} from '../actions/types'

  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    loading: true,
    user: null
  };

export default function login(state = initialState, action) {
  const {payload, type} = action;

  switch(type){
    case LOGIN:
      return [...state, payload];

    case LOGOUT:
      return state. ;

    default:
      return state;
  }
}


export default function register(state = initialState, action) {
  const {payload, type} = action;

  switch(type){
    case REG_SUCCESS:
      localStorage.getItem('token', payload.token)
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };

    case REG_FAILED:
      localStorage.removeItem('token');
      
      return {
      ...state,
      token: null,
      isAuthenticated: true,
      loading: false
    };

    default:
      return state;
  }
}
