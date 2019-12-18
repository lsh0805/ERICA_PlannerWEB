import React, {useState, useEffect} from 'react';
import './css/App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Main, Login, Register, ForgetPassword, Info,
   Todo, Description, Privacy, Verify} from 'pages';
import { Topbar, Footer, AuthRoute } from 'components';
import { toast } from 'react-toastify';
import axios from 'axios';
import * as cookie from '../module/cookie';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfoRequest } from 'actions/user';

toast.configure();

export default function App() {
  const [loginInfo, setLoginInfo] = useState({
    loaded: false,
    isLoggedIn : false,
    email: "",
    username: "",
  });
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.user.toJS().userInfo);

  useEffect(() => {
    axios.post('/api/account/getSessionInfo').then((res) => {
      dispatch(getUserInfoRequest(res.data.info.email));
      setLoginInfo({loaded: true, isLoggedIn: true, email: res.data.info.email, username: res.data.info.username});
    }).catch(err => {
      setLoginInfo({loaded: true, isLoggedIn: false, email: "", username: ""});
    })
  }, [dispatch]);
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
          <BrowserRouter>
            {/* 라우팅 */}
            <Route path="/" render={(props) => <Topbar {...props} userInfo={userInfo} loginInfo={loginInfo} handleLogout={handleLogout}/>} />
            <div className="contents">
              <Route exact path="/" component={Main}/>
              <Route path="/description" component={Description}/>
              <Route path="/privacy" component={Privacy}/>
              <Route path={`/verify/:token`} component={Verify}/>
              <AuthRoute isLoggedIn={loginInfo.isLoggedIn} isToAuthentication={false} path="/planner/info" render={props => <Info {...props} userInfo={userInfo} loginInfo={loginInfo} />}/>
              <AuthRoute isLoggedIn={loginInfo.isLoggedIn} isToAuthentication={false} path="/planner/todo" render={props => <Todo {...props} userInfo={userInfo} loginInfo={loginInfo} />}/>
              <AuthRoute isLoggedIn={loginInfo.isLoggedIn} isToAuthentication={true} path="/register" component={Register}/>
              <AuthRoute isLoggedIn={loginInfo.isLoggedIn} isToAuthentication={true} path="/login" component={Login}/>
              <AuthRoute isLoggedIn={loginInfo.isLoggedIn} isToAuthentication={true} path="/forget" component={ForgetPassword}/>
            </div>
            <Route path="/" component={Footer}/>
          </BrowserRouter>: "" // empty
        }
        
      </div>
  );
}