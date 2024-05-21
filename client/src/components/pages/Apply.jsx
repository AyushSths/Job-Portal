import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { remove } from '../redux/slice/applySlice';
import eye from "../../assets/images/eye.png";
import trash from "../../assets/images/trash.png";
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";

defineElement(lottie.loadAnimation);

function Apply() {
    const dispatch = useDispatch();
    const user = useSelector((redux_state) => redux_state.user.value);
    const applied = useSelector((redux_state) => redux_state.applied.value);
    const userAppliedJobs = applied?.filter(job => job?.appliedBy === user?._id);
    const [isLoadingProduct, setisLoadingProduct] = useState(true);

    const handleRemove = (jobId) => {
        dispatch(remove(jobId));
        const updatedJobs = applied.filter(job => job._id !== jobId);
        // Update local storage with the updated array
        localStorage.setItem('applied_jobs', JSON.stringify(updatedJobs));
    };

    useEffect(() => {
        if (userAppliedJobs) {
            setisLoadingProduct(false);
        }
    }, []);

    if (isLoadingProduct) {
        return (
            <div className="loader">
                <lord-icon
                    src="https://cdn.lordicon.com/jpgpblwn.json"
                    trigger="loop"
                    state="loop-spin"
                    colors="primary:#198745"
                    style={{ width: "40px", height: "40px", display: "block", margin: "auto", marginTop: "20%" }}>
                </lord-icon>
            </div>
        );
    }

    return (
        <>
            <div className="container blur"></div>
            <div className="apply_section">
                <table>
                    <thead>
                        <tr>
                            <th>Job Position</th>
                            <th>Company</th>
                            <th>Job Category</th>
                            <th>Deadline</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userAppliedJobs.length === 0 ? (
                            <tr>
                                <td colSpan={5} style={{ textAlign: "center" }}>No Job Applications Yet!</td>
                            </tr>
                        ) : (
                            userAppliedJobs.map((details) => (
                                <tr key={details?._id}>
                                    <td>{details?.name}</td>
                                    <td>{details?.company}</td>
                                    <td>{details?.categorey}</td>
                                    <td>{details?.deadline}</td>
                                    <td>
                                        <div className="action">
                                            <Link to={`/${details?._id}`}>
                                                <lord-icon
                                                    src="https://cdn.lordicon.com/vfczflna.json"
                                                    trigger="hover"
                                                    style={{ width: "25px", height: "25px" }}>
                                                </lord-icon>
                                            </Link>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                colors="primary:#c71f16"
                                                style={{ width: "25px", height: "25px", cursor: "pointer" }}
                                                onClick={() => handleRemove(details._id)}>
                                            </lord-icon>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Apply;
