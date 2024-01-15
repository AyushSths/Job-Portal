import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import accounting from "../../assets/images/education.png"
import axios from "axios"
function HotJobs() {
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
                        {item.type == "hot" ?
                            <div className="top-jobs" id='top-jobs'>
                                <div className="job-items">
                                    <div className="item-info">
                                        <div className="item-image">
                                            <Link to="/#"><img src={item.image} alt="img" style={{ width: "90px" }} /></Link>
                                        </div>
                                        <div className="item-content">
                                            <div className="main-meta">
                                                <div className="title-link">
                                                    <h6><Link to="/#" className='link job-title'>{item?.name} required.</Link></h6>
                                                    <strong>{item.company}</strong>
                                                </div>
                                                <span className="time">Full Time</span>
                                            </div>
                                            <div className="meta-bottom d-flex justify-content-between">
                                                <div className="type-wrap">
                                                    <span>Type :</span>
                                                    <Link to="/#" className='link'>{item.type}</Link>
                                                </div>
                                                <div className="price-wrap">
                                                    <span>Salary :</span>
                                                    <strong>Rs.{item.offeredSalary}</strong>
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

export default HotJobs
