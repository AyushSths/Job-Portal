import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import money from "../../assets/images/money.png"
import location from "../../assets/images/location.png"
import clock from "../../assets/images/clock.png"
import axios from "axios"
function TopJobs() {
    const [jobs, setJobs] = useState(null)

    function fetchData() {
        axios.get("http://localhost:8000/api/jobs")
            .then(res => {
                console.log("data", res);
                setJobs(res.data.data)
            })
            .catch(err => {
                console.log("error", err);
            })
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <>
            {
                jobs?.map((item) => {
                    return (<>
                        {item.type == "top" ?
                            <div className="top-jobs" id='top-jobs'>
                                <div className="job-items">
                                    <div className="item-info">
                                        <div className="item-image">
                                            <Link to="/#"><img src={item.image} alt="img" style={{ width: "90px" }} /></Link>
                                        </div>
                                        <div className="item-content">
                                            <div className="main-meta">
                                                <div className="title-link">
                                                    <strong><Link to="/#" className='link job-title' style={{ fontSize: "18px" }}>{item?.name} required.</Link></strong>
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
                                                    <span><img src={money} alt="" /> Rs.{item.offeredSalary}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="apply-btn">
                                            <Link to="/apply" className='app-link'><button>View Details</button></Link>
                                        </div>

                                    </div>
                                </div>
                            </div > : null}
                    </>)
                })
            }
        </>

    )
}

export default TopJobs
