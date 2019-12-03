import {
  USER_INFO_GET,
  USER_INFO_GET_SUCCESS,
  USER_INFO_GET_FAILURE,
  USER_INFO_UPDATE,
  USER_INFO_UPDATE_FAILURE,
  USER_INFO_UPDATE_SUCCESS,
} from './ActionTypes';
import axios from 'axios';
import { getApplyLevel } from '../module/level';

export function getUserInfoRequest(email){
  return (dispatch) => {
    dispatch(getUserInfo());
    return axios.post('/api/account/getUserInfo/', {email}).then(res => {
      dispatch(getUserInfoSuccess(res.data.row));
    }).catch(error => {
      dispatch(getUserInfoFailure(error));
    });
  }
}

export function updateUserInfoRequest(email, newLevel, newEXP){
  [newLevel, newEXP] = getApplyLevel(newLevel, newEXP);
  return (dispatch) => {
    dispatch(updateUserInfo());
    return axios.post('/api/account/updateUserInfo', {email, newLevel, newEXP}).then((res) => {
      dispatch(updateUserInfoSuccess(res.data.row));
    }).catch((err) => {
      dispatch(updateUserInfoFailure(err));
    });
  }
} 

export function getUserInfo() {
  return {
      type: USER_INFO_GET
  };
}

export function getUserInfoSuccess(userInfo) {
  return {
      type: USER_INFO_GET_SUCCESS,
      userInfo
  };
}

export function getUserInfoFailure(error) {
  return {
      type: USER_INFO_GET_FAILURE,
      error
  };
}

export function updateUserInfo() {
  return {
      type: USER_INFO_UPDATE,
  };
}

export function updateUserInfoSuccess(userInfo) {
  return {
      type: USER_INFO_UPDATE_SUCCESS,
      userInfo
  };
}

export function updateUserInfoFailure(error) {
  return {
      type: USER_INFO_UPDATE_FAILURE,
      error
  };
}