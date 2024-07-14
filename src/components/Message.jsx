import React from 'react';

const Message = ({ message, position, user, date }) => {

  return (<>

    <p className={`${position} fs-5 p-2 w-50 ms-4 rounded-3`}>
      {user ?
        <div>
          <p className='p-0 m-0 fs-6' style={{ color: "#c879ff" }}>{user}</p>
          <hr className='m-0 p-0' />
          <p className='mb-0 mt-1'>{message}</p>
          <p className='text-light text-end fs-6 mt-2 mb-0'>{date}</p>
        </div> :
        <div>

          <p className='mb-0 mt-1'>{message}</p>
          <p className='text-light text-end fs-6 mt-2 mb-0 '>{date}</p>

        </div>
      }
    </p>
  </>
  );
};

export default Message;
