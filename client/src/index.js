import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {App} from 'pages';

// Redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunk  from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'));
serviceWorker.unregister();