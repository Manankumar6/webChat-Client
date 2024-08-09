// socket.js
import { io } from 'socket.io-client';

const secure_url = process.env.NODE_ENV === 'production'
  ? 'https://webchat-server-ntze.onrender.com/'
  : 'http://localhost:5000/';

const socket = io(secure_url, { withCredentials: true });

export default socket;
