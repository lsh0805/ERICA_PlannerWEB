import React, { useEffect } from 'react';
import './css/App.css';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Main, Login, Register } from 'pages';
import { Topbar } from 'components';
import { toast } from 'react-toastify';
import '../components/css/Toast.css'
import { MdErrorOutline } from 'react-icons/md';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));
toast.configure();

export default function App() {
  const getToastAttr = (type) => {
    return {
      toastId: type,
      position: toast.POSITION.BOTTOM_CENTER,
    }
  }
  const SESSION_EXPIRED = 1;
  // 새로 고침 시 쿠키 값이 유효한지 판단함.
  useEffect(() => {
      // 쿠키 값 가져옴
      function getCookie(name) {
          var value = "; " + document.cookie;
          var parts = value.split("; " + name + "=");
          if (parts.length === 2) return parts.pop().split(";").shift();
      }

      // 쿠키로 로그인 정보 가져옴
      let loginData = getCookie('key');

      // 로그인 정보가 없을 시 종료
      if(typeof loginData === "undefined") return;

      // 로그인 데이터를 base64로 디코딩하고 JSON으로 parse
      loginData = JSON.parse(atob(loginData));

      // 로그인 하지 않았다면 종료.
      if(!loginData.isLoggedIn) return;

      // 쿠키 값이 유효한지 판단함.
      axios.get('/api/account/getInfo')
      .then(() => {})
      .catch((err) => {
        toast.error(<div className="toast_wrapper"><MdErrorOutline className="toast"/>세션이 만료되었습니다. 다시 로그인 해주세요.</div>, {
          ...getToastAttr(SESSION_EXPIRED)
        });
      }
    );
  }, []);

  return (
      <div>
        <Provider store={store}>
          <BrowserRouter>
            {/* 라우팅 */}
            <Route path="/" component={Topbar}/>
            <Route exact path="/" component={Main}/>
            <Route path="/register" component={Register}/>
            <Route path="/login" component={Login}/>
          </BrowserRouter>
        </Provider>
      </div>
  );
}