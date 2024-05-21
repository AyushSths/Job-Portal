import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink, useLocation } from 'react-router-dom'
import user_img from "../assets/images/user-2.png"
import { logout } from './redux/slice/userSlice';
import profile from "../assets/images/profile.png"
import logout_img from "../assets/images/logout.png"
import accounting from "../assets/images/accounting.png"
import it from "../assets/images/information-technology.png"
import education from "../assets/images/education.png"
import engineer from "../assets/images/engineer.png"
import management from "../assets/images/management.png"
import medical from "../assets/images/medical-symbol.png"
import music from "../assets/images/music.png"
import research from "../assets/images/research.png"
import toggler from "../assets/images/toggler.png"
import { useState } from 'react';
import { FaAlignLeft } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx"
import axios from 'axios';
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import { Collapse } from 'react-bootstrap';
// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

function Navbar({ setCondition, setCategory }) {

    const user = useSelector((redux_state) => redux_state.user?.value)
    // const user_s = useSelector((redux_store) => {
    //     return redux_store.user.value
    // })
    const dispatch = useDispatch()
    const handleLogout = () => {
        // localStorage.removeItem("access_token")
        dispatch(logout())
    }

    const [collapse, setCollapse] = useState(false)
    const [jobs, setJobs] = useState(null)

    function fetchData() {
        // axios.get("https://job-portal-drab-iota.vercel.app/api/jobs")
        // axios.get("http://localhost:8000/api/jobs")
        axios.get("https://job-portal-app-api-98as.onrender.com/api/jobs")
            .then(res => {
                console.log("data", res);
                setJobs(res.data.data)
            })
            .catch(err => {
                console.log("error", err);
            })
    }


    const location = useLocation();
    // Check if the current route is not the home route ("/")
    const isNotHome = location.pathname !== '/';

    // Set the condition in the App component based on the current route
    useEffect(() => {
        fetchData()
        setCondition(isNotHome);
    }, [setCondition, isNotHome]);

    const handleCategoryClick = (category) => {
        console.log("Clicked category:", category);
        setCategory(category);
    };
    return (
        <>
            <div className={`navibar   ${isNotHome ? 'bg-grey' : ''}`}>
                <div className={`main-section ${collapse ? 'n-collapse' : 'collapsed'}`}>
                    <nav className={`navbar navbar-expand-lg navbar-light  `}>
                        <div className="container-fluid">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setCollapse(!collapse)}>
                                <span >
                                    {/* <img src={toggler} alt="" /> */}
                                    {
                                        collapse ?
                                            <RxCross2 /> : <FaAlignLeft />
                                    }
                                </span>
                            </button>
                            {/* <NavLink className="navbar-brand" to="/" style={{ color: "#198745", fontWeight: "700" }}>Jobs Portal</NavLink> */}
                            <div>
                                <NavLink className={`navbar-brand ${isNotHome ? '' : 'logo'}`} to="/" style={{ color: "#dbfbe8", fontWeight: "700" }}>
                                    <lord-icon
                                        // src="https://cdn.lordicon.com/rhprarly.json"
                                        // trigger="hover"
                                        // stroke="bold"
                                        // colors="primary:#198745,secondary:#198745"
                                        className="lord-icon"
                                        src="https://cdn.lordicon.com/kfmfikzu.json"
                                        trigger="hover"
                                        stroke="bold"
                                        state="hover-rotate-up-to-down"
                                        colors="primary:#198745,secondary:#d1faf0"
                                        style={{ width: "45px", height: "45px", marginRight: "5px" }}>
                                    </lord-icon>
                                    <span>Jobs Portal</span>
                                </NavLink>
                            </div>

                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className={`navbar-nav  ${isNotHome ? '' : 'items'}`}>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" aria-current="page" to="/">Home
                                            <span className='line'></span>
                                        </NavLink>
                                    </li>
                                    {
                                        user?.role === "job-seeker" ?
                                            <li className="nav-item">
                                                <NavLink className="nav-link" to="/apply">Applied
                                                    <span className='line'></span>
                                                </NavLink>
                                            </li> : user?.role === "company" ?
                                                <li className="nav-item">
                                                    <NavLink className="nav-link" to="/posted">Posted
                                                        <span className='line'></span>
                                                    </NavLink>
                                                </li> : null
                                    }
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/">About
                                            <span className='line'></span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/">Contact us
                                            <span className='line'></span>
                                        </NavLink>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Browse Jobs
                                        </NavLink>
                                        <div className="dropdown-menu nav-categorey" aria-labelledby="navbarDropdown">
                                            {/* <table>
                                                <tbody>
                                                    <tr>
                                                        <td><Link className="dropdown-item" to="/categorey" onClick={() => handleCategoryClick('Accounting')}><img src={accounting} alt="" /> Accounting / Finance ({jobs?.filter(job => job?.categorey === "Accounting").length})</Link></td>
                                                        <td><Link className="dropdown-item" to="/categorey" onClick={() => handleCategoryClick('It')}><img src={it} alt="" /> Information technology ({jobs?.filter(job => job?.categorey === "It").length})</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <td><Link className="dropdown-item" to="/categorey" onClick={() => handleCategoryClick('Education')}><img src={education} alt="" /> Education / Training ({jobs?.filter(job => job?.categorey === "Education").length})</Link></td>
                                                        <td><Link className="dropdown-item" to="/categorey" onClick={() => handleCategoryClick('Research')}><img src={research} alt="" /> Reseach / Consultancy ({jobs?.filter(job => job?.categorey === "Research").length})</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <td><Link className="dropdown-item" to="/categorey" onClick={() => handleCategoryClick('Hr')}><img src={management} alt="" /> Human Resource ({jobs?.filter(job => job?.categorey === "Hr").length})</Link></td>
                                                        <td><Link className="dropdown-item" to="/categorey" onClick={() => handleCategoryClick('Medical')}><img src={medical} alt="" /> Medical / Pharmacy ({jobs?.filter(job => job?.categorey === "Medical").length})</Link></td>
                                                    </tr>
                                                    <tr>
                                                        <td><Link className="dropdown-item" to="/categorey" onClick={() => handleCategoryClick('Music')}><img src={music} alt="" /> Music / Arts ({jobs?.filter(job => job?.categorey === "Music").length})</Link></td>
                                                        <td><Link className="dropdown-item" to="/categorey" onClick={() => handleCategoryClick('Engineer')}><img src={engineer} alt="" /> Engineer / Architects ({jobs?.filter(job => job?.categorey === "Engineer").length})</Link></td>
                                                    </tr>
                                                </tbody>
                                            </table> */}
                                            <div className="cat-section">
                                                <div className="right-cat-section">
                                                    <p><Link className="dropdown-item" to="/categorey" onClick={() => handleCategoryClick('Accounting')}><img src={accounting} alt="" /> Accounting / Finance ({jobs?.filter(job => job?.categorey === "Accounting").length})</Link></p>
                                                    <p><Link className="dropdown-item" to="/categorey" onClick={() => handleCategoryClick('It')}><img src={it} alt="" /> Information technology ({jobs?.filter(job => job?.categorey === "It").length})</Link></p>
                                                    <p><Link className="dropdown-item" to="/categorey" onClick={() => handleCategoryClick('Education')}><img src={education} alt="" /> Education / Training ({jobs?.filter(job => job?.categorey === "Education").length})</Link></p>
                                                    <p><Link className="dropdown-item" to="/categorey" onClick={() => handleCategoryClick('Research')}><img src={research} alt="" /> Reseach / Consultancy ({jobs?.filter(job => job?.categorey === "Research").length})</Link></p>
                                                </div>
                                                <div className="left-cat-section">
                                                    <p><Link className="dropdown-item" to="/categorey" onClick={() => handleCategoryClick('Hr')}><img src={management} alt="" /> Human Resource ({jobs?.filter(job => job?.categorey === "Hr").length})</Link></p>
                                                    <p><Link className="dropdown-item" to="/categorey" onClick={() => handleCategoryClick('Medical')}><img src={medical} alt="" /> Medical / Pharmacy ({jobs?.filter(job => job?.categorey === "Medical").length})</Link></p>
                                                    <p><Link className="dropdown-item" to="/categorey" onClick={() => handleCategoryClick('Music')}><img src={music} alt="" /> Music / Arts ({jobs?.filter(job => job?.categorey === "Music").length})</Link></p>
                                                    <p><Link className="dropdown-item" to="/categorey" onClick={() => handleCategoryClick('Engineer')}><img src={engineer} alt="" /> Engineer / Architects ({jobs?.filter(job => job?.categorey === "Engineer").length})</Link></p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>

                                </ul>

                            </div>

                        </div>
                    </nav>
                    <div className="nav-right">
                        <div className={`rightSide-nav ${isNotHome ? '' : 'items'} ${collapse ? 'top' : ''}`}>
                            <div className="nav-item user">
                                {
                                    user ?
                                        <>
                                            <div className="dropdown" style={{ marginTop: "7px" }}>
                                                <Link className="" style={{ textDecoration: "none" }} to="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {/* <img src={user_img} />  */}
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/hrjifpbq.json"
                                                        trigger="hover"
                                                        colors="primary:#e4e4e4"
                                                        style={{ width: "32px", height: "32px" }}>
                                                    </lord-icon>
                                                    <span className='user_name' style={{ color: "#dcd9d9", marginLeft: "5px", position: "relative", top: "-11px" }}>{user?.uname}</span>
                                                </Link>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" style={{ padding: "10px" }}>
                                                    <li id='wel' style={{ textAlign: "center" }}>
                                                        <p><b>Welcome</b></p>

                                                        {
                                                            user ? <><span style={{ display: "block" }} id="uname">
                                                                {/* <img src={profile} style={{ display: "block", margin: "auto", width: "50px", marginBottom: "5px" }} /> */}
                                                                <lord-icon
                                                                    src="https://cdn.lordicon.com/hrjifpbq.json"
                                                                    trigger="hover"
                                                                    colors="primary:#198745"
                                                                    style={{ width: "75px", height: "75px", display: "block", margin: "auto" }}>
                                                                </lord-icon>
                                                                {user?.uname}
                                                                <span classNameName='' style={{ fontSize: "18px", marginLeft: "5px" }}>({user?.role}</span>)</span>
                                                                <p style={{ opacity: "0.7" }}>{user?.email}</p> </> :
                                                                <></>
                                                        }

                                                        <hr />
                                                    </li>
                                                    <li>
                                                        {
                                                            user
                                                            &&
                                                            <span className="dropdown-item" onClick={handleLogout} style={{ cursor: "pointer" }}>
                                                                <img src={logout_img} style={{ marginRight: "20px" }} />Logout</span>
                                                        }
                                                    </li>
                                                </ul>
                                            </div>
                                        </> :
                                        <div className='user_profile'>
                                            <NavLink to="/login">
                                                <lord-icon
                                                    className="pro"
                                                    src="https://cdn.lordicon.com/hrjifpbq.json"
                                                    trigger="hover"
                                                    colors="primary:#e4e4e4"
                                                    style={{ width: "32px", height: "32px", marginTop: "7px" }}>
                                                </lord-icon>
                                            </NavLink>
                                            <div className="user_name">
                                                <NavLink className="nav-link" to="/login">
                                                    {/* <img src={user_img} alt="" /> */}
                                                    <span>Login /</span>
                                                </NavLink>
                                                <NavLink className="nav-link" to="/register" >Register</NavLink>
                                            </div>
                                        </div>
                                }

                            </div>
                            <div className="post">

                                {
                                    user?.role === "company" ?
                                        <Link className='post-link' to='/post'>
                                            <button className='post-btn'><lord-icon
                                                src="https://cdn.lordicon.com/fowixcuo.json"
                                                trigger="hover"
                                                colors="primary:#ffffff"
                                                style={{ width: "23px", height: "23px" }}>
                                            </lord-icon><label>Post job</label></button></Link> : null
                                    // user?.role === "job-seeker" ?
                                    //     <Link className='post-link' to='/login' onClick={() => {
                                    //         alert("User role is not company. Please login into a job-seeker account.")
                                    //     }}><button className='post-btn'><lord-icon
                                    //         src="https://cdn.lordicon.com/fowixcuo.json"
                                    //         trigger="hover"
                                    //         colors="primary:#ffffff"
                                    //         style={{ width: "23px", height: "23px" }}>
                                    //     </lord-icon><label>Post job</label></button>
                                    //     </Link> :
                                    //     <Link className='post-link' to='/login'><span><lord-icon
                                    //         src="https://cdn.lordicon.com/fowixcuo.json"
                                    //         trigger="hover"
                                    //         colors="primary:#ffffff"
                                    //         style={{ width: "23px", height: "23px" }}>
                                    //     </lord-icon><label>Post job</label></span>
                                    //     </Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}

export default Navbar
