import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { addToApplied } from '../redux/slice/applySlice';

function View() {
    const user = useSelector((redux_state) => redux_state.user.value)
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [jobs, setJobs] = useState(null)
    const { id } = useParams();

    async function fetchData() {
        await axios.get(`http://localhost:8000/api/jobs/${id}`)
            .then(res => {
                console.log("data", res);
                setJobs(res.data?.data)
            })
            .catch(err => {
                console.log("error", err);
            })
    }

    const appliedJobs = useSelector((redux_state) => redux_state.applied.value);
    async function handleApply() {
        await axios.get(`http://localhost:8000/api/jobs/${id}`)
            .then(res => {
                console.log("applied_data", res);
                const jobDetails = res.data?.data
                const userId = user?._id; // Access user ID
                console.log("user_id", userId);
                // const appliedJobs = JSON.parse(localStorage.getItem('applied_jobs')) || []; // Parse as array or initialize as empty array
                // const updatedAppliedJobs = [...appliedJobs, { ...jobDetails, appliedBy: userId }]; // Add new job application to existing array
                dispatch(addToApplied({ ...jobDetails, appliedBy: userId }))

                console.log("Stored Jobs:", appliedJobs);
                const isJobAlreadyApplied = appliedJobs.some(job => job._id === jobDetails._id && job.appliedBy === userId);
                if (!isJobAlreadyApplied) {
                    // Update local storage if the job hasn't been applied before
                    const updatedAppliedJobs = [...appliedJobs, { ...jobDetails, appliedBy: userId }];
                    localStorage.setItem('applied_jobs', JSON.stringify(updatedAppliedJobs));
                }
                // localStorage.setItem('applied_jobs', JSON.stringify({ ...jobDetails, appliedBy: userId }))
            })

            .catch(err => {
                console.log("error_applied", err);
            })
    }

    useEffect(() => {
        fetchData()
    }, [id])
    return (
        <>
            <div className="container blur"></div>
            <div className="view">
                <div className="banner-section"  >
                    <div className="banner-title" style={{ display: "flex" }}>
                        <img src={jobs?.image[0]} alt="" />
                        <div className="title">
                            <h5 style={{ display: "block" }}>{jobs?.company}</h5>
                            <p>{jobs?.categorey}</p>
                            <div className="apply-btn">
                                {
                                    user?.role === "job-seeker" ?
                                        <Link to="/apply" className='app-link'><button style={{ top: "85px" }} onClick={handleApply}><span className='circle'>+</span> Apply now</button></Link> :
                                        user?.role === "company" ?
                                            <Link to={`/edit/${jobs?._id}`} className='app-link'><button style={{ top: "85px" }}>Edit</button></Link> :
                                            <Link to="/login" className='app-link'><button style={{ top: "85px" }}><span className='circle'>+</span> Apply now</button></Link>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="banner-content">
                        <h4>{jobs?.name}</h4>
                        <p>{jobs?.description}</p>
                        <h6>Basic job information</h6>
                        <table className="job-info">
                            <tr>
                                <th style={{ width: "33%" }}>Job Categorey</th>
                                <td style={{ width: "3%" }}>:</td>
                                <td style={{ width: "64%" }}>{jobs?.categorey}</td>
                            </tr>
                            <tr>
                                <th style={{ width: "33%" }}>Job Level</th>
                                <td style={{ width: "3%" }}>:</td>
                                <td style={{ width: "64%" }}>{jobs?.jobLevel}</td>
                            </tr>
                            <tr>
                                <th style={{ width: "33%" }}>Job Type</th>
                                <td style={{ width: "3%" }}>:</td>
                                <td style={{ width: "64%" }}>{jobs?.type}</td>
                            </tr>
                            <tr>
                                <th style={{ width: "33%" }}>No Of Vacancy</th>
                                <td style={{ width: "3%" }}>:</td>
                                <td style={{ width: "64%" }}><strong>[ {jobs?.noOfVacancy} ]</strong></td>
                            </tr>
                            <tr>
                                <th style={{ width: "33%" }}>Job Location</th>
                                <td style={{ width: "3%" }}>:</td>
                                <td style={{ width: "64%" }}>{jobs?.location}</td>
                            </tr>
                            <tr>
                                <th style={{ width: "33%" }}>Offered Salary</th>
                                <td style={{ width: "3%" }}>:</td>
                                <td style={{ width: "64%" }}> {jobs?.offeredSalary == "Negotiable" || jobs?.offeredSalary == "negotiable" ? jobs?.offeredSalary : `Rs.${jobs?.offeredSalary}`}</td>
                            </tr>
                            <tr>
                                <th style={{ width: "33%" }}>Apply Before(Deadline)</th>
                                <td style={{ width: "3%" }}>:</td>
                                <td style={{ width: "64%" }}>{jobs?.deadline}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default View
