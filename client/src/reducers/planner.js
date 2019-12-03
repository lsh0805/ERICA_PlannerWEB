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
    date: List([]),
  }),
  update: Map({
    status: 'INIT',
    error: '',
    id: List([]),
  }),
  delete: Map({
    status: 'INIT',
    error: '',
    id: List([]),
  }),
});

export default function planner(state = initialState, action) {
  let planList = state.get('planList');
  let postDateList = state.getIn(['post', 'date']);
  let deleteIdList = state.getIn(['delete', 'id']);
  let updateIdList = state.getIn(['update', 'id']);
  const findPlanIndexByID = (id) => {
    let ret = -1;
    for(let i = 0; i < planList.size; i++)
      if(ret === -1 && planList.getIn([i, 'id']) === id){
        ret = i;
        return ret;
      }
    return ret; // -1 is notFound
  }
  const findIndexByPostDate = (date) => {
    let ret = -1;
    for(let i = 0; i < postDateList.size; i++)
      if(ret === -1 && postDateList.get(i) === date){
        ret = i;
        return ret;
      }
    return ret; // -1 is notFound
  }
  const findIndexByDeleteId = (id) => {
    let ret = -1;
    for(let i = 0; i < deleteIdList.size; i++)
      if(ret === -1 && deleteIdList.get(i) === id){
        ret = i;
        return ret;
      }
    return ret; // -1 is notFound
  }
  const findIndexByUpdateId = (id) => {
    let ret = -1;
    for(let i = 0; i < updateIdList.size; i++)
      if(ret === -1 && updateIdList.get(i) === id){
        ret = i;
        return ret;
      }
    return ret; // -1 is notFound
  }
  switch(action.type) {
    /* GET */
    case types.PLAN_GET:
      return state.setIn(['get', 'status'], 'WAITING');
    case types.PLAN_GET_SUCCESS:
      return state.set('planList', fromJS(action.planList)).setIn(['get', 'status'], "SUCCESS");
    case types.PLAN_GET_FAILURE:
      return state.mergeIn(['get'], { status: "FAILURE", error: action.error});
    /* POST */
    case types.PLAN_POST:
      return state.setIn(['post', 'status'], 'WAITING').setIn(['post', 'date'], postDateList.push(fromJS(action.date)));
    case types.PLAN_POST_SUCCESS:
      return state.set('planList', planList.push(Map(action.plan))).setIn(['post', 'status'], "SUCCESS").setIn(['post', 'date'], postDateList.delete(findIndexByPostDate(action.date)));
    case types.PLAN_POST_FAILURE:
      return state.mergeIn(['post'], { status: "FAILURE", error: action.error}).setIn(['post', 'date'], postDateList.delete(findIndexByPostDate(action.date)));
    /* UPDATE */
    case types.PLAN_UPDATE:
      return state.setIn(['update', 'status'], 'WAITING').setIn(['update', 'id'], updateIdList.push(action.id));
    case types.PLAN_UPDATE_SUCCESS:
      return state.setIn(['planList', findPlanIndexByID(action.plan.id)], Map(action.plan)).setIn(['update', 'status'], "SUCCESS").setIn(['update', 'id'], updateIdList.delete(findIndexByUpdateId(action.id)));
    case types.PLAN_UPDATE_FAILURE:
      return state.mergeIn(['update'], { status: "FAILURE", error: action.error}).setIn(['update', 'id'], updateIdList.delete(findIndexByUpdateId(action.id)));
    /* DELETE */
    case types.PLAN_DELETE:
      return state.setIn(['delete', 'status'], 'WAITING').setIn(['delete', 'id'], deleteIdList.push(action.id));
    case types.PLAN_DELETE_SUCCESS:
      return state.set('planList', planList.delete(findPlanIndexByID(action.id))).setIn(['delete', 'status'], "SUCCESS").setIn(['delete', 'id'], deleteIdList.delete(findIndexByDeleteId(action.id)));
    case types.PLAN_DELETE_FAILURE:
      return state.mergeIn(['delete'], { status: "FAILURE", error: action.error}).setIn(['delete', 'id'], deleteIdList.delete(findIndexByDeleteId(action.id)));
    default:
      return state;
  }
}