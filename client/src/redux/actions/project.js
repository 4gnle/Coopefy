import {
  GET_PROJECT,
  GET_ALLPROJECTS,
  GET_PROJECTSKILLS,
  UPDATE_PROJECT,
  UPDATE_FAILED,
  PROJECT_ERROR
} from './types'

import {setAlert} from './alert'
import api from '../utilities/api'

//Post Project
export const postProject = (formData) => async dispatch => {

    try {

    const res = await api.post('/project', formData);

    dispatch({
      type: UPDATE_PROJECT,
      payload: res.data
    });

    dispatch(
      setAlert("Project Updated", 'success')
    );

    }catch(err) {

      dispatch({
        type: UPDATE_FAILED,
        payload: { msg: err.response.statusText, status: err.response.status}
      });

      dispatch(
        setAlert("Could Not Update Project", 'danger')
      );

    console.log(err);

    const errors = err.response.data.errors;

    if (errors) {
    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

  }
};
