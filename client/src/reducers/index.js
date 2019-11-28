import authentication from './authentication';
import planner from './planner';

import { combineReducers } from 'redux';

export default combineReducers({
  planner,  
  authentication,
});