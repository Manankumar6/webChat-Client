import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useAuthContext } from '../context/AuthContext';

const Signup = () => {
    const { signUp, userData, handleInput,logIn } = useAuthContext();
    const { fullname, username, password } = userData;
    const [toggleForm, setToggleForm] = useState('signup')
    const handleSubmit = (e) => {
        e.preventDefault(); // Corrected typo: preventDefault() instead of preverntDefault()
        if(toggleForm === "signup"){

            signUp(fullname, username, password);
        }
        if(toggleForm === "signin"){
            logIn(username, password)
        }
    };

    return (
        <div className='container-fluid bg-dark' style={{ height: "100vh" }}>

            <div className="row">
                <div className="col-12 col-md-6 my-3 text-light">
                    <h1 className='text-center'>Real-Time Chat for Real-Life <span style={{ color: "orange" }}>Connections</span></h1>
                    <img className='img-fluid' src="hero.png" alt="img" />
                </div>
                <div className="col-12 col-md-6">
                    <div className="mx-auto ">

                        <div className="d-flex gap-3 mx-auto w-75 justify-content-center  p-2">
                            <Button
                                style={{ backgroundColor: toggleForm === 'signup' ? 'black' : 'transparent', width: '50%' }}
                                variant={toggleForm === 'signup' ? 'contained' : 'text'}
                                onClick={() => setToggleForm('signup')}
                            >
                                Sign up
                            </Button>
                            <Button
                                style={{ backgroundColor: toggleForm === 'signin' ? 'black' : 'transparent', width: '50%' }}
                                variant={toggleForm === 'signin' ? 'contained' : 'text'}
                                onClick={() => setToggleForm('signin')}
                            >
                                Sign in
                            </Button>

                        </div>
                    </div>
                    <form className='d-flex justify-content-center' onSubmit={handleSubmit}>
                        <div className="row w-75 text-light">
                            <h3 className='my-3'>Sign up</h3>

                           {toggleForm ==='signup'&& <div className="mb-3">
                                <TextField
                                    className='w-100 custom-textfield'
                                    required
                                    id="outlined-required"
                                    label="Full Name"
                                    name='fullname'
                                    value={fullname}
                                    onChange={handleInput}
                                />
                            </div>}
                            <div className="mb-3">
                                <TextField
                                    className='w-100 custom-textfield'
                                    required
                                    id="outlined-required"
                                    label="User Name"
                                    name='username'
                                    value={username}
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="mb-3">
                                <TextField
                                    className='w-100 custom-textfield'
                                    required
                                    id="outlined-required"
                                    label="Password"
                                    type="password"
                                    name='password'
                                    value={password}
                                    onChange={handleInput}
                                />
                            </div>

                            <Button className='mx-auto' variant='contained' type="submit" style={{ background: "orange", color: 'black', width: "96%" }}>Submit</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;
