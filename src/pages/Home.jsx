import React, { useRef } from 'react'
import { NavLink } from 'react-router-dom';
let user;


const Home = () => {
  const closeModal = useRef()
const setName = ()=>{
  user = document.getElementById("inputname").value;
  
  closeModal.current.click();
}

  return (
    <div className='container-fluid landingpage text-light'>
     
      <div className="row">
        <div className=" col-12 col-md-6 justify-content-center d-flex p-4 flex-column">
          <h1 style={{ fontSize: "3rem", width: "70%" }}><span style={{ color: "#fb8500" }}>Connect</span> with your loves ones</h1>
          <h4>Cover a distance by our video call app </h4>
         

            <button data-bs-toggle="modal" data-bs-target="#exampleModal" className='btn fs-5 mt-2 w-50 fw-bold text-light py-2' style={{ background: "#fb8500",  }}>Get Started</button>
        
        </div>
        <div className="col-12 col-md-6 ">
          <img src="mobile.png" alt="mobile" className='img-fluid ' width='70%' />
        </div>
      </div>
      {/* <!-- Button trigger modal --> */}
     
      {/* 
<!-- Modal --> */}
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" >
        <div class="modal-dialog" >
          <div class="modal-content" style={{background:"#161a1d"}}>
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Join Chat Now</h5>
              <button ref={closeModal} type="button" class="btn-close " data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body ">
              
          <div className='d-flex justify-content-center'>

              <img src="chat.gif" alt="chatlogo"  className='img-fluid my-3  rounded-3 ' width="50% " />
          </div>
             
              <input type="text" placeholder='Enter Your Name' id='inputname' className=' py-2 bg-dark text-light form-control'/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <NavLink to='/chat'>

              <button onClick={setName} type="button" class="btn fw-bold" style={{background:"orange"}}>Join</button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
export {user}