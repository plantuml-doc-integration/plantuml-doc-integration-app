import React from 'react';
import ReactDOM from 'react-dom';
import App from './PlantDocApp';
import { BrowserRouter as Router } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  // [::1] is the IPv6 localhost address.
  window.location.hostname === '[::1]' ||
  // 127.0.0.0/8 are considered localhost for IPv4.
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/
  )
);
axios.defaults.baseURL = isLocalhost ? 'http://localhost:5000' : 'https://plantuml-doc-integration-api.herokuapp.com';

ReactDOM.render(
  <React.StrictMode>
    <Router><App /></Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
