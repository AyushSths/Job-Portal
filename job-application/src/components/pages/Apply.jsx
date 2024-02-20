import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { remove } from '../redux/slice/applySlice'
import eye from "../../assets/images/eye.png"
import trash from "../../assets/images/trash.png"
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

function Apply() {
    const dispatch = useDispatch()
    const user = useSelector((redux_state) => redux_state.user.value);
    const applied = useSelector((redux_state) => redux_state.applied.value)
    const userAppliedJobs = applied?.filter(job => job?.appliedBy === user?._id);
    console.log("Applied_details", applied);
    console.log("User applied", userAppliedJobs);
    const [isLoadingProduct, setisLoadingProduct] = useState(true);

    const handleRemove = () => {
        // localStorage.removeItem("access_token")
        dispatch(remove())
    }

    useEffect(() => {
        if (userAppliedJobs) {
            setisLoadingProduct(false)
        }
    }, [])

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
            <div className="apply_section">
                <table>
                    <thead>
                        <tr>
                            <th>Job Position</th>
                            <th>Company</th>
                            <th>Job Categorey</th>
                            <th>Deadline</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userAppliedJobs.length === 0 ? // Check if userAppliedJobs is defined and has length 0
                                <tr>
                                    <td colSpan={5} style={{ textAlign: "center" }}>No Job Applications Yet!</td>
                                </tr> :
                                userAppliedJobs?.map((details) => {
                                    return (
                                        <>
                                            <tr key={details?._id}>
                                                <td>{details?.name}</td>
                                                <td>{details?.company}</td>
                                                <td>{details?.categorey}</td>
                                                {/* <td>{details?.createdAt}</td> */}
                                                <td>{details?.deadline}</td>
                                                <td><Link to={`/${details?._id}`}>
                                                    {/* <img src={eye} alt="" className="icon_hover" /> */}
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/vfczflna.json"
                                                        trigger="hover"
                                                        style={{ width: "25px", height: "25px" }}>
                                                    </lord-icon>
                                                </Link>
                                                    {/* <img src={trash} onClick={handleRemove} style={{ cursor: "pointer", marginLeft: "20px" }} className="icon_hover" /> */}
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover"
                                                        colors="primary:#c71f16"
                                                        style={{ width: "25px", height: "25px", cursor: "pointer", marginLeft: "20px" }} onClick={handleRemove}>
                                                    </lord-icon>
                                                </td>
                                            </tr>
                                        </>
                                    )
                                })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Apply
