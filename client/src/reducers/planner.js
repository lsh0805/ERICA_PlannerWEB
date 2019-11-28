import * as types from '../actions/ActionTypes';
import { Map, List, fromJS } from 'immutable';

const initialState = Map({
  planList: fromJS([
    {
      key: '',
      id: '',
      author: '',
      title: '',
      exp: '',
      type: '',
      date: '',
      month: '',
      year: '',
      cycleMonday: false,
      cycleTuesday: false,
      cycleWednesday: false,
      cycleThursday: false,
      cycleFriday: false,
      cycleSaturday: false,
      cycleSunday: false,
      completed: false,
      editable: false,
    }
  ]),
  get: Map({
    status: 'INIT',
    error: '',
  }),
  post: Map({
    status: 'INIT',
    error: '',
  }),
  update: Map({
    status: 'INIT',
    error: '',
  }),
  delete: Map({
    status: 'INIT',
    error: '',
  }),
});

export default function planner(state = initialState, action) {
  const planList = state.get('planList');
  const findIndexByID = (id) => {
    for(let i = 0; i < planList.size; i++)
      if(planList.getIn([i, 'id']) === id)
        return i;
    return -1; // -1 is notFound
  }
  switch(action.type) {
    /* GET */
    case types.PLAN_GET:
      return state.setIn(['get', 'status'], 'WAITIMG');
    case types.PLAN_GET_SUCCESS:
      return state.set('planList', fromJS(action.planList)).setIn(['get', 'status'], "SUCCESS");
    case types.PLAN_GET_FAILURE:
      return state.mergeIn(['get'], { status: "FAILURE", error: action.error});
    /* POST */
    case types.PLAN_POST:
      return state.setIn(['post', 'status'], 'WAITIMG');
    case types.PLAN_POST_SUCCESS:
      return state.set('planList', planList.push(Map(action.plan))).setIn(['post', 'status'], "SUCCESS");
    case types.PLAN_POST_FAILURE:
      return state.mergeIn(['post'], { status: "FAILURE", error: action.error});
    /* UPDATE */
    case types.PLAN_UPDATE:
      return state.setIn(['update', 'status'], 'WAITING');
    case types.PLAN_UPDATE_SUCCESS:
      return state.setIn(['planList', findIndexByID(action.plan.id)], Map(action.plan)).setIn(['update', 'status'], "SUCCESS");
    case types.PLAN_UPDATE_FAILURE:
      return state.mergeIn(['update'], { status: "FAILURE", error: action.error}); 
    /* DELETE */
    case types.PLAN_DELETE:
      return state.setIn(['delete', 'status'], 'WAITIMG');
    case types.PLAN_DELETE_SUCCESS:
      return state.set('planList', planList.delete(findIndexByID(action.id))).setIn(['delete', 'status'], "SUCCESS");
    case types.PLAN_DELETE_FAILURE:
      return state.mergeIn(['delete'], { status: "FAILURE", error: action.error});
    default:
      return state;
  }
}