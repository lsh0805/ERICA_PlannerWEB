import * as types from '../actions/ActionTypes';
import { Map } from 'immutable';

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

export default function user(state = initialState, action) {
  switch(action.type) {
    /* GET */
    case types.USER_INFO_GET:
        console.log(action.userInfo);
      return state.setIn(['userInfo', 'status'], 'WAITING');
    case types.USER_INFO_GET_SUCCESS:
      console.log(action.userInfo);
      return state.set('userInfo', Map(action.userInfo)).setIn(['userInfo', 'status'], "SUCCESS");
    case types.USER_INFO_GET_FAILURE:
        console.log(action.userInfo);
      return state.mergeIn(['userInfo'], { status: "FAILURE", error: action.error});
    /* UPDATE */
    case types.USER_INFO_UPDATE:
        console.log(action.userInfo);
      return state.setIn(['userInfo', 'status'], 'WAITING');
    case types.USER_INFO_UPDATE_SUCCESS:
      console.log(action.userInfo);
      return state.set('userInfo', Map(action.userInfo)).setIn(['userInfo', 'status'], "SUCCESS");
    case types.USER_INFO_UPDATE_FAILURE:
        console.log(action.userInfo);
      return state.mergeIn(['userInfo'], { status: "FAILURE", error: action.error});
    default:
      return state;
  }
}