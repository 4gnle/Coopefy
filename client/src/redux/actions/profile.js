import {
  ADD_IMAGE,
  WRONG_IMAGE,
} from './types'


//Send Profile Image
export const profileImage = (
  formData) => async dispatch => {

    try {

    const res = await api.post('/profile/image', formData);

    dispatch({
      type: ADD_IMAGE,
      payload: res.data
    });

    dispatch(
      setAlert("Profile Image Updated", 'primary')
    );

    }catch(err) {

    console.log(err);

    const errors = err.response.data.errors;

    if (errors) {
    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: WRONG_IMAGE,
      payload: { msg: err.response.statusText, status: err.response.status}
    });
  }
};

// Get Profile Image
export const getProfileImage = (id) => async dispatch => {
  try{

     const res = await api.get(`/profile/image/${id}`);

    dispatch({
      type: GET_GITHUB,
      payload: res.data
    });


  }catch (err) {

    dispatch({
      type: NO_REPOS
    });

  }
};

// Delete profile image
export const deleteImage = () => async dispatch => {

  try {

    const res = await api.delete('/profile/image/');

    dispatch({

      type: IMAGE_DELETED,

    });

    dispatch(setAlert('Image Removed', 'danger'));


  } catch (err) {

    dispatch({
      type: WRONG_IMAGE,
      payload: { msg: err.response.statusText, status: err.response.status}
    });

  }
};
