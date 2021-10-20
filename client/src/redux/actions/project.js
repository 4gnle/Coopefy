import {
  GET_PROJECT,
  GET_ALLPROJECTS,
  GET_PROJECTSKILLS,
  GET_PROJECTAPPLICATIONS,
  UPDATE_PROJECT,
  UPDATE_APPLICATION,
  UPDATE_FAILED,
  PROJECT_ERROR,
} from "./types";

import { setAlert } from "./alert";
import api from "../utilities/api";

//Post Project
export const postProject = (formData) => async (dispatch) => {
  try {
    const res = await api.post("/projects", formData);

    dispatch({
      type: UPDATE_PROJECT,
      payload: res.data,
    });

    dispatch(setAlert("Project Updated", "success"));
  } catch (err) {
    dispatch({
      type: UPDATE_FAILED,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    dispatch(setAlert("Could Not Update Project", "danger"));

    console.log(err);

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

//Get Projects
export const getProjects = () => async (dispatch) => {
  try {
    const res = await api.get("/projects");

    dispatch({
      type: GET_ALLPROJECTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Get Project by ID
export const getProjectById = (id) => async (dispatch) => {
  try {
    const res = await api.get(`/projects/${id}`);

    dispatch({
      type: GET_PROJECT,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Post Application
export const postApplication = (formData, id, edit: false) => async (
  dispatch
) => {
  try {
    const res = await api.post(`/projects/${id}/apply`, formData);

    dispatch({
      type: UPDATE_APPLICATION,
      payload: res.data,
    });

    dispatch(
      setAlert(edit ? "Updated Application" : "Added Application", "success")
    );
  } catch (err) {
    dispatch({
      type: UPDATE_FAILED,
      payload: { msg: err.response.statusText, status: err.response.status },
    });

    dispatch(
      setAlert(
        edit ? "Could not update application" : "Could not post application",
        "danger"
      )
    );

    console.log(err);

    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
    }
  }
};

//Get Applications by ID
export const getApplicationsbyID = (id) => async (dispatch) => {
  try {
    //Sends the request to the profile/me using the API
    const res = await api.get(`/projects/${id}/applications`);

    //If the token is there, do this
    dispatch({
      type: GET_PROJECTAPPLICATIONS,
      payload: res.data,
    });
  } catch (err) {
    //If the token is not there, do this
    dispatch({
      type: PROJECT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
