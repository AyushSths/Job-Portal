import React from 'react'
import { useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom'
import user from "../assets/images/user-2.png"

function Navbar({ setCondition }) {
    const location = useLocation();

    // Check if the current route is not the home route ("/")
    const isNotHome = location.pathname !== '/';

    // Set the condition in the App component based on the current route
    useEffect(() => {
        setCondition(isNotHome);
    }, [setCondition, isNotHome]);
    return (
        <>
            <div className="navibar">
                <nav className={`navbar navbar-expand-lg navbar-light ${isNotHome ? 'bg-grey' : ''}`}>
                    <div className="container-fluid">
                        <NavLink className="navbar-brand" to="/" style={{ color: "#198745" }}>Jobs Portal</NavLink>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to="/">Home
                                        <span className='line'></span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/about">Blog
                                        <span className='line'></span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/about">About
                                        <span className='line'></span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/about">Contact us
                                        <span className='line'></span>
                                    </NavLink>
                                </li>
                                <li className="nav-item dropdown">
                                    <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Services
                                    </NavLink>
                                    {/* <span className='line'></span> */}
                                    <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                        <li><NavLink className="dropdown-item" to="#">Action</NavLink></li>
                                        <li><NavLink className="dropdown-item" to="#">Another action</NavLink></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><NavLink className="dropdown-item" to="#">Something else here</NavLink></li>
                                    </ul>
                                </li>
                                <li className="nav-item user">
                                    <NavLink className="nav-link" to="/login" style={{ display: "inline" }}><img src={user} alt="" /> Login /</NavLink>
                                    <NavLink className="nav-link" to="/register" style={{ display: "inline" }}>Register</NavLink>
                                </li>
                                <li className="post">
                                    <NavLink className='post-link'>Post a job</NavLink>
                                </li>
                            </ul>

                        </div>
                    </div>
                </nav>
            </div>
        </>

    )
}

export default Navbar
