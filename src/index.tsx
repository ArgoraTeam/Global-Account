import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CssBaseline from '@material-ui/core/CssBaseline';
import { C_appVersionTag } from './constants';
import { BannerS } from './style/components/common';

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    {C_appVersionTag[0].search(/[-dev]/g) > -1 && <BannerS>DEVELOPMENT VERSION</BannerS>}
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
