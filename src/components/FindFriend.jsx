import React from 'react'
import { useAuthContext } from '../context/AuthContext'
import { MdPersonAdd } from "react-icons/md";

const FindFriend = () => {
  const {allUsers,addFriend} = useAuthContext()
  console.log(allUsers)
  const reqFriend = (id) =>{

    addFriend(id)
  }
  return (
    <div>
     {allUsers&&
      allUsers.map((user,ind)=>{
        console.log(user._id)
        return (
          <div className="d-flex justify-content-between align-items-center my-2 " style={{ cursor: "pointer" }}>
            <div className='d-flex'>

          <img src="profile.png" alt="profile" className='' width="50px" />
          <p className='my-auto ms-2 text-dark fw-bold'>{user.userName}</p>
            </div>
            <div>
            <MdPersonAdd  className='fs-3 me-2 freqest' onClick={()=>reqFriend(user._id)}/>
            </div>
        </div>
        )
      })
     }
    </div>
  )
}

export default FindFriend
