import { Button } from '@mui/material';
import React from 'react';
import { LuReplyAll } from "react-icons/lu";
const Message = ({ message, position, user, onReply, replyTo,bg }) => {
  const formatTime = (date) => {
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  let date = formatTime(new Date());


  const handleReplyClick = () => {
    onReply(message, user);
  };




  return (
    <div className={`d-flex ${position}  `}>
      {position === 'right' &&
        <Button onClick={handleReplyClick} className="text-light rounded-circle my-auto" style={{ width: "35px", minWidth: "35px", height: "38px" }}>
          <LuReplyAll />
        </Button>
      }
      {user&&<p className='name_logo' style={{background:bg}}>{user.slice(0,1)}</p>}
      <div className={`${position === 'left' ? 'leftmsg' : 'rightmsg'} fs-6 mt-2 p-2 ms-2 me-2 ${position === 'left' ? 'received' : 'sent'}  `} style={{ width: "auto", maxWidth: "70%", minWidth: "150px" }}>

        {user ? (
          <div>
          
            <p className='p-0 m-0 fs-6' style={{ color: "#c879ff" }}>{user}</p>
            <hr className='m-0 p-0' />
            {replyTo && (
              <div className="  p-1 rounded-3" style={{ background: "#495057", borderLeft: '2px solid #ff0000' }}>
                <p className='m-0 fw-bold' style={{ color: "lightgray" }}>{replyTo.user ? replyTo.user : user}:</p>
                <p className='m-0' style={{ color: "lightgray" }}>{replyTo.message}</p>
              </div>
            )}
            <p className='mb-0 mt-1 '>{message}</p>
            <p className='text-light text-end mt-1 mb-0 ' style={{ fontSize: "13px" }}>{date}</p>
          </div>
        ) : (
          <div>
            {replyTo && (
              <div className="  p-1 rounded-3 " style={{ background: "#274c77", borderLeft: '2px solid #ff0000' }}>
                <p className='m-0 fw-bold' style={{ color: "lightgray" }}>{replyTo.user ? replyTo.user : 'You'}:</p>
                <p className='m-0' style={{ color: "lightgray" }}>{replyTo.message}</p>
              </div>
            )}
            <p className='mb-0 mt-1'>{message}</p>
            <p className='text-light text-end mt-1 mb-0' style={{ fontSize: "13px" }}>{date}</p>
          </div>
        )}
      </div>
      {position === 'left' && <Button onClick={handleReplyClick} className="text-light my-auto rounded-circle" style={{ width: "35px", minWidth: "35px", height: "38px" }}>
        <LuReplyAll style={{ transform: "rotate(180deg)" }} />
      </Button>}
    </div>
  );
};

export default Message;
