import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
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
                            <button className='btn text-light ' style={{ background: "transparent" }}>Join as guest</button>
                            <button className='btn text-light ' style={{ background: "transparent" }}>Register</button>
                            <button className='btn fw-bold text-light  ' style={{ background: "#fb8500" }}>Login</button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
