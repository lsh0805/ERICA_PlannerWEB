import * as types from '../actions/ActionTypes';
import { Map, List, fromJS } from 'immutable';

const initialState = Map({
  userInfo: {
    email: "",
    nickname: "",
    level: 0,
    exp: 0,
    status: "INIT",
    error: "",
  }
});

export default function planner(state = initialState, action) {
  let planList = state.get('planList');
  switch(action.type) {
    /* GET */
    case types.USER_INFO_GET:
      return state.setIn(['userInfo', 'status'], 'WAITING');
    case types.USER_INFO_GET_SUCCESS:
      return state.set('userInfo', Map(action.userInfo)).setIn(['userInfo', 'status'], "SUCCESS");
    case types.USER_INFO_GET_FAILURE:
      return state.mergeIn(['userInfo'], { status: "FAILURE", error: action.error});
    /* UPDATE */
    case types.USER_INFO_UPDATE:
      return state.setIn(['userInfo', 'status'], 'WAITING');
    case types.USER_INFO_UPDATE_SUCCESS:
      return state.set('userInfo', Map(action.userInfo)).setIn(['userInfo', 'status'], "SUCCESS");
    case types.USER_INFO_UPDATE_FAILURE:
      return state.mergeIn(['userInfo'], { status: "FAILURE", error: action.error});
    default:
      return state;
  }
}