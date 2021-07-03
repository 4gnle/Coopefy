import axios from "axios";

export async function loginUser = ({email, password}) => async dispatch => {

  const body = JSON.stringify({email, password});

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const res = await axios.post('/api/auth', body, config

    dispatch({
      type: LOGIN,
      payload: res.data
     })

     dispatch (
       setAlert('Logged In', 'success')
     );

  } catch(err) {

    console.error(err.message)

    const errors = err.response.data.errors;
    if (errors) {
        errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({ type: LOGOUT })
    }
}


export async function logout = () => async dispatch => {
  const response = await axios.delete('/api/auth');

  return response.data.data;

  dispatch({ type: LOGOUT })
}
