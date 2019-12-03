import authentication from './authentication';
import planner from './planner';
import user from './user';

import { combineReducers } from 'redux';

export default combineReducers({
  planner,  
  authentication,
  user,
});