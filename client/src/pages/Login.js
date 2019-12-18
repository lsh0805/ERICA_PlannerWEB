import React from 'react';
import { Authentication } from '../components';
import { connect } from 'react-redux';
import { loginRequest } from 'actions/authentication';
import * as cookie from '../module/cookie';
import * as AuthenticationTypes from '../components/AuthenticationTypes';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }
  // API REQUEST
  handleLogin = (email, password, keepLogin) => {
    return this.props.loginRequest(email, password, keepLogin).then(() =>{
      if(this.props.status === "SUCCESS"){
        // create session data
        cookie.setCookie(true, email);
        window.location.replace('/');
        return {success: true};
      }else{
        return {success: false, error: this.props.errorMessage};
      }
    });
  }
  render(){
    return (
      <div>
        <Authentication mode={AuthenticationTypes.LOGIN} onLogin={this.handleLogin}/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      status: state.authentication.login.status,
      errorMessage: state.authentication.login.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginRequest:(email, password, keepLogin)=> {
        return dispatch(loginRequest(email, password, keepLogin));
      }
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);