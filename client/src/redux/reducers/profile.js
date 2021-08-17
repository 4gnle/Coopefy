import {
  ADD_IMAGE,
  WRONG_IMAGE,
  GET_IMAGE,
  DELETE_IMAGE,
  GET_PROFILE,
  GET_PROFILESKILLS,
  UPDATE_PROFILE,
  GET_PROFILES,
  UPDATE_FAILED,
  PROFILE_ERROR
} from '../actions/types'

const initialState = {
profile: null,
profileimage: null,
skills:null,
profiles:[],
repos:[],
loading: true,
error: {}
};

export default function profile(state = initialState, action) {
  const {payload, type} = action;

  switch(type){

    case ADD_IMAGE:
    case GET_IMAGE:
      return {
        ...state,
        profileimage: payload,
        loading: false
      }

    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false
      };

    case GET_PROFILESKILLS:
      return {
        ...state,
        skills: payload,
        loading: false
      }

    case UPDATE_FAILED:
    case PROFILE_ERROR:
      return {
        ...state,
        profile: null,
        loading: false
      };

    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false
      };

    case WRONG_IMAGE:
    case DELETE_IMAGE:
      return {
      ...state,
      profileimage: null,
      loading: false
      };

    default:
      return state;
  }
}
