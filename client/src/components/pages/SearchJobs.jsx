
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
import money from "../../assets/images/money.png";
import location from "../../assets/images/location.png";
import clock from "../../assets/images/clock.png";
import imgError from "../../assets/images/ImgnotFound.jpg";

// Define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

function SearchJobs({ setCategory, setSearchTerm, search_term }) {
    const [type, setType] = useState("top");
    const [isLoadingProduct, setIsLoadingProduct] = useState(true);
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();

    console.log("Search_term", search_term);

    function fetchData() {
        axios.get(`https://job-portal-app-api-98as.onrender.com/api/jobs/search?search_term=${search_term}`)
            .then(res => {
                console.log("Searched data", res);
                setJobs(res.data.data);
                setIsLoadingProduct(false);
            })
            .catch(err => {
                console.log("error", err);
            });
    }

    useEffect(() => {
        fetchData();
    }, [search_term]);

    function handleJobType(jobType) {
        setType(jobType);
    }

    return (
        <>
            <div className="container blur"></div>
            <div className="search-section" style={{ maxWidth: "1820px", margin: "0 auto" }}>
                <div className="info" style={{ margin: "auto", padding: "0 10px" }}>
                    <p style={{ opacity: "0.8", marginBottom: "30px", marginTop: "-20px", fontSize: "16px" }}>
                        <Link to="/" className="link" style={{ color: "white" }}>Home</Link> / Search results for : {search_term}
                    </p>
                    <form className="d-flex" onSubmit={(e) => {
                        e.preventDefault();
                        setSearchTerm(e.target.querySelector('input[type="search"]').value);
                        navigate("/search");
                    }}>
                        <input className="form-control me-2" type="search" placeholder="Search by job title, category, company" aria-label="Search" name="search" required />
                        <button className="btn btn-outline-success" type="submit">
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
                    <h5>Searched jobs : {search_term}</h5>
                    <div className="jobs">
                        {isLoadingProduct ? (
                            <div className="loader">
                                <lord-icon
                                    src="https://cdn.lordicon.com/unukghxb.json"
                                    trigger="loop"
                                    state="loop-spin"
                                    stroke="bold"
                                    colors="primary:#198745"
                                    style={{ width: "80px", height: "80px", display: "block", margin: "auto", marginTop: "20%" }}
                                >
                                </lord-icon>
                            </div>
                        ) : (
                            jobs.length !== 0 ? jobs.map((item) => (
                                <div className="top-jobs" key={item._id}>
                                    <div className="job-items">
                                        <div className="item-info">
                                            <div className="item-image">
                                                <Link className="com-img" to={`/${item._id}`}>
                                                    <img src={item.image[0] || imgError} alt="img" />
                                                </Link>
                                            </div>
                                            <div className="item-content">
                                                <div className="main-meta">
                                                    <div className="title-link">
                                                        <strong>
                                                            <Link to={`/${item._id}`} className='link job-title'>{item.name} required.</Link>
                                                        </strong>
                                                        <h6 style={{ opacity: "0.8" }}>{item.company}</h6>
                                                    </div>
                                                </div>
                                                <div className="meta-bottom">
                                                    <div className="wraper type-wrap">
                                                        <span><img src={location} alt="" /> {item.location}</span>
                                                    </div>
                                                    <div className="wraper time-wrap">
                                                        <span className="time"><img src={clock} alt="" /> Full Time</span>
                                                    </div>
                                                    <div className="wraper price-wrap">
                                                        <span><img src={money} alt="" /> {item.offeredSalary.toLowerCase() === "negotiable" ? item.offeredSalary : `Rs.${item.offeredSalary}`}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="apply-btn">
                                                <Link to={`/${item._id}`} className='app-link'><button>View Details</button></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )) : (
                                <section className="page_404">
                                    <div className="container_box">
                                        <div className="row">
                                            <div className="col-sm-12 ">
                                                <div className="col-sm-10 col-sm-offset-1 text-center" style={{ margin: "auto" }}>
                                                    <div className="four_zero_four_bg">
                                                        <h1 className="text-center ">404</h1>
                                                    </div>
                                                    <div className="contant_box_404">
                                                        <h3 className="h2">Looks like you're lost</h3>
                                                        <p>The page you are looking for is not available!</p>
                                                        <Link to="/" className="link_404">Go to Home</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            )
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default SearchJobs;
