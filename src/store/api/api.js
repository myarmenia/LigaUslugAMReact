import axios from 'axios';
import Echo from 'laravel-echo';
// import Cookies from "universal-cookie";
import Pusher from 'pusher-js';

// const token = localStorage.getItem("token")
//   ? localStorage.getItem("token")
//   : null;
const token = localStorage.getItem('token') || null;

export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type':
      'application/x-www-form-urlencoded; charset=UTF-8;application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    Authorization: `Bearer ${token}`,
  },
});
export const unAuthorizedInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Content-Type':
      'multipart/form-data; application/x-www-form-urlencoded; charset=UTF-8;application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
  },
});

// const cookies = new Cookies();
export const options = {
  broadcaster: 'pusher',
  key: 'asdf',
  wsHost: 'backend.ligauslug.ru',
  encrypted: false,
  wsPort: 6001,
  wssPort: 6001,
  forceTLS: false,
  disableStats: true,
  // enabledTransports: ['wss', 'wss'],
};

//  const echo = new Echo(options);
// export const echo = new Echo(options);

  // disableStats: true,
  // enabledTransports: ['wss', 'wss'],



//  const echo = new Echo(options);
// export const echo = new Echo(options);
