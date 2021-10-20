import {
  ADD_IMAGE,
  WRONG_IMAGE,
  GET_IMAGE,
  DELETE_IMAGE,
  GET_PROFILE,
  GET_SIGNEDPROFILE,
  GET_ALLPROFILES,
  GET_PROFILESKILLS,
  GET_USERNAME,
  NO_USERNAME,
  UPDATE_PROFILE,
  UPDATE_FAILED,
  PROFILE_ERROR,
  CLEAN_PROFILE
} from "./types";

import { setAlert } from "./alert";
import api from "../utilities/api";

//Get Profile
export const getProfile = () => async (dispatch) => {
  try {
    //Sends the request to the profile/me using the API
    const res = await api.get("/profile/me");

    //If the token is there, do this
    dispatch({
      type: GET_SIGNEDPROFILE,
      payload: res.data,
    });
  } catch (err) {
    //If the token is not there, do this
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const cleanProfile = () => async (dispatch) => {
  dispatch({
    type: CLEAN_PROFILE,
  });
};

//Get ALL Profiles
export const getPeople = () => async (dispatch) => {
  try {
    //Sends the request to the profile/me using the API
    const res = await api.get("/profile");

    //If the token is there, do this
    dispatch({
      type: GET_ALLPROFILES,
      payload: res.data,
    });
  } catch (err) {
    //If the token is not there, do this
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get Profile by Username
export const getProfileByUsername = (username) => async (dispatch) => {

  try {
    const res = await api.get(`/profile/${username}`);
    //If the token is there, do this
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    //If the token is not there, do this
    dispatch({
      type: PROFILE_ERROR,
    });
  }
};

//Get userName
export const getUsernamebyID = (id) => async (dispatch) => {
  try {
    //Sends the request to the profile/username using the API
    const res = await api.get(`/profile/id/${id}`);
    //If the username is there, do this
    dispatch({
      type: GET_USERNAME,
      payload: res.data,
    });
  } catch (err) {
    //If the username is not there, do this
    dispatch({
      type: NO_USERNAME,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get Profile Skills
export const getProfileSkills = () => async (dispatch) => {
  try {
    //Sends the request to the profile/me using the API
    const res = await api.get("/profile/skills");
    //If the token is there, do this
    dispatch({
      type: GET_PROFILESKILLS,
      payload: res.data,
    });
  } catch (err) {
    //If the token is not there, do this
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Send Profile Data
export const profileData = (formData, edit: false) => async (dispatch) => {
  try {
    const res = await api.post("/profile", formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));
  } catch (err) {
    dispatch({
      type: UPDATE_FAILED,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    dispatch(setAlert("Could Not Update Profile", "danger"));

    console.log(err);

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

//Send Profile Skills
export const setProfileSkills = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/profile/skills", formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Skills Updated", "success"));
  } catch (err) {
    dispatch({
      type: UPDATE_FAILED,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    dispatch(setAlert("Could Not Update Skills", "danger"));

    console.log(err);

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

//Send Profile Links
export const profileLinks = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/profile/links", formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });

    dispatch(setAlert("Links Updated", "success"));
  } catch (err) {
    dispatch({
      type: UPDATE_FAILED,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    dispatch(setAlert("Could Not Update Links", "danger"));

    console.log(err);

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

//Send Profile Image
export const profileImage = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/profile/image", formData);

    dispatch({
      type: ADD_IMAGE,
      payload: res.data,
    });

    dispatch(setAlert("Profile Image Updated", "success"));
  } catch (err) {
    dispatch({
      type: WRONG_IMAGE,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    dispatch(setAlert("Wrong Image", "danger"));
    console.log(err);

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

// Get Profile Image
export const getProfileImage = (id) => async (dispatch) => {
  try {
    const config = {
      responseType: "blob",
    };

    const res = await api.get("/profile/image/", config);

    dispatch({
      type: GET_IMAGE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: WRONG_IMAGE,
    });
  }
};

// Delete profile image
export const deleteImage = () => async (dispatch) => {
  await api.delete("/profile/image/");

  dispatch({
    type: DELETE_IMAGE,
  });

  dispatch(setAlert("Image Removed", "danger"));
};
