import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import money from "../assets/images/money.png"
import location from "../assets/images/location.png"
import clock from "../assets/images/clock.png"
import home_image from '../assets/images/home_image.jpg'
import search from "../assets/images/search.png"
import axios from "axios"
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation)
// import Home from '../../../Aaach/src/component/Home'

function Categorey({ category, setSearchTerm }) {
    const [jobs, setJobs] = useState(null);
    const [isLoadingProduct, setisLoadingProduct] = useState(true);
    const navigate = useNavigate()
    async function fetchData() {
        try {
            const response = await axios.get(`http://localhost:8000/api/jobs`);
            setJobs(response.data.data);
            setisLoadingProduct(false)
        } catch (error) {
            console.log('Error fetching data:', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);


    if (isLoadingProduct) {
        return <>
            <div className="loader">
                <lord-icon
                    src="https://cdn.lordicon.com/jpgpblwn.json"
                    trigger="loop"
                    state="loop-spin"
                    colors="primary:#198745"
                    style={{ width: "50px", height: "50px", display: "block", margin: "auto", marginTop: "20%" }}>
                </lord-icon>
            </div>
        </>
    }

    return (
        <>
            <div className="container blur"></div>
            <div className="info" style={{ margin: "auto" }}>
                <p style={{ opacity: "0.8", marginBottom: "30px", marginTop: "-20px" }}> <Link to="/" className="link" style={{ color: "white" }}>Home</Link>  / Category / {category}</p>
                <p style={{ opacity: "0.6" }}>A dream doesn't become reality through magic; it takes sweat, determination and hard work....</p>
                <form className="d-flex" onSubmit={(e) => {
                    e.preventDefault();
                    setSearchTerm(e.target.querySelector('input[type="search"]').value)
                    console.log(e.target.search.value);
                    navigate("/search")
                }}>
                    <input className="form-control me-2" type="search" placeholder="Search by job title, categorey, company" aria-label="Search" name="search" />
                    <button className="btn btn-outline-success" type="submit" >
                        {/* <img src={search} alt="" /> */}
                        <lord-icon
                            src="https://cdn.lordicon.com/unukghxb.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#ffffff,secondary:#e4e4e4"
                            style={{ width: "35px", height: "35px" }}
                        >
                        </lord-icon>
                    </button>
                </form>
            </div>
            <div className="jobs job-cat">
                {/* <div className="top-jobs"></div> */}
                {
                    jobs?.map((item) => {
                        return (<>
                            {item.categorey == category ?
                                <div className="top-jobs" id='top-jobs' style={{ top: "0px" }}>
                                    <div className="job-items">
                                        <div className="item-info">
                                            <div className="item-image">
                                                <Link to={`/${item._id}`}><img src={item.image} alt="img" style={{ width: "90px" }} /></Link>
                                            </div>
                                            <div className="item-content">
                                                <div className="main-meta">
                                                    <div className="title-link">
                                                        <strong><Link to={`/${item._id}`} className='link job-title' style={{ fontSize: "18px" }}>{item?.name} required.</Link></strong>
                                                        <h6 style={{ opacity: "0.8" }}>{item.company}</h6>
                                                    </div>
                                                </div>
                                                <div className="meta-bottom d-flex">
                                                    <div className="wraper type-wrap">
                                                        <span><img src={location} alt="" /> {item.location}</span>
                                                    </div>
                                                    <div className="wraper time-wrap">
                                                        <span className="time"><img src={clock} alt="" /> Full Time</span>
                                                    </div>
                                                    <div className="wraper price-wrap">
                                                        <span><img src={money} alt="" /> {item.offeredSalary == "Negotiable" || item.offeredSalary == "negotiable" ? item.offeredSalary : `Rs.${item.offeredSalary}`}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="apply-btn">
                                                <Link to={`/${item._id}`} className='app-link'><button>View Details</button></Link>
                                            </div>

                                        </div>
                                    </div>
                                </div > : null}
                        </>)
                    })
                }
            </div>
        </>

    )
}

export default Categorey
