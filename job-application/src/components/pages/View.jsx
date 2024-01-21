import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

function View() {
    const [jobs, setJobs] = useState(null)
    const { id } = useParams();

    function fetchData() {
        axios.get(`http://localhost:8000/api/jobs/${id}`)
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
    }, [id])

    return (
        <>
            <div className="view">
                <div className="banner-section"  >
                    <div className="banner-title" style={{ display: "flex" }}>
                        <img src={jobs?.image} alt="" />
                        <div className="title">
                            <h5 style={{ display: "block" }}>{jobs?.company}</h5>
                            <p>{jobs?.categorey}</p>
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
                                <td style={{ width: "64%" }}>Rs. {jobs?.offeredSalary}</td>
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
