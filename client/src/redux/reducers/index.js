import {combineReducers} from 'redux'
import alert from './alert'
import authenticate from './inputs'

export default combineReducers({
  alert,
  authenticate
});
