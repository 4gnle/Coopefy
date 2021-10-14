import {
  ADD_IMAGE,
  WRONG_IMAGE,
  GET_IMAGE,
  DELETE_IMAGE,
  GET_PROFILE,
  GET_SIGNEDPROFILE,
  GET_PROFILESKILLS,
  UPDATE_PROFILE,
  CLEAN_PROFILE,
  GET_ALLPROFILES,
  UPDATE_FAILED,
  PROFILE_ERROR,
  GET_USERNAME,
  NO_USERNAME
} from '../actions/types'

const initialState = {
profile: null,
signedprofile: null,
profileimage: null,
skills:null,
profiles:[],
repos:[],
loading: true,
error: {},
username: null
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
      return {
        ...state,
        profile: payload,
        loading: false
      };

    case GET_SIGNEDPROFILE:
    case UPDATE_PROFILE:
    return {
      ...state,
      signedprofile: payload,
      loading: false
    };

    case GET_USERNAME:
      return {
        ...state,
        username: payload,
        loading: false
      };

    case NO_USERNAME:
      return {
        ...state,
        username: null,
        loading: false
      };

    case GET_PROFILESKILLS:
      return {
        ...state,
        skills: payload,
        loading: false
      };

    case CLEAN_PROFILE:
    return {
      ...state,
      profile: null,
      profileimage: null
    };

    case UPDATE_FAILED:
    case PROFILE_ERROR:
      return {
        ...state,
        profile: null,
        signedprofile: null,
        loading: false,
        username: null,
        profileimage: null,
        skills: null
      };

    case GET_ALLPROFILES:
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
