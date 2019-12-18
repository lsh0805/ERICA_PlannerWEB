import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function AuthRoute({ isLoggedIn, isToAuthentication, component: Component, render, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isToAuthentication ?
        // 목적지가 계정인증을 하는 곳인데 이미 로그인 되어있다면 인덱스 화면으로 리다이렉션
        (isLoggedIn ? (
          <Redirect
            to={{ pathname: '/' }}
          />
        ) : (
          render ? render(props) : <Component {...props} />
        ))
        :
        // 목적지가 계정인증이 필요한 곳이면 로그인 확인 후 리다이렉션
        (isLoggedIn ? (
          render ? render(props) : <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login'/*, state: { from: props.location }*/ }}
          />
        ))
      }
    />
  );
}

export default AuthRoute;