import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ThemeProvider} from '@mui/material/styles';
import {theme} from "./utils/Theme";
import {Provider} from "react-redux";
import index from "./store";
import {BrowserRouter} from "react-router-dom";


ReactDOM.render(
  // <React.StrictMode>
      <Provider store={index}>
          <ThemeProvider theme={theme}>
              <BrowserRouter>
                <App />
              </BrowserRouter>
          </ThemeProvider>
      </Provider>,
  /* </React.StrictMode>, */
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
