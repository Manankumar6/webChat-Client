import React from 'react'
import { useAuthContext } from '../context/AuthContext'

const ConnectedUser = ({handleSelectedUser}) => {

const {friends} = useAuthContext();

  return (
    <div className='ps-2'>
         {friends && friends.map((user) => {
              return (
                <>
                  <div className="d-flex justify-content-start align-items-center my-2 " style={{ cursor: "pointer" }} onClick={()=>handleSelectedUser(user)}>

                    <img src="/profile.png" alt="profile" className='' width="50px" />
                    <p className='my-auto ms-2 text-dark fw-bold'>{user.userName}</p>
                  </div>
                    <hr />
                </>
              )
            })}
      
    </div>
  )
}

export default ConnectedUser
