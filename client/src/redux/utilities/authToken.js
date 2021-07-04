import axios from 'axios'

const authToken = token => {

  if (token) {

    const res = axios.defaults.headers.common['x-auth-token']

  } else {

    delete axios.defaults.headers.common['x-auth-token']
  }
}

export default authToken;
