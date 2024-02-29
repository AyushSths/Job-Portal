import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { remove } from '../redux/slice/applySlice'
import eye from "../../assets/images/eye.png"
import trash from "../../assets/images/trash.png"
import edit from "../../assets/images/edit.png"
import lottie from "lottie-web";
import { defineElement } from "@lordicon/element";
// define "lord-icon" custom element with default properties
defineElement(lottie.loadAnimation);

function PostedJobs() {
    const dispatch = useDispatch()
    const user = useSelector((redux_state) => redux_state.user.value);
    const [jobs, setJobs] = useState(null)
    const [isLoadingProduct, setisLoadingProduct] = useState(true);
    // const { id } = useParams();

    function fetchData() {
        axios.get("http://localhost:8000/api/jobs")
            .then(res => {
                const posted = res.data.data
                console.log("postedJObs", posted);
                const userPostedJobs = posted?.filter(job => job?.createdBy === user?._id);
                console.log("USerpostedJObs", userPostedJobs);
                setJobs(userPostedJobs)
                setisLoadingProduct(false)
            })
            .catch(err => {
                console.log("error", err);
            })
    }

    useEffect(() => {
        fetchData()
    }, [])

    const deleteItem = (itemId) => {
        if (!window.confirm('Are you sure to delete this item ?')) return;
        axios
            .delete(`http://localhost:8000/api/jobs/${itemId}`)
            .then((res) => {
                if (res.status === 200) {
                    console.log("Item deleted from list");
                    // After successful deletion, you can update the cart details by fetching the updated data.
                    fetchData();
                } else {
                    console.error("Unexpected status code:", res.status);
                }
            })
            .catch((err) => {
                if (err.response && err.response.status === 404) {
                    console.log("Item not found in cart.", itemId);
                } else {
                    console.error("Error deleting item from cart", err);
                }
            });
    };

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
                            jobs?.length === 0 ? // Check if jobs is defined and has length 0
                                <tr>
                                    <td colSpan={5} style={{ textAlign: "center" }}>No Job Posted Yet!</td>
                                </tr> :
                                jobs?.map((details) => {
                                    return (
                                        <>
                                            <tr key={details?._id}>
                                                <td>{details?.name}</td>
                                                <td>{details?.company}</td>
                                                <td>{details?.categorey}</td>
                                                {/* <td>{details?.createdAt}</td> */}
                                                <td>{details?.deadline}</td>
                                                <td><Link to={`/edit/${details?._id}`}>
                                                    {/* <img src={edit} alt="" className="icon_hover" /> */}
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/wuvorxbv.json"
                                                        trigger="hover"
                                                        colors="primary:#121331,secondary:#198745"
                                                        style={{ width: "25px", height: "25px" }}>
                                                    </lord-icon>
                                                </Link>
                                                    <Link to={`/${details?._id}`}>
                                                        {/* <img src={eye} alt="" className="icon_hover" style={{ marginLeft: "20px" }} /> */}
                                                        <lord-icon
                                                            src="https://cdn.lordicon.com/vfczflna.json"
                                                            trigger="hover"
                                                            style={{ width: "25px", height: "25px", marginLeft: "14px" }}>
                                                        </lord-icon>
                                                    </Link>
                                                    {/* <img src={trash} onClick={handleRemove} style={{ cursor: "pointer", marginLeft: "14px" }} className="icon_hover" /> */}
                                                    <lord-icon
                                                        src="https://cdn.lordicon.com/skkahier.json"
                                                        trigger="hover"
                                                        colors="primary:#c71f16"
                                                        style={{ width: "25px", height: "25px", cursor: "pointer", marginLeft: "14px" }}
                                                        onClick={() => deleteItem(details?._id)}>
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

export default PostedJobs
