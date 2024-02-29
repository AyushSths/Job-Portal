import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ErrorMessage from './ErrorMessage'

function PostJob() {

    const { register, handleSubmit, control, formState: { errors }, } = useForm();
    const [value, setValue] = useState([])
    const validateSalary = (value) => {
        if (!value || value.toLowerCase() === 'negotiable' || !isNaN(parseFloat(value))) {
            return true; // Valid
        }
        return 'Salary should be either a number or negotiable';
    }
    const onSubmit = async (event) => {

        try {
            console.log('Form Data:', event);
            let url = "http://localhost:8000/api/jobs/post"
            const formData = new FormData();

            // Append image files to the FormData object
            if (event.image && event.image.length > 0) {
                // If 'event.image' is not an array, convert it to an array
                const imageFiles = Array.isArray(event.image) ? event.image : [event.image];

                imageFiles.forEach((file) => {
                    formData.append('image', file);
                });
            }

            // Append other fields to the FormData object
            formData.append('name', event.name);
            formData.append('categorey', event.categorey);
            formData.append('company', event.company);
            formData.append('description', event.description);
            formData.append("offeredSalary", event.offeredSalary);
            formData.append("location", event.location);
            formData.append("type", event.type)
            formData.append("jobLevel,", event.jobLevel);
            formData.append("noOfVacancy", event.noOfVacancy);
            formData.append("createdAt", event.createdAt);
            formData.append("deadline", event.deadline);
            // formData.append("image", event.image);

            for (var pair of formData.entries()) {
                console.log(pair[0] + ': ' + pair[1]);
            }

            await axios.post(url, formData)
                .then(res => {
                    console.log(res);
                    alert(res.data?.message)
                })
                .catch(err => {
                    console.error(err.message);
                })
        }
        catch (err) {
            console.log('Server is not running', err)
        }
    }
    return (
        <>
            <div className="post-section">
                <p style={{ opacity: "0.8", width: "50%", margin: "auto", marginTop: "50px" }}> <Link to="/" className="link">Home</Link> / Post</p>
                <div className="post-title" style={{ marginTop: "20px" }}>
                    <h1>Post a Job</h1>
                </div>
                <div className="post-form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-title">
                            <h4>Post a job</h4>
                            <p style={{ color: "red", marginLeft: "auto" }}>Mandatory fields*</p>
                        </div>
                        <hr style={{ margin: "0" }} />
                        <table className='post-table' style={{ width: " -webkit-fill-available", marginTop: "25px" }}>
                            <tr>
                                <td>Company Name <span style={{ color: "red" }}>*</span></td>
                                <td>
                                    <input {...register("company", {
                                        required: "This field is required*", maxLength: {
                                            value: 50,
                                            message: "Max length is 50"
                                        }
                                    })} type="text" placeholder='Company name' />
                                    <ErrorMessage msg={errors.company?.message} />
                                </td>
                            </tr>
                            <tr>
                                <td>Job Title <span style={{ color: "red" }}>*</span></td>
                                <td>
                                    <input {...register("name", {
                                        required: "This field is required*", maxLength: {
                                            value: 30,
                                            message: "Max length is 30"
                                        }
                                    })} type="text" placeholder="ex.Web Developer" />
                                    <ErrorMessage msg={errors.title?.message} />
                                </td>
                            </tr>
                            <tr>
                                <td>Job categorey <span style={{ color: "red" }}>*</span></td>
                                <td>
                                    <select {...register("categorey", {
                                        required: "This field is required*"
                                    })} name="categorey" id="">
                                        <option value="" disabled selected >Select Category</option>
                                        <option value="It">Information technology</option>
                                        <option value="Accounting">Accounting</option>
                                        <option value="Education">Education</option>
                                        <option value="Research">Research</option>
                                        <option value="Hr">HUman resource</option>
                                        <option value="Music">Music</option>
                                        <option value="Engineer">Engineer</option>
                                    </select>
                                    <ErrorMessage msg={errors.categorey?.message} />
                                </td>
                            </tr>
                            <tr>
                                <td>Job Type <span style={{ color: "red" }}>*</span></td>
                                <td style={{ display: "flex" }}>
                                    <div className="form-check">
                                        <label className="form-check-label" for="flexRadioDefault1">
                                            Top
                                            <Controller
                                                control={control}
                                                name="type"
                                                render={({ field }) => (
                                                    <input style={{ width: "0", height: "0" }} className="form-check-input"
                                                        type="radio"  {...field} name="flexRadioDefault" id="flexRadioDefault1" value='top' />
                                                )} />
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label" for="flexRadioDefault1">
                                            Hot
                                            <Controller
                                                control={control}
                                                name="type"
                                                render={({ field }) => (
                                                    <input style={{ width: "0", height: "0" }} className="form-check-input"
                                                        type="radio"  {...field} name="flexRadioDefault" id="flexRadioDefault1" value='hot' />
                                                )} />
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label" for="flexRadioDefault1">
                                            Featured
                                            <Controller
                                                control={control}
                                                name="type"
                                                render={({ field }) => (
                                                    <input style={{ width: "0", height: "0" }} className="form-check-input"
                                                        type="radio"  {...field} name="flexRadioDefault" id="flexRadioDefault1" value='featured' />
                                                )} />
                                        </label>
                                    </div>
                                    <div className="form-check">
                                        <label className="form-check-label" for="flexRadioDefault1">
                                            Normal
                                            <Controller
                                                control={control}
                                                name="type"
                                                render={({ field }) => (
                                                    <input style={{ width: "0", height: "0" }} className="form-check-input"
                                                        type="radio"  {...field} name="flexRadioDefault" id="flexRadioDefault1" value='normal' />
                                                )} />
                                        </label>
                                    </div>


                                </td>
                            </tr>
                            <tr>
                                <td>Job Level <span style={{ color: "red" }}>*</span></td>
                                <td>
                                    <select name="level" id="" {...register("jobLevel", {
                                        required: "This field is required*"
                                    })}>
                                        <option value="0">Select Level...</option>
                                        <option value="fresher">Fresher</option>
                                        <option value="junior">Junior</option>
                                        <option value="mid">Mid</option>
                                        <option value="senior">Senior</option>
                                    </select>
                                    <ErrorMessage msg={errors.jobLevel?.message} />
                                </td>
                            </tr>
                            <tr>
                                <td>Location <span style={{ color: "red" }}>*</span></td>
                                <td>
                                    <select name="District" id="" {...register("location", {
                                        required: "This field is required*"
                                    })}>
                                        <option value="0">Select District...</option>
                                        <option value="Kathmandu">Kathmandu</option>
                                        <option value="Lalitpur">Lalitpur</option>
                                        <option value="Bhaktapur">Bhaktapur</option>
                                        <option value="Kavre">Kavre</option>
                                    </select>
                                    <ErrorMessage msg={errors.location?.message} />
                                </td>
                            </tr>
                            <tr>
                                <td>Salary <span style={{ color: "red" }}>*</span></td>
                                <td>
                                    <input type="text" placeholder='Salary' {...register("offeredSalary", {
                                        required: "This field is required*",
                                        validate: validateSalary
                                    })} />
                                    <ErrorMessage msg={errors.offeredSalary?.message} />
                                </td>
                            </tr>
                            <tr>
                                <td>No. of Vacancy <span style={{ color: "red" }}>*</span></td>
                                <td>
                                    <input type="number" name="" id="" placeholder='Vacancy no.' {...register("noOfVacancy", {
                                        required: "This field is required*"
                                    })} />
                                    <ErrorMessage msg={errors.noOfVacancy?.message} />
                                </td>
                            </tr>
                            <tr>
                                <td>Description <span style={{ color: "red" }}>*</span></td>
                                <td>
                                    <textarea {...register("description", {
                                        required: "This field is required*", maxLength: {
                                            value: 300,
                                            message: "Max length is 300"
                                        }
                                    })} name="description" id="" cols="30" rows="10" style={{ height: "150px" }} placeholder="Job description" />
                                    <ErrorMessage msg={errors.description?.message} />
                                </td>
                            </tr>
                            <tr>
                                <td>Applicant Start <span style={{ color: "red" }}>*</span></td>
                                <td>
                                    <input type='date' name="appStartDate" class="form-control" placeholder='Start date' {...register("createdAt", {
                                        required: "This field is required*"
                                    })} /><br />
                                </td>
                            </tr>
                            <tr>
                                <td>Applicant Deadline <span style={{ color: "red" }}>*</span></td>
                                <td>
                                    <input type='date' name="appStartDate" class="form-control" placeholder='Deadline' {...register("deadline", {
                                        required: "This field is required*"
                                    })} /><br />

                                </td>
                            </tr>
                            <tr>
                                <td>Image <span style={{ color: "red" }}>*</span></td>
                                <td>
                                    <input
                                        {...register("image", {
                                            required: "This field is required*",
                                        })}
                                        type="file"
                                        multiple
                                        class="form-control"
                                        name="image"
                                        accept="image/*"
                                        onChange={(e) => {
                                            setValue("image", e.target.files[0]);
                                        }}
                                    />
                                    <ErrorMessage msg={errors.image?.message} />
                                    {/* {
                                        formData.image?.map(img => {

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
                            <span className='post_link'>Post job</span>
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PostJob
