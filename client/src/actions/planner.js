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
  PLAN_UPDATE_FAILURE
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
    dispatch(postPlan());
    return axios.post('/api/plan/post', {...data}).then((res) => {
      dispatch(postPlanSuccess(res.data.row));
    }).catch((err) => {
      dispatch(postPlanFailure(err));
    });
  }
} 

/* UPDATE */
export function updatePlanRequest(title, exp, id, completed){
  return (dispatch) => {
    dispatch(updatePlan());
    return axios.post('/api/plan/update', {title, exp, id, completed}).then((res) => {
      console.log(res);
      dispatch(updatePlanSuccess(res.data.row));
    }).catch((err) => {
      dispatch(updatePlanFailure(err));
    });
  }
} 


export function deletePlanRequest(id){
  return (dispatch) => {
    dispatch(deletePlan());
    axios.post('/api/plan/delete', {id}).then(() => {
      dispatch(deletePlanSuccess(id));
    }).catch(err => {
      dispatch(deletePlanFailure(err));
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

export function postPlan() {
  return {
      type: PLAN_POST
  };
}

export function postPlanSuccess(plan) {
  return {
      type: PLAN_POST_SUCCESS,
      plan
  };
}

export function postPlanFailure(error) {
  return {
      type: PLAN_POST_FAILURE,
      error
  };
}

export function updatePlan() {
  return {
      type: PLAN_UPDATE
  };
}

export function updatePlanSuccess(plan) {
  return {
      type: PLAN_UPDATE_SUCCESS,
      plan
  };
}

export function updatePlanFailure(error) {
  return {
      type: PLAN_UPDATE_FAILURE,
      error
  };
}

export function deletePlan() {
  return {
      type: PLAN_DELETE
  };
}

export function deletePlanSuccess(id) {
  return {
      type: PLAN_DELETE_SUCCESS,
      id
  };
}

export function deletePlanFailure(error) {
  return {
      type: PLAN_DELETE_FAILURE,
      error
  };
}