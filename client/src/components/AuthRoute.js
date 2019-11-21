import React from 'react';
import { Route, Redirect } from 'react-router-dom';

function AuthRoute({ isLoggedIn, component: Component, render, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          render ? render(props) : <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login'/*, state: { from: props.location }*/ }}
          />
        )
      }
    />
  );
}

export default AuthRoute;