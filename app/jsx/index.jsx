import '../scss/web.scss';
import React, {Component} from "react";
import ReactDOM from "react-dom";
import App from './app.jsx';

  function component() {
    var element = document.createElement('div');
    element.id = 'root';

    return element;
  }

  document.body.appendChild(component());
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );