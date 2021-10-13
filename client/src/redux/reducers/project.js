import {
  GET_PROJECT,
  GET_ALLPROJECTS,
  GET_PROJECTSKILLS,
  UPDATE_PROJECT,
  UPDATE_APPLICATION,
  UPDATE_FAILED,
  PROJECT_ERROR
} from '../actions/types'

const initialState = {
project: null,
projectskills:null,
application: null,
applications: [],
projects:[],
loading: true,
error: {},
};

export default function project(state = initialState, action) {
  const {payload, type} = action;

  switch(type){
    case GET_PROJECT:
      return {
        ...state,
        project: payload,
        loading: false
      };

    case UPDATE_PROJECT:
    return {
      ...state,
      project: payload,
      loading: false
    };

    case UPDATE_APPLICATION:
    return {
      ...state,
      application: payload,
      loading: false
    };

    case GET_PROJECTSKILLS:
      return {
        ...state,
        projectskills: payload,
        loading: false
      };

    case UPDATE_FAILED:
    case PROJECT_ERROR:
      return {
        ...state,
        project: null,
        loading: false
      };

    case GET_ALLPROJECTS:
      return {
        ...state,
        projects: payload,
        loading: false
      };

    default:
      return state;
  }
}
