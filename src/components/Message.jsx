import React from 'react';

const Message = ({ message, position, user }) => {
  const formatTime = (date) => {
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  let date = formatTime(new Date());

  // const messageRef = useRef(null);

  // let startX = 0;
  // let startY = 0;
  // let distX = 0;
  // let distY = 0;

  // const handleTouchStart = (e) => {
  //   const touchobj = e.changedTouches[0];
  //   startX = touchobj.pageX;
  //   startY = touchobj.pageY;
  // };

  // const handleTouchMove = (e) => {
  //   const touchobj = e.changedTouches[0];
  //   distX = touchobj.pageX - startX;
  //   distY = touchobj.pageY - startY;
  // };

  // const handleTouchEnd = () => {
  //   // Determine swipe direction based on absolute values of distX and distY
  //   if (Math.abs(distX) > Math.abs(distY)) {
  //     if (distX > 0) {
  //       // Swipe right: Implement replay message logic
  //       console.log('Swipe right to replay message');
  //       onSwipe('right', message); // Pass the message to parent component
  //     } else {
  //       // Swipe left: Implement any other action
  //       console.log('Swipe left');
  //       // Implement any other action for left swipe if needed
  //     }
  //   }
  //   // Reset variables after touch end
  //   startX = 0;
  //   startY = 0;
  //   distX = 0;
  //   distY = 0;
  // };

  return (
    <div className={`d-flex ${position}`}>
      <p className={`${position === 'left' ? 'leftmsg' : 'rightmsg'} fs-6 p-2 ms-2 me-2 rounded-3`} style={{ width: "auto", maxWidth: "50%", minWidth: "150px" }}>
        {user ? (
          <div>
            <p className='p-0 m-0 fs-6' style={{ color: "#c879ff" }}>{user}</p>
            <hr className='m-0 p-0' />
            <p className='mb-0 mt-1'>{message}</p>
            <p className='text-light text-end mt-1 mb-0' style={{ fontSize: "13px" }}>{date}</p>
          </div>
        ) : (
          <div>
            <p className='mb-0 mt-1'>{message}</p>
            <p className='text-light text-end mt-1 mb-0' style={{ fontSize: "13px" }}>{date}</p>
          </div>
        )}
      </p>
    </div>
  );
};

export default Message;
