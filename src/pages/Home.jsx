import React, { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import TextField from '@mui/material/TextField';

let user;

const Home = () => {
  const closeModal = useRef();
  const [name, setName] = useState('');

  const handleSetName = () => {
    user = name;
    closeModal.current.click();
  };

  return (
    <div className='container-fluid landingpage text-light'>
      <div className="row">
        <div className="col-12 col-md-6 justify-content-center d-flex p-4 flex-column">
          <h1 style={{ fontSize: "3rem", width: "70%" }}>
            <span style={{ color: "#fb8500" }}>Connect</span> with your loves ones
          </h1>
          <h4>Cover a distance by our video call app</h4>
          <button 
            data-bs-toggle="modal" 
            data-bs-target="#exampleModal" 
            className='btn fs-5 mt-2 w-50 fw-bold text-light py-2' 
            style={{ background: "#fb8500" }}
          >
            Get Started
          </button>
        </div>
        <div className="col-12 col-md-6">
          <img src="mobile.png" alt="mobile" className='img-fluid' width='70%' />
        </div>
      </div>
      
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content" style={{ background: "#161a1d" }}>
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Join Chat Now</h5>
              <button ref={closeModal} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className='d-flex justify-content-center'>
                <img src="https://i.ibb.co/cvDTbp1/Chat.gif" alt="chatlogo" className='img-fluid my-3 rounded-3' width="50%" />
              </div>
              <TextField
                id="inputname"
                label="Enter Your Name"
                variant="outlined"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                InputProps={{
                  style: {
                    color: '#fff', // Text color
                  },
                }}
                InputLabelProps={{
                  style: { color: '#fff' }, // Label color
                }}
                className='bg-dark w-100 text-light'
              />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <NavLink to='/chat'>
                <button onClick={handleSetName} type="button" className="btn fw-bold" style={{ background: "orange" }}>Join</button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
export { user };
