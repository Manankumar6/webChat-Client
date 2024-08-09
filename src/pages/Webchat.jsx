import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { IoSend } from 'react-icons/io5';
import { TiAttachment } from 'react-icons/ti';
import ScrollToBottom from 'react-scroll-to-bottom';
import socketIo from 'socket.io-client';
import { HiDotsVertical } from "react-icons/hi";

import { useAuthContext } from '../context/AuthContext';
import Message from '../components/Message';
let socket;
const Webchat = () => {
  const secure_url = process.env.NODE_ENV === 'production'
    ? 'https://webchat-server-ntze.onrender.com/'
    : 'http://localhost:5000/';
  const { user } = useAuthContext();

  let username = user.userName;
  const [message, setMessage] = useState("");
  const [id,setId] = useState();
  const [chatMsg,setChatMsg] = useState([])
  console.log(chatMsg)
  const [connectedUsers, setConnectedUsers] = useState([]);
  console.log(connectedUsers,"connected user")
  const [joinuser, setJoinUser] = useState([])
  const [privateMessages, setPrivateMessages] = useState([]);
  const [welcome, setWelcome] = useState();


const clr = ["#f6bd60", "#f28482", "#f5cac3", "#84a59d","#90e0ef","#c77dff"]
const rndnum = Math.floor(Math.random() * clr.length)
const randomClr = clr[rndnum];

const userData = {
  username,
  bg: randomClr
}
  useEffect(() => {
    socket = socketIo(secure_url);
    socket.on("connect", () => {
      setId(socket.id);
      socket.emit("login", userData)
      socket.on("userjoin", (data) => {
        setJoinUser(preData => [...preData, data])
      })
      socket.on("connectedUser", (data) => {
    setConnectedUsers(data)
      })
     });

    socket.on("welcome", ({ message }) => {
      setWelcome(message);
    });

    socket.on("privateMessage", (data) => {
      setPrivateMessages(prevMessages => [...prevMessages, data]);
    });
    return () => {
      socket.off("privateMessage");
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, [secure_url]);

  const sendMessage = () => {
    if (message !== "" ) {
      socket.emit('message', { message, id });
      setMessage('');
      // setReplyingTo(null); // Reset replyingTo state after sending the message
    }
  };
useEffect(()=>{
  socket.on("sendMessage", (data) => {
    setChatMsg(prevChatMsg => [...prevChatMsg, data]);
    const audio = new Audio('/incoming.mp3');
    audio.play();
  });
},[])

  return (
    <div className='container-fluid'>
      <div className="row">
        <div className="col-4 text-light" style={{ background: '#adb5bd' }}>
          <div className="d-flex justify-content-between align-items-center" >

            <h4 className='text-dark fs-2 fw-bold py-2'>Chats</h4>
            <h4 className='text-dark'><HiDotsVertical /></h4>

          </div>
          <input className='form-control' type="text" placeholder='Search' />
          {connectedUsers && connectedUsers.map((user) => {
            return (
              <>
                <div className="d-flex justify-content-start align-items-center my-2 " style={{ cursor: "pointer" }}>

                  <img src="/profile.png" alt="profile" className='' width="50px" />
                  <p className='my-auto ms-2 text-dark fw-bold'>{user.name}</p>
                </div>
              </>
            )
          })}
        </div>
        <div className="col-8 text-light" style={{ background: "#343a40", minHeight: "70vh" }}>
           {chatMsg.length === 0 && <img src="/Conversation.gif" width="50%" className='ms-5 img-fluid border border-4' alt="gif" />}

          <ScrollToBottom className="chatbox">
          {chatMsg && chatMsg.map((item, ind) => (
            // console.log(item,"getting data ")
              <Message
                bg={connectedUsers.find(user => user.name === item.loginUser.username)?.bg || randomClr} // Updated to use `find` method for background color
                // onReply={handleReply}
                message={item.message}
                user={item.id === id ? "" : item.loginUser.username}
                key={ind}
                position={item.id === id ? 'right' : 'left'}
                // replyTo={item.replyTo}
              />
            ))}
          </ScrollToBottom>
          <div className="d-flex gap-3 mt-1 px-2 mx-2">
            <div className="flex-grow-1">
              <TextField
                id="outlined-basic"
                label="Send Message"
                variant="outlined"
                // inputRef={inputRef}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter'}
                type="text"
                InputProps={{
                  style: {
                    color: '#fff', // Text color
                  }
                }}
                InputLabelProps={{
                  style: { color: '#fff' }, // Label color
                }}
                className=' bg-dark w-100   mb-2'
              />
            </div>
            <div className="d-flex align-items-center">
              <Button className='mb-2 rounded-circle me-2 p-0' style={{ width: "35px", minWidth: "35px", height: "38px", color: "#fff" }}>
                <TiAttachment className='fs-4' />
              </Button>
              <Button color='primary' className='mb-2 rounded-circle p-0' onClick={() => { sendMessage(); }}  style={{ width: "35px", minWidth: "35px", height: "38px" }}>
                <IoSend className='fs-4' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Webchat
