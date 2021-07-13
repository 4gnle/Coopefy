import {
  ADD_IMAGE,
  WRONG_IMAGE,
  GET_IMAGE,
  DELETE_IMAGE
} from './types'

import {setAlert} from './alert'
import authToken from '../utilities/authToken'
import api from '../utilities/api'

//Send Profile Image
export const profileImage = (formData) => async dispatch => {

    try {

    const res = await api.post('/profile/image', formData);

    dispatch({
      type: ADD_IMAGE,
      payload: res.data
    });

    dispatch(
      setAlert("Profile Image Updated", 'success')
    );

    }catch(err) {

      dispatch({
        type: WRONG_IMAGE,
        payload: { msg: err.response.statusText, status: err.response.status}
      });

      dispatch(
        setAlert("Wrong Image", 'danger')
      );

    console.log(err);

    const errors = err.response.data.errors;

    if (errors) {
    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

  }
};

// Get Profile Image
export const getProfileImage = (id) => async dispatch => {
  try{

     const res = await api.get(`/profile/image/${id}`);

    dispatch({
      type: GET_IMAGE,
      payload: res.data
    });


  }catch (err) {

    dispatch({
      type: WRONG_IMAGE
    });

  }
};

// Delete profile image
export const deleteImage = () => async dispatch => {

    const res = await api.delete('/profile/image/');

    dispatch({
      type: DELETE_IMAGE,
    });

    dispatch(setAlert('Image Removed', 'danger'));

};
