import React from "react";

import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";
import history from './history';
import * as serviceWorker from "./serviceWorker";

import "normalize.css";
import "./styles/index.scss";
import App from "./js/App.jsx";

import { createStore, compose, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import promise from 'redux-promise-middleware';
import { Provider } from "react-redux";
import allReducers from "./js/reducers";

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  allReducers,
  composeEnhancer(applyMiddleware(logger,thunk, promise)),
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  // applyMiddleware(logger(), promise())
);

render(
  <BrowserRouter history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
