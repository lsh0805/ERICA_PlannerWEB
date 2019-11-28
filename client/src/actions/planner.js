import {
  PLAN_POST,
  PLAN_POST_SUCCESS,
  PLAN_POST_FAILURE,
  PLAN_DELETE,
  PLAN_DELETE_SUCCESS,
  PLAN_DELETE_FAILURE,
  PLAN_GET,
  PLAN_GET_SUCCESS,
  PLAN_GET_FAILURE,
  PLAN_UPDATE,
  PLAN_UPDATE_SUCCESS,
  PLAN_UPDATE_FAILURE,
  PLAN_COMPLETE,
  PLAN_COMPLETE_FAILURE,
  PLAN_COMPLETE_SUCCESS,
} from './ActionTypes';
import axios from 'axios';
import * as planTypes from '../components/PlannerTypes';

/* GET where = mysql where 값 */
export function getPlanListRequest(author, type, where){
  return (dispatch) => {
    dispatch(getPlanList());
    switch (type){
      case planTypes.DAILY_PLAN:
        return axios.post('/api/plan/getPlans/', {...where, author, type}).then(planList => {
          dispatch(getPlanListSuccess(planList.data.row));
        }).catch(error => {
          dispatch(getPlanListFailure(error));
        });
      case planTypes.MONTHLY_PLAN:
        break;
      case planTypes.YEARLY_PLAN:
        break;
      case planTypes.LOOP_PLAN:
          break;
      default:
        break;
    }
  }
} 

/* POST data = {title, exp, date, completed, month, year, ...} */
export function postPlanRequest(data){
  return (dispatch) => {
    dispatch(postPlan(data.date));
    return axios.post('/api/plan/post', {...data}).then((res) => {
      dispatch(postPlanSuccess(data.date, res.data.row));
    }).catch((err) => {
      dispatch(postPlanFailure(data.date, err));
    });
  }
} 

/* UPDATE */
export function updatePlanRequest(title, exp, id, completed){
  return (dispatch) => {
    dispatch(updatePlan(id));
    return axios.post('/api/plan/update', {title, exp, id, completed}).then((res) => {
      dispatch(updatePlanSuccess(id, res.data.row));
    }).catch((err) => {
      dispatch(updatePlanFailure(id, err));
    });
  }
} 

/* DELETE */ 
export function deletePlanRequest(id){
  return (dispatch) => {
    dispatch(deletePlan(id));
    axios.post('/api/plan/delete', {id}).then(() => {
      dispatch(deletePlanSuccess(id));
    }).catch(err => {
      dispatch(deletePlanFailure(id, err));
    });
  }
}

export function getPlanList() {
  return {
      type: PLAN_GET
  };
}

export function getPlanListSuccess(planList) {
  return {
      type: PLAN_GET_SUCCESS,
      planList
  };
}

export function getPlanListFailure(error) {
  return {
      type: PLAN_GET_FAILURE,
      error
  };
}

export function postPlan(date) {
  return {
      type: PLAN_POST,
      date
  };
}

export function postPlanSuccess(date, plan) {
  return {
      type: PLAN_POST_SUCCESS,
      date, plan
  };
}

export function postPlanFailure(date, error) {
  return {
      type: PLAN_POST_FAILURE,
      date, error
  };
}

export function updatePlan(id) {
  return {
      type: PLAN_UPDATE,
      id
  };
}

export function updatePlanSuccess(id, plan) {
  return {
      type: PLAN_UPDATE_SUCCESS,
      id, plan
  };
}

export function updatePlanFailure(id, error) {
  return {
      type: PLAN_UPDATE_FAILURE,
      id, error
  };
}

export function deletePlan(id) {
  return {
      type: PLAN_DELETE,
      id
  };
}

export function deletePlanSuccess(id) {
  return {
      type: PLAN_DELETE_SUCCESS,
      id
  };
}

export function deletePlanFailure(id, error) {
  return {
      type: PLAN_DELETE_FAILURE,
      id, error
  };
}