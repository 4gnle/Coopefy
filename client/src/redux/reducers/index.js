import {combineReducers} from 'redux'
import alert from './alert'
import authenticate from './inputs'
import profile from './profile'
import project from './project'

export default combineReducers({
  alert,
  authenticate,
  profile,
  project
});
