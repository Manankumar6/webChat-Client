import React from 'react';

const Message = ({ message, position, user, joinMsg }) => {
  console.log(joinMsg,"join msg from message compom")
  return (<>
  

    <p className={`${position} fs-5 p-2 w-50 ms-4 rounded-3`}>
      {user  ? `${user} : ${message}` : `You : ${message}`}
      
    </p>
   
      
  </>
  );
};

export default Message;
