import React, { useEffect, useRef, useState } from 'react';
import socketIo from 'socket.io-client';
import { user } from '../pages/Home';
import { IoSend } from "react-icons/io5";
import Button from '@mui/material/Button';
import Message from '../components/Message';
import ScrollToBottom from 'react-scroll-to-bottom';
import { useNavigate } from 'react-router-dom';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { FaLock } from "react-icons/fa";
import { TiAttachment } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import TextField from '@mui/material/TextField';
import { FaCircle } from "react-icons/fa6";

let socket;

const Chat = () => {
  const secure_url = process.env.NODE_ENV === 'production'
    ? 'https://webchat-server-ntze.onrender.com/'
    : 'http://localhost:5000/';
  const [welcome, setWelcome] = useState();
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [id, setId] = useState();
  const [chatMsg, setChatMsg] = useState([]);

  const navigate = useNavigate();
  const [replyingTo, setReplyingTo] = useState(null);
  const inputRef = useRef(null);


  const clr = ["#f6bd60", "#f28482", "#f5cac3", "#84a59d","#90e0ef","#c77dff"]
  const rndnum = Math.floor(Math.random() * clr.length)
  const randomClr = clr[rndnum];


  const userData = {
    user,
    bg: randomClr
  }

  useEffect(() => {
    socket = socketIo(secure_url);

    socket.on("connect", () => {
      setId(socket.id);
      socket.emit("guestJoined", userData);
    });

    socket.on("welcome", ({ message }) => {
      setWelcome(message);
    });

    socket.on("guestUserJoined", (data) => {
      setChatMsg(prevChatMsg => [...prevChatMsg, data]);
    });

    socket.on("previousMessages", (messages) => {
      setChatMsg(messages);
    });

    socket.on("leave", (data) => {
      setChatMsg(prevChatMsg => [...prevChatMsg, data]);
    });

    socket.on("connectedUsers", (users) => {
      setConnectedUsers(users);
    });

    return () => {
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, [secure_url]);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setChatMsg(prevChatMsg => [...prevChatMsg, data]);
      console.log(chatMsg,"chat msg f")
      const audio = new Audio('/incoming.mp3');
      audio.play();
    });

    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      socket.off();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const handleBackButton = (event) => {
      event.preventDefault();
      if (window.confirm("Are you sure you want to leave the chat?")) {
        navigate('/');
      }
    };

    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
    // eslint-disable-next-line
  }, [navigate]);

  useEffect(() => {
    if (user === null || user === '' || user === undefined) {
      navigate('/');
    }
    // eslint-disable-next-line
  }, [user, navigate]);

  const sendMessage = () => {
    if (message !== "") {
      socket.emit('message', { message, id, replyTo: replyingTo });
      setMessage('');
      setReplyingTo(null); // Reset replyingTo state after sending the message
    }
  };
  const handleReply = (message, user) => {
    setReplyingTo({ message, user });
  };
  useEffect(() => {
    if (replyingTo && inputRef.current) {
      inputRef.current.focus(); // Focus the input field when replying
    }
    // eslint-disable-next-line
  }, [replyingTo]);
  return (
    <div className='container-fluid p-0 mb-1'>
      <div className="row m-0">
        <div className="col-12 order-2 order-lg-1 col-lg-4 p-0" style={{ background: '#adb5bd' }}>
          <div className='d-flex gap-2 align-items-center justify-content-between fs-4 ps-2 m-0 py-3 text-light shadow-sm' style={{ background: "#343a40" }}>
            <div className='d-flex' >
              <p>Active Users </p>
              
              <p><KeyboardDoubleArrowRightIcon className='fs-3' /></p>
            </div>
            <div className='me-2'>
              <p className='fs-6 rounded-circle bg-light text-center fw-bold text-dark' style={{ width: "25px" }}>{connectedUsers.length} </p>
            </div>
          </div>
          { connectedUsers.map((user) => (
            
              <div key={user.name}>
                <p className='text-light m-0 pb-4 ps-3 fs-4 fw-bold' style={{ background: "#778da9" }}>
                  {user.name}
                  <p className='m-0 ms-1 p-0' style={{ fontSize: '10px' }}>
                    <span><FaCircle style={{ color: "#70e000" }} /></span> Online
                  </p>
                </p>
                <hr className='m-0 p-0' style={{ background: "#black" }} />
              </div>
         
          ))}
        </div>
        <div className="col-12 col-lg-8 order-1 order-lg-2 text-light p-0" style={{ background: "#343a40", minHeight: "70vh" }}>
          <h2 className='p-3 shadow-lg'>Hello, <span style={{ color: "#fb8500" }}>{welcome}</span></h2>
          <div className="d-flex flex-column m-0 py-3 ">
            <p className='text-center py-1 mx-auto rounded-3' style={{ background: "#6c757d", width: "70%" }}><FaLock style={{ fontSize: "13px" }} /> Messages are end-to-end encrypted.</p>
          </div>

          <ScrollToBottom className="chatbox">
            {chatMsg && chatMsg.map((item, ind) => (
              <Message
                bg={connectedUsers.find(user => user.name === item.user)?.bg || randomClr} // Updated to use `find` method for background color
                onReply={handleReply}
                message={item.message}
                user={item.id === id ? "" : item.user}
                key={ind}
                position={item.id === id ? 'right' : 'left'}
                replyTo={item.replyTo}
              />
            ))}
          </ScrollToBottom>

          {replyingTo && (
            <div className="d-flex replymsg mx-3">
              <div>

                <p>{replyingTo.user ? replyingTo.user : 'You'}</p>
                <p>{replyingTo.message}</p>
              </div>
              <div>
                <RxCross2 onClick={() => { setReplyingTo(null) }} style={{ position: "absolute", right: "5px" }} />
              </div>
            </div>
          )}
          <div className="d-flex gap-3 mt-1 px-2 mx-2">
            <div className="flex-grow-1">
              <TextField
                id="outlined-basic"
                label="Send Message"
                variant="outlined"
                inputRef={inputRef}
                onKeyDown={(e) => e.key === "Enter" ? sendMessage() : null}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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
              <Button color='primary' onClick={() => { sendMessage(); }} className='mb-2 rounded-circle p-0' style={{ width: "35px", minWidth: "35px", height: "38px" }}>
                <IoSend className='fs-4' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
