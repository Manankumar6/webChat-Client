import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import { MdPersonAdd } from 'react-icons/md';


const ConnectedUser = ({handleSelectedUser}) => {

const {friends,removeFriend} = useAuthContext();

  return (
    <div className='ps-2'>
         {friends && friends.map((user) => {
              return (
                <>
                  <div className="d-flex justify-content-between align-items-center my-2 " style={{ cursor: "pointer" }} onClick={()=>handleSelectedUser(user)}>
                  <div className='d-flex'>

                    <img src="/profile.png" alt="profile" className='' width="50px" />
                    <p className='my-auto ms-2 text-dark fw-bold'>{user.userName}</p>
                  </div>
                  
                    <p onClick={()=>removeFriend(user._id)} >Unfollow <MdPersonAdd className='fs-5 mx-1 freqest' /></p> 
                  </div>
                    <hr />
                </>
              )
            })}
      
    </div>
  )
}

export default ConnectedUser
