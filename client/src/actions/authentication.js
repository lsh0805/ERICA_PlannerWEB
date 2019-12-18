import {
  AUTH_LOGIN,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
  AUTH_REGISTER,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAILURE
} from './ActionTypes';
import axios from 'axios';

/* LOGIN */
export function loginRequest(email, password, keepLogin) {
  return (dispatch) => {
    // Inform Login API is starting
    dispatch(login());
    // API REQUEST
    return axios.post('/api/account/login', { email, password, keepLogin })
    .then((response) => {
        // SUCCEED
        dispatch(loginSuccess(email));
    }).catch((error) => {
        // FAILED
        dispatch(loginFailure(error.response.data.err));
    });
  };
}

export function login() {
  return {
      type: AUTH_LOGIN
  };
}

export function loginSuccess(email) {
  return {
      type: AUTH_LOGIN_SUCCESS,
      email
  };
}

export function loginFailure(error) {
  return {
      type: AUTH_LOGIN_FAILURE,
      error
  };
}

export function registerRequest(email, nickname, password, password_check, alarm) {
  return (dispatch) => {
      // Inform Register API is starting
      dispatch(register());

      return axios.post('/api/account/checkAvailiableRegisterData', { email, nickname, password, password_check, alarm })
      .then((response) => {
          dispatch(registerSuccess(email));
      }).catch((error) => {
          dispatch(registerFailure(error.response.data.err));
      });
  };
}

export function register() {
  return {
      type: AUTH_REGISTER
  };
}

export function registerSuccess(email) {
  return {
      type: AUTH_REGISTER_SUCCESS,
      email
  };
}

export function registerFailure(error) {
  return {
      type: AUTH_REGISTER_FAILURE,
      error
  };
}