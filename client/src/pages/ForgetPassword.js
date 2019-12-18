import React, {useState} from 'react';
import * as AuthenticationTypes from '../components/AuthenticationTypes';
import axios from 'axios';
import { Authentication } from '../components';

const ForgetPassword = () => {
  const [emailSubmited, setEmailSubmited] = useState(false);
  const onSendMail = (email, password) => {
    return axios.post('/api/account/forgetPasswordSendMail', {email, password}).then(res => {
      setEmailSubmited(true);
      return {success: true};
    }).catch(error => {
      return {success: false, error: error.response.data.error};
    });
  }

  return (
    emailSubmited ? 
    <div className="container" style={{textAlign: "center"}}>
      <div className="wrapper" style={{width: "80%", textAlign: "left"}}>
        <div className="title" style={{display: "inline-block", fontSize:"24px", fontWeight: "bold", borderBottom:"2px #ddd solid"}}>
          비밀번호 초기화
        </div>
        <div className="contents" style={{marginTop: "20px"}}>
          이메일로 인증 메일이 전송되었습니다. 비밀번호 초기화를 위해 메일을 확인하여 링크를 클릭해주세요.
        </div>
      </div>
    </div>
      :<div>
        <Authentication mode={AuthenticationTypes.FORGET_PASSWORD} onSendMail={onSendMail}/>:
      </div>
  );
};

export default ForgetPassword;