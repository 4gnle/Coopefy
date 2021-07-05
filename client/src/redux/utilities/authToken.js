import api from './api'

const authToken = token => {

  if (token) {

    api.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('token', token);

  } else {
    
    api.defaults.headers.common['x-auth-token'] = null;
    localStorage.removeItem('token');
  }
}

export default authToken;
