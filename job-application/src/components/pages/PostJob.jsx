import React from 'react'
import { NavLink } from 'react-router-dom'

function PostJob() {
    return (
        <>
            <div className="post-section">
                <div className="post-title" style={{ marginTop: "20px" }}>
                    <h1>Post a Job</h1>
                </div>
                <div className="post-form">
                    <form>
                        <div className="form-title">
                            <h4>Post a job</h4>
                            <p style={{ color: "red", marginLeft: "auto" }}>Mandatory fields*</p>
                        </div>
                        <hr style={{ margin: "0" }} />
                        <table className='post-table' style={{ width: " -webkit-fill-available", marginTop: "25px" }}>
                            <tr>
                                <td>Company Name</td>
                                <td>
                                    <input type="text" placeholder='Company name' />
                                </td>
                            </tr>
                            <tr>
                                <td>Job Title</td>
                                <td>
                                    <input type="text" placeholder="ex.Web Developer" />
                                </td>
                            </tr>
                            <tr>
                                <td>Job categorey</td>
                                <td>
                                    <select name="categorey" id="">
                                        <option value="" disabled selected >Select Category</option>
                                        <option value="It">Information technology</option>
                                        <option value="Accounting">Accounting</option>
                                        <option value="Education">Education</option>
                                        <option value="Research">Research</option>
                                        <option value="Hr">HUman resource</option>
                                        <option value="Music">Music</option>
                                        <option value="Engineer">Engineer</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Job Type</td>
                                <td style={{ display: "flex" }}>
                                    <div className="form-check">
                                        <input style={{ width: "0", height: "0" }} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" />
                                        <label className="form-check-label" for="flexRadioDefault1">
                                            Top
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input style={{ width: "0", height: "0" }} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                                        <label className="form-check-label" for="flexRadioDefault2">
                                            Hot
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input style={{ width: "0", height: "0" }} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                                        <label className="form-check-label" for="flexRadioDefault2">
                                            Featured
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <input style={{ width: "0", height: "0" }} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" checked />
                                        <label className="form-check-label" for="flexRadioDefault2">
                                            Normal
                                        </label>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Job Level</td>
                                <td>
                                    <select name="level" id="">
                                        <option value="fresher">Fresher</option>
                                        <option value="junior">Junior</option>
                                        <option value="mid">Mid</option>
                                        <option value="senior">Senior</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Location</td>
                                <td>
                                    <select name="District" id="">
                                        <option value="0">Select District...</option>
                                        <option value="Kathmandu">Kathmandu</option>
                                        <option value="Lalitpur">Lalitpur</option>
                                        <option value="Bhaktapur">Bhaktapur</option>
                                        <option value="Kavre">Kavre</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td>Salary</td>
                                <td>
                                    <input type="text" placeholder='Salary' />
                                </td>
                            </tr>
                            <tr>
                                <td>No. of Vacancy</td>
                                <td>
                                    <input type="number" name="" id="" placeholder='Vacancy no.' />
                                </td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>
                                    <textarea name="description" id="" cols="30" rows="10" style={{ height: "150px" }} placeholder="Job description" />
                                </td>
                            </tr>
                            <tr>
                                <td>Applicant Start</td>
                                <td>
                                    <input type='date' name="appStartDate" class="form-control" placeholder='Start date' /><br />
                                </td>
                            </tr>
                            <tr>
                                <td>Applicant Deadline</td>
                                <td>
                                    <input type='date' name="appStartDate" class="form-control" placeholder='Deadline' /><br />
                                </td>
                            </tr>
                            <tr>
                                <td>Image</td>
                                <td>
                                    <input type="file" multiple class="form-control" name="images" />
                                    {/* {
                        product?.images.map(img => {

                            let img_src = "";

                            if (typeof (img) == "string") {
                                img_src = img;
                            } else {
                                img_src = URL.createObjectURL(img)
                            }

                            return <img height={100} width={100} src={img_src} />
                        })
                    } */}
                                </td>
                            </tr>
                        </table>
                        <button className="post_btn" style={{ backgroundColor: "transparent", border: "none" }}>
                            <NavLink className='post_link' to='/'>Post job</NavLink>
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PostJob
