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
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      Authorization: `Bearer ${token}`,
   },
});
export const unAuthorizedInstance = axios.create({
   baseURL: process.env.REACT_APP_BASE_URL,
   headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8;application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
   },
});



// export const options = {
//    broadcaster: 'pusher',
//    key: 'qwerty885522336699',
//    wsHost: '127.0.0.1',
//    encrypted: false,
//    wsPort: 6001,
//    wssPort: 6001,
//    forceTLS: false,
//    disableStats: true,
//    enabledTransports: ['ws', 'wss'],
//  };

export const options = {
   broadcaster: 'pusher',
   key: process.env.REACT_APP_PUSHER_KEY,
   wsHost: process.env.REACT_APP_PUSHER_WsHost,
   wsPort: process.env.REACT_APP_PUSHER_WsPort,
   wssPort: process.env.REACT_APP_PUSHER_WssPort,
   encrypted: false,
   forceTLS: false,
   disableStats: true,
   enabledTransports: ['ws', 'wss'],
};

//  const echo = new Echo(options);
// export const echo = new Echo(options);

// disableStats: true,
// enabledTransports: ['wss', 'wss'],

//  const echo = new Echo(options);
// export const echo = new Echo(options);
