import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './components/routes.js';
import history from './components/history';

ReactDOM.render(
    <Router history={history}>
        <App />
    </Router>,
    document.getElementById("app")
);