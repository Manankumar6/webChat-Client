import React, { useEffect, useState } from 'react'

import socketIo from 'socket.io-client'
import { user } from '../pages/Home'
import { IoSend } from "react-icons/io5";
import Button from '@mui/material/Button';
import Message from '../components/Message';
import ScrollToBottom from 'react-scroll-to-bottom';
import { useNavigate } from 'react-router-dom';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
let socket;
const Chat = () => {
  const secure_url = "http://localhost:8000/"
  const [welcome, setWelcome] = useState()
  const [joinMsg, setJoinMsg] = useState([])
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [message, setMessage] = useState("")
  const [id, setId] = useState()
  const [chatMsg, setChatMsg] = useState([])
  const navigate = useNavigate();



  const sendMessage = () => {
    if (message !== "") {
      socket.emit('message', { message, id });
      setMessage('')
    }
  }


  useEffect(() => {
    // console.log("Establishing Socket Connection...");
    socket = socketIo(secure_url);

    socket.on("connect", () => {
      setId(socket.id)
      socket.emit("joined", user);

    });
    socket.on("welcome", ({ message }) => {
      setWelcome(message)
    })
    socket.on("userJoined", (data) => {
      setChatMsg(prevChatMsg => [...prevChatMsg, data]);

    });
    socket.on("previousMessages", (messages) => {
      setChatMsg(messages);
    });

    socket.on("leave", (data) => {
      setChatMsg(prevChatMsg => [...prevChatMsg, data]);
      // console.log("User Left:", data.user, data.message);

    });
    socket.on("connectedUsers", (users) => {
      // console.log("Connected Users:", users); // Debug log to verify updates
      setConnectedUsers(users);
    });

    // Clean up the socket connection on component unmount
    return () => {
      console.log("Disconnecting Socket...");
      socket.disconnect();
    };
    // eslint-disable-next-line
  }, [secure_url, user]);



  useEffect(() => {
    socket.on("sendMessage", (data) => {

      setChatMsg([...chatMsg, data])
      return () => {
        socket.off()
      }
    })
  }, [chatMsg])
  useEffect(() => {
    if (user === null || user === '') {
      navigate('/');
    }
    // eslint-disable-next-line 
  }, [user, navigate]);
  useEffect(()=>{
    if(!user){
      navigate("/")
    }
  })
  return (
    <div className='container-fluid p-0 mb-1'>

      <div className="row m-0 ">
        <div className="col-12 order-2 order-lg-1 col-lg-4 p-0">
          <p className=' fs-4 ps-2 m-0 py-3 text-light shadow-sm' style={{background: "#343a40"}}>Connected Users <KeyboardDoubleArrowRightIcon className='fs-3'/></p>
          {connectedUsers.map((user) => {
            return (<>
              <p className=' text-light m-0 pb-4 ps-3 fs-4 fw-bold' style={{ background: "#778da9" }}>{user.name}</p>
              <hr className='m-0 p-0' />
            </>
            )
          })}

          {/* <img src="https://picsum.photos/800" className='img-fluid' alt="reandom imgae" /> */}
        </div>
        <div className=" col-12 col-lg-8 order-1 order-lg-2 text-light p-0   " style={{ background: "#343a40", minHeight: "70vh" }}>
          <h2 className='text-center  p-3 shadow-lg'>Welcome to webChat app</h2>
          <div className="d-flex flex-column m-0 py-3">
            <p className='text-center  py-1 mx-auto rounded-pill' style={{ background: "#6c757d", width: "40%" }} >{welcome}</p>


          </div>
          <ScrollToBottom className="chatbox "  >

            {chatMsg && chatMsg.map((item, ind) => {
              return (
                <Message joinMsg={joinMsg} message={item.message} user={item.id === id ? "" : item.user} key={ind} position={item.id === id ? 'right' : 'left'} />

              )
            })}
          </ScrollToBottom>


          <div className=" d-flex gap-3 mt-1 px-2" >
            <input onKeyDown={(e) => e.key === "Enter" ? sendMessage() : null} value={message} onChange={(e) => { setMessage(e.target.value) }} type="text" placeholder='Send Message' className=' form-control p-3 bg-dark border-0 text-light mb-2' />
            <Button onClick={sendMessage} variant="contained" className='mb-2'>{<IoSend />}</Button>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Chat
