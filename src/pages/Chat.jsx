import React, { useEffect, useState } from 'react'

import socketIo from 'socket.io-client'
import { user } from '../pages/Home'
import { IoSend } from "react-icons/io5";
import Button from '@mui/material/Button';
import Message from '../components/Message';
import ScrollToBottom from 'react-scroll-to-bottom';
let socket;
const Chat = () => {
  const secure_url = "https://webchat-server-ntze.onrender.com/"
  const [welcome, setWelcome] = useState()
  // const [joinMsg, setJoinMsg] = useState([])
  const [message, setMessage] = useState("")
  const [id, setId] = useState()
  const [chatMsg, setChatMsg] = useState([])
  console.log(chatMsg, "user object")



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
      // console.log("Socket Connected");
      setId(socket.id)
      // console.log("Emitting Joined Event with User:", user);
      socket.emit("joined", user);

    });
    socket.on("welcome", ({ message }) => {
      setWelcome(message)
    })
    socket.on("userJoined", (data) => {
      setChatMsg([...chatMsg, data])
      // console.log("Received User Joined Message:", data.message);
      // setJoinMsg((prevMsg) => [...prevMsg, data.message]);
    });

    socket.on("leave", (data) => {
      setChatMsg([...chatMsg, data])
      // console.log("User Left:", data.user, data.message);

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
      console.log(data.user, data.message, data.id)
      setChatMsg([...chatMsg, data])
      return () => {
        socket.off()
      }
    })
  }, [chatMsg])
  return (
    <div className='container-fluid p-0 '>
      <div className="row m-0 ">
        <div className="col-12 order-2 order-lg-1 col-lg-6 p-0">
          <img src="https://picsum.photos/800" className='img-fluid' alt="reandom imgae" />
        </div>
        <div className=" col-12 col-lg-6 order-1 order-lg-2 text-light p-0   " style={{ background: "#343a40", minHeight: "70vh" }}>
          <h2 className='text-center  p-3 shadow-lg'>Welcome to webChat app</h2>
          <div className="d-flex flex-column m-0 py-3">
            <p className='text-center  py-1 mx-auto rounded-pill' style={{ background: "#6c757d", width: "40%" }} >{welcome}</p>


          </div>
          <ScrollToBottom className="chatbox "  >

            {chatMsg && chatMsg.map((item, ind) => {
              return (
                <Message message={item.message} user={item.id===id?"":item.user} key={ind} position={item.id === id ? 'right' : 'left'}  />

              )
            })}
          </ScrollToBottom>

          <div className=" d-flex gap-3 mt-1 px-2" >
            <input onKeyDown={(e)=>e.key === "Enter"?sendMessage():null} value={message} onChange={(e) => { setMessage(e.target.value) }} type="text" placeholder='Send Message' className=' form-control p-3 bg-dark border-0 text-light ' />
            <Button onClick={sendMessage} variant="contained">{<IoSend />}</Button>
          </div>
        </div>
      </div>


    </div>
  )
}

export default Chat
