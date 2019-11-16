import React from 'react';
import './css/App.css';
import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Main, Login, Register } from 'pages';
import { Topbar, Footer } from 'components';
import { toast } from 'react-toastify';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));
toast.configure();

export default function App() {
  return (
      <div>
        <Provider store={store}>
          <BrowserRouter>
            {/* 라우팅 */}
            <Route path="/" component={Topbar}/>
            <div class="contents">
              <Route exact path="/" component={Main}/>
              <Route path="/register" component={Register}/>
              <Route path="/login" component={Login}/>
            </div>
            <Route path="/" component={Footer}/>
          </BrowserRouter>
        </Provider>
      </div>
  );
}