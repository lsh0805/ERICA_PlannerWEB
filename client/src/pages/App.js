import React, {useState, useEffect} from 'react';
import './css/App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Main, Login, Register, Info, Todo, Achievement} from 'pages';
import { Topbar, Footer, AuthRoute } from 'components';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as cookie from '../module/cookie';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk  from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
toast.configure();

export default function App() {
  const [loginInfo, setLoginInfo] = useState({
    loaded: false,
    isLoggedIn : false,
    email: "",
    username: "",
    level: 0,
    exp: 0,
  });
  useEffect(() => {
    axios.get('/api/account/getInfo').then((res) => {
      setLoginInfo({loaded: true, isLoggedIn: true, email: res.data.info.email, username: res.data.info.username, level: res.data.info.level, exp: res.data.info.exp});
    }).catch(err => {
      setLoginInfo({loaded: true});
    })
  }, []);
  const handleLogout = () =>{
    axios.get('/api/account/logout').then(() => {
      cookie.setCookie(false, '');
      setLoginInfo({loaded: true, isLoggedIn: false, email: "", username: "", level: 0, exp: 0});
    }).catch((err) => {
        console.log(err);
    });
  }
  return (
      <div>
        {loginInfo.loaded ? 
        <Provider store={store}>
          <BrowserRouter>
            {/* 라우팅 */}
            <Route path="/" render={(props) => <Topbar {...props} loginInfo={loginInfo} handleLogout={handleLogout}/>} />
            <div className="contents">
              <Route exact path="/" component={Main}/>
              <AuthRoute isLoggedIn={loginInfo.isLoggedIn} path="/planner/info" render={props => <Info {...props} loginInfo={loginInfo} />}/>
              <AuthRoute isLoggedIn={loginInfo.isLoggedIn} path="/planner/todo" render={props => <Todo {...props} loginInfo={loginInfo} />}/>
              <AuthRoute isLoggedIn={loginInfo.isLoggedIn} path="/planner/achievement" render={props => <Achievement {...props} loginInfo={loginInfo} />}/>
              <Route path="/register" component={Register}/>
              <Route path="/login" component={Login}/>
            </div>
            <Route path="/" component={Footer}/>
          </BrowserRouter>
        </Provider>: "" // empty
        }
        
      </div>
  );
}