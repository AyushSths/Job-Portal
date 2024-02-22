import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import money from "../../assets/images/money.png"
import location from "../../assets/images/location.png"
import clock from "../../assets/images/clock.png"
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import imgError from "../../assets/images/ImgnotFound.jpg"

import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

function SearchJobs({ setCategory, setSearchTerm, search_term }) {

    const [type, setType] = useState("top")
    const [isLoadingProduct, setisLoadingProduct] = useState(true);
    const [jobs, setJobs] = useState({})
    const navigate = useNavigate()
    console.log("Search_term", search_term);

    function fetchData() {
        axios.get(`http://localhost:8000/api/jobs/search?search_term=${search_term}`)
            .then(res => {
                console.log("Searched data", res);
                setJobs(res.data.data)
                setisLoadingProduct(false)
            })
            .catch(err => {
                console.log("error", err);
            })
    }
    useEffect(() => {
        fetchData()
    }, [search_term])


    function handleJobTpye(jobtype) {
        setType(jobtype)
    }

    if (isLoadingProduct) {
        return <>
            <div className="loader">
                <lord-icon
                    src="https://cdn.lordicon.com/unukghxb.json"
                    trigger="loop"
                    state="loop-spin"
                    stroke="bold"
                    colors="primary:#198745"
                    style={{ width: "80px", height: "80px", display: "block", margin: "auto", marginTop: "20%" }}>
                </lord-icon>
            </div>
        </>
    }

    return (
        <>
            <div className="container blur"></div>
            <div className="info" style={{ margin: "auto" }}>
                <p style={{ opacity: "0.8", marginBottom: "30px", marginTop: "-20px" }}> <Link to="/" className="link" style={{ color: "white" }}>Home</Link>  / Search results for : {search_term}</p>
                <p style={{ opacity: "0.6" }}>A dream doesn't become reality through magic; it takes sweat, determination and hard work....</p>
                <form className="d-flex" onSubmit={(e) => {
                    e.preventDefault();
                    setSearchTerm(e.target.querySelector('input[type="search"]').value)
                    console.log(e.target.search.value);
                    navigate("/search")
                }}>
                    <input className="form-control me-2" type="search" placeholder="Search by job title, categorey, company" aria-label="Search" name="search" reqired />
                    <button className="btn btn-outline-success" type="submit" >
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
            <div className="section-list job-cat" style={{ position: "relative" }}>
                <div className="section-titles" style={{ display: "flex", justifyContent: "space-between" }}>
                    <h5>Searched jobs : {search_term}</h5>
                    <ul className="tab-menu" style={{ display: "flex" }}>
                        <li className="menu-item"><a className='item-link' href="#top-jobs" onClick={() => handleJobTpye('top')}>Top jobs</a></li>
                        <li className="menu-item"><Link className='item-link' to="#hot-jobs" onClick={() => handleJobTpye('hot')}>Hot jobs</Link></li>
                        <li className="menu-item"><Link className='item-link' to="#featured-jobs" onClick={() => handleJobTpye('featured')} >Featured jobs</Link></li>
                        <li className="menu-item"><Link className='item-link' to="#normal-jobs" onClick={() => handleJobTpye('normal')}>Normal jobs</Link></li>
                    </ul>
                </div>
                <div className="jobs">
                    {
                        jobs.length != 0 ?
                            jobs?.map((item) => {
                                // console.log("Image URLs:", item?.image);
                                return (<>
                                    {item.type == type ?
                                        <div className="top-jobs" key={item._id}>
                                            <div className="job-items">
                                                <div className="item-info">
                                                    <div className="item-image">
                                                        <Link to={`/${item._id}`}><img src={item.image[0] || imgError} alt="img" style={{ width: "90px" }} /></Link>
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

                                        </div > : null
                                    }
                                </>)
                            }) : (<section class="page_404">
                                <div class="container_box">
                                    <div class="row">
                                        <div class="col-sm-12 ">
                                            <div class="col-sm-10 col-sm-offset-1  text-center" style={{ margin: "auto" }}>
                                                <div class="four_zero_four_bg">
                                                    <h1 class="text-center ">404</h1>


                                                </div>

                                                <div class="contant_box_404">
                                                    <h3 class="h2">
                                                        Look like you're lost
                                                    </h3>

                                                    <p>the page you are looking for not avaible!</p>

                                                    <Link to="/" class="link_404">Go to Home</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>)
                    }
                </div >
            </div>
        </>

    )
}

export default SearchJobs
