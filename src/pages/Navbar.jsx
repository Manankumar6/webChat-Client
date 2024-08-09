import { Button } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../context/AuthContext'

const Navbar = () => {
    const { isAuth, logOut, user } = useAuthContext();

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand fs-3 ps-4" to="/">webChat App</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse shadow-sm " id="navbarNavAltMarkup">
                        <div className="navbar-nav ms-auto gap-2">
                           {isAuth && <h5 className=' text-light my-auto' ><span style={{ color: "orange" }}>Hi,</span> {user && user.userName}</h5>
}

                            {isAuth ?
                                <NavLink className='nav-link'>

                                    <Button className=' fw-bold text-light  ' style={{ background: "#fb8500" }} onClick={logOut} >Log out</Button>
                                </NavLink>

                                : <>
                                    <NavLink to='/' className='nav-link'>
                                        <Button className=' text-light ' style={{ background: "transparent" }}>Join as guest</Button>
                                    </NavLink>
                                    <NavLink to='/signup' className='nav-link'>

                                        <Button className=' text-light ' style={{ background: "transparent" }}>Register</Button>
                                    </NavLink>
                                    <NavLink className='nav-link' to='/signup'>
                                        <Button className=' fw-bold text-light  ' style={{ background: "#fb8500" }}>Login</Button>
                                    </NavLink>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
