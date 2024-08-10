import React from 'react'

const ConnectedUser = ({connectedUsers}) => {
  return (
    <div>
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
  )
}

export default ConnectedUser
