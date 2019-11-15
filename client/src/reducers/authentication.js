import * as types from '../actions/ActionTypes';
import update from 'react-addons-update';

const initialState = {
  login: {
    status: 'INIT',
    error: ''
  },
  register: {
    status: 'INIT',
    error: ''
  },
  status: {
    isLoggedIn: false,
    currentUser: '',
  }
};

export default function authentication(state = initialState, action) {
  switch(action.type) {
    /* LOGIN */
    case types.AUTH_LOGIN:
        return update(state, {
            login: {
                status: { $set: 'WAITING' }
            }
        });
    case types.AUTH_LOGIN_SUCCESS:
        return update(state, {
            login: {
                status: { $set: 'SUCCESS' }
            },
            status: {
                isLoggedIn: { $set: true },
                currentUser: { $set: action.email }
            }
        });
    case types.AUTH_LOGIN_FAILURE:
        return update(state, {
            login: {
                status: { $set: 'FAILURE' },
                error: { $set: action.error }
            }
        });
    /* REGISTER */ 
    case types.AUTH_REGISTER:
      return update(state, {
          register: {
              status: { $set: 'WAITING' },
              error: { $set: "" }
          }
      });
    case types.AUTH_REGISTER_SUCCESS:
        return update(state, {
            register: {
                status: { $set: 'SUCCESS' },
                currentUser: { $set: action.email }
            }
        });
    case types.AUTH_REGISTER_FAILURE:
        return update(state, {
            register: {
                status: { $set: 'FAILURE' },
                error: { $set: action.error }
            }
        });
    default:
      return state;
  }
}