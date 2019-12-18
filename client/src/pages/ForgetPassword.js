import React from 'react';
import * as AuthenticationTypes from '../components/AuthenticationTypes';
import axios from 'axios';
import { Authentication } from '../components';

const ForgetPassword = () => {
  const onSendMail = (email, password) => {
    axios.post('/api/account/forgetPasswordSendMail', {email, password}).then(res => {
      console.log(res);
    }).catch(err => {
      console.log(err);
    });
  }

  return (<div>
    <Authentication mode={AuthenticationTypes.FORGET_PASSWORD} onSendMail={onSendMail}/>
  </div>);
};

export default ForgetPassword;