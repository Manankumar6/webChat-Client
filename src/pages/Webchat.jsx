import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { IoSend } from 'react-icons/io5';
import { TiAttachment } from 'react-icons/ti';
import ScrollToBottom from 'react-scroll-to-bottom';
import socketIo from 'socket.io-client';
import { HiDotsVertical } from "react-icons/hi";

import { useAuthContext } from '../context/AuthContext';
import Message from '../components/Message';
import { NavLink } from 'react-router-dom';
import ConnectedUser from '../components/ConnectedUser';
import FindFriend from '../components/FindFriend';
let socket;
const Webchat = () => {
  const secure_url = process.env.NODE_ENV === 'production'
    ? 'https://webchat-server-ntze.onrender.com/'
    : 'http://localhost:5000/';
  const { user } = useAuthContext();

  let username = user.userName;
  const [message, setMessage] = useState("");
  const [id, setId] = useState();
  const [chatMsg, setChatMsg] = useState([])
  const [selectedUser, setSelectedUser] = useState()
  const [connectedUsers, setConnectedUsers] = useState([]);

  const [joinuser, setJoinUser] = useState([])
  const [privateMessages, setPrivateMessages] = useState([]);
  const [welcome, setWelcome] = useState();
  const [findFriend, setFindFriend] = useState(false)


  const clr = ["#f6bd60", "#f28482", "#f5cac3", "#84a59d", "#90e0ef", "#c77dff"]
  const rndnum = Math.floor(Math.random() * clr.length)
  const randomClr = clr[rndnum];

  const userData = {
    username,
    bg: randomClr
  }

  const handleSelectedUser = (user) => {
    setSelectedUser(user)
    console.log(user, "from webchat")
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
    if (message !== "") {
      socket.emit('login_user_msg', { message, id });
      setMessage('');
    
      // setReplyingTo(null); // Reset replyingTo state after sending the message
    }
  };
  useEffect(() => {
    socket.on("receiveMsg", (data) => {
      console.log(data)
      setChatMsg(prevChatMsg => [...prevChatMsg, data]);
      const audio = new Audio('/incoming.mp3');
      audio.play();
    });
  }, [])

  return (
    <div className='container-fluid'>
      <div className="row" >
        <div className="col-12 order-2 order-lg-1 col-lg-4 p-0 text-light" style={{ background: '#adb5bd' }}>


          {/* Chat header  */}
          <div className='d-flex  flex-column ps-2'>

            <div className="d-flex justify-content-between align-items-center" >
              <h4 className='text-dark fs-4 fw-bold py-2 cursor-pointer' onClick={() => setFindFriend(false)}>Chats</h4>
              <h4 className='text-dark fs-4 fw-bold py-2 cursor-pointer' onClick={() => setFindFriend(true)}>Find Friends</h4>
              <h4 className='text-dark'><HiDotsVertical /></h4>

            </div>
            {/* search bar  */}
            <input className='form-control' type="text" placeholder='Search' />
          </div>



          {/* Connected user show  */}
          <div>
            {
              findFriend ?
                <FindFriend /> :
                <ConnectedUser connectedUsers={user.friends} handleSelectedUser={handleSelectedUser} />
            }

          </div>
        </div>


        {/* Chat section  */}

        <div className="col-12 col-lg-8 order-1 order-lg-2 text-light p-0" style={{ background: "#343a40", minHeight: "70vh" }}>

          {/* Image on empty message will show  */}

          {chatMsg.length === 0 &&
            <div className="d-flex  align-items-center flex-column">

              <img src="/Conversation.gif" width="50%" className=' img-fluid ' alt="gif" />
              <div className='text-muted text-center'>

                <h4 className="fw-bold">Your Conversations Await!</h4>
                <p>Don't miss out on the fun. Start chatting now and connect with friends in real-time!</p>
                <p>Click "Find Friends" to discover new connections or revisit old ones. The conversation starts with you!</p>
              </div>
            </div>
          }

          {/* selected user details  */}
         {selectedUser&& <>
         <div className="d-flex  align-items-center p-3 shadow-lg">

          <img src="/profile.png" alt="profile" className='img-fluid' width="40px" />
          <div className="d-flex flex-column ms-3">

         <h4>{selectedUser.fullName}</h4>
         <p style={{fontSize:"12px"}}>username : {selectedUser.userName}</p>
          </div>
         </div>
         </>
         }
          {/* Chatting section  */}

          {chatMsg.length > 0 && <ScrollToBottom className="chatbox">
            {chatMsg && chatMsg.map((item, ind) => (

              <Message
                bg={connectedUsers.find(user => user.name === item.loginUser)?.bg || randomClr} // Updated to use `find` method for background color
                // onReply={handleReply}
                message={item.message}
                user={item.id === id ? "" : item.loginUser}
                key={ind}
                position={item.id === id ? 'right' : 'left'}
              // replyTo={item.replyTo}
              />
            ))}
          </ScrollToBottom>}

          {/* Input section  */}

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
              <Button color='primary' className='mb-2 rounded-circle p-0' onClick={() => { sendMessage(); }} style={{ width: "35px", minWidth: "35px", height: "38px" }}>
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
