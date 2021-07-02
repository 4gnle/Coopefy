import {
  LOGIN,
  LOGOUT} from '../../redux/actions/types'

import React, {useState, useEffect} from 'react'
import axios from 'axios'

//Redux
import {connect} from 'react-redux'
import {setAlert} from '../../redux/actions/alert'

const AuthContext = React.createContext({
  isLoggedIn: null,
  onLogin: () => {},
  onLogout: (email, password) => {}
});

export const AuthContextProvider = (props, {setAlert}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const logsInUser = localStorage.getItem('loggedIn');

    if (logsInUser === 'yes') {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => async dispatch => {

    const body = JSON.stringify(email, password);
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

      try {
        const res = await axios.post('/api/auth', body, config);

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


  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('loggedIn');
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler
      }}

        {...props}
    />
  )
}

export default connect(null, {setAlert})(AuthContext)
