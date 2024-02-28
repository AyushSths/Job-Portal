import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { Navigate, NavLink, useNavigate, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import ErrorMessage from './ErrorMessage'

function PostJob() {
    const user = useSelector((redux_state) => redux_state.user.value)
    const navigate = useNavigate();
    const { id } = useParams()
    const { register, handleSubmit, control, formState: { errors }, } = useForm();
    const [jobs, setJobs] = useState({
        name: "",
        categorey: "",
        company: "",
        jobLevel: "",
        description: "",
        noOfVacancy: "",
        location: "",
        offeredSalary: "",
        deadline: "",
        type: "",
        createdAt: "",
        image: [],
        createdBy: ""
    })
    // function handleChange(e) {
    //     if (e.target.name == "image") {
    //         setJobs({
    //             ...jobs, image: [...jobs.image, ...e.target.files]
    //         })
    //     } else {
    //         setJobs({
    //             ...jobs, [e.target.name]: e.target.value
    //         })
    //     }

    // }

    function handleChange(e) {
        const { name, value, files } = e.target;

        if (name === "image") {
            setJobs(prevState => ({
                ...prevState,
                image: [...prevState.image, ...files]
            }));
        } else {
            setJobs(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }

    const validateSalary = (value) => {
        // const salary = parseFloat(value);
        if (!value || value.toLowerCase() === 'negotiable' || !isNaN(parseFloat(value))) {
            return true; // Valid
        }
        // if (isNaN(salary) || salary <= 1000) {
        //     return "Minimum salary should be greater than 1000";
        // }
        return 'Salary should be either a number or negotiable';
    }

    useEffect(() => {
        if (id) {
            let url = `http://localhost:8000/api/jobs/${id}`
            axios.get(url)
                .then(res => {
                    setJobs(res.data.data)
                })
        }
    }, [id]);

    const onSubmit = async (event) => {
        let temp = [...jobs.image]
        try {
            console.log('Form Data:', event);
            let url = "http://localhost:8000/api/jobs/post"
            let data = {
                "name": jobs.name,
                "categorey": jobs.categorey,
                "company": jobs.company,
                "jobLevel": jobs.jobLevel,
                "description": jobs.description,
                "noOfVacancy": jobs.noOfVacancy,
                "location": jobs.location,
                "offeredSalary": jobs.offeredSalary,
                "deadline": jobs.deadline,
                "type": jobs.type,
                "createdAt": jobs.createdAt,
                "image": jobs?.image.map(img => {
                    // Check if it's already a string (URL)
                    return typeof img === "string" ? img : URL.createObjectURL(img);
                }),
                'createdBy': user._id
            }
            if (id) {
                // Update existing product
                await axios.put(`http://localhost:8000/api/jobs/edit/${id}`, data)
                    .then(res => {
                        console.log('Job updated successfully', res);
                        alert("Job updated successfully!")
                        navigate("/")
                    })
                    .catch(error => {
                        console.error('Error updating product:', error);
                        alert("Error updating product!")
                    });
            } else {
                await axios.post(url, data)
                    .then(res => {
                        console.log(res);
                        alert(res.data?.message)
                        navigate("/posted")
                    })
                    .catch(err => {
                        console.error(err.message);
                    })
            }
        }
        catch (err) {
            console.log('Server is not running', err)
        }
    }


    return (
        <>
            <div className="container blur"></div>
            <div className="post-section">
                <p style={{ opacity: "0.8", width: "50%", margin: "auto", marginTop: "50px" }}> <Link to="/" className="link">Home</Link> {id ? <span>/ Edit</span> : <span>/Post</span>}</p>
                <div className="post-title" style={{ marginTop: "20px" }}>
                    {id ? <h1>Update Job</h1> : <h1>Post a Job</h1>}
                </div>
                <div className="post-form">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-title">
                            {id ? <h4>Update Job</h4> : <h4>Post a Job</h4>}
                            <p style={{ color: "red", marginLeft: "auto" }}>Mandatory fields*</p>
                        </div>
                        <hr style={{ margin: "0" }} />
                        <table className='post-table' style={{ width: " -webkit-fill-available", marginTop: "25px" }}>
                            <tr>
                                <td>Company Name <span style={{ color: "red" }}>*</span></td>
                                <td>
                                    <input {...register("company", {
                                        required: !jobs?.company && "This field is required*", maxLength: {
                                            value: 50,
                                            message: "Max length is 50"
                                        }
                                    })} type="text" placeholder='Company name' name='company' value={jobs?.company} onChange={handleChange} />
                                    <ErrorMessage msg={errors.company?.message} />
                                </td>
                            </tr>
                            <tr>
                                <td>Job Title <span style={{ color: "red" }}>*</span></td>
                                <td>
                                    <input {...register("name", {
                                        required: !jobs?.name && "This field is required*", maxLength: {
                                            value: 30,
                                            message: "Max length is 30"
                                        }
                                    })} type="text" placeholder="ex.Web Developer" name='name' value={jobs?.name} onChange={handleChange} />
                                    <ErrorMessage msg={errors.title?.message} />
                                </td>
                            </tr>
                            <tr>
                                <td>Job categorey <span style={{ color: "red" }}>*</span></td>
                                <td>
                                    <select {...register("categorey", {
                                        required: !jobs?.categorey && "This field is required*"
                                    })} id="" name='categorey' value={jobs?.categorey} onChange={handleChange}>
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
                                <td>
                                    <select name="type" id="" {...register("type", {
                                        required: !jobs?.type && "This field is required*"
                                    })} value={jobs?.type} onChange={handleChange} >
                                        <option value="0" style={{ opacity: "0.8" }}>Select type...</option>
                                        <option value="top" >Top</option>
                                        <option value="hot" >Hot</option>
                                        <option value="featured" >Featured</option>
                                        <option value="normal" >Normal</option>
                                    </select>
                                    <ErrorMessage msg={errors.jobLevel?.message} />
                                </td>
                            </tr>
                            <tr>
                                <td>Job Level <span style={{ color: "red" }}>*</span></td>
                                <td>
                                    <select name="jobLevel" id="" {...register("jobLevel", {
                                        required: !jobs?.jobLevel && "This field is required*"
                                    })} value={jobs?.jobLevel} onChange={handleChange} >
                                        <option value="0">Select Level...</option>
                                        <option value="fresher" >Fresher</option>
                                        <option value="junior" >Junior</option>
                                        <option value="mid" >Mid</option>
                                        <option value="senior" >Senior</option>
                                    </select>
                                    <ErrorMessage msg={errors.jobLevel?.message} />
                                </td>
                            </tr>
                            <tr>
                                <td>Location <span style={{ color: "red" }}>*</span></td>
                                <td>
                                    <select name="location" id="" {...register("location", {
                                        required: !jobs?.location && "This field is required*"
                                    })} value={jobs?.location} onChange={handleChange} >
                                        <option value="0">Select District...</option>
                                        <option value="Kathmandu" >Kathmandu</option>
                                        <option value="Lalitpur" >Lalitpur</option>
                                        <option value="Bhaktapur" >Bhaktapur</option>
                                        <option value="Kavre" >Kavre</option>
                                    </select>
                                    <ErrorMessage msg={errors.location?.message} />
                                </td>
                            </tr>
                            <tr>
                                <td>Salary <span style={{ color: "red" }}>*</span></td>
                                <td>
                                    <input type="text" placeholder='Salary' {...register("offeredSalary", {
                                        required: !jobs?.offeredSalary && "This field is required*",
                                        min: {
                                            value: 1000,
                                            message: "Salary must be at least 1000"
                                        },
                                        validate: validateSalary,
                                    })} name="offeredSalary" value={jobs?.offeredSalary} onChange={handleChange} />
                                    <ErrorMessage msg={errors.offeredSalary?.message} />
                                </td>
                            </tr>
                            <tr>
                                <td>No. of Vacancy <span style={{ color: "red" }}>*</span></td>
                                <td>
                                    <input {...register("noOfVacancy", {
                                        required: !jobs?.noOfVacancy && "This field is required*",
                                        min: {
                                            value: 1,
                                            message: "Must be greater than or equal to 1"
                                        }
                                    })} type="number" name="noOfVacancy" id="" placeholder='Vacancy no.' value={jobs?.noOfVacancy} onChange={handleChange} />
                                    <ErrorMessage msg={errors.noOfVacancy?.message} />
                                </td>
                            </tr>
                            <tr>
                                <td>Description <span style={{ color: "red" }}>*</span></td>
                                <td>
                                    <textarea {...register("description", {
                                        required: !jobs?.description && "This field is required*", maxLength: {
                                            value: 300,
                                            message: "Max length is 300"
                                        }
                                    })} name="description" id="" cols="30" rows="10" style={{ height: "150px" }} placeholder="Job description"
                                        value={jobs?.description} onChange={handleChange} />
                                    <ErrorMessage msg={errors.description?.message} />
                                </td>
                            </tr>
                            <tr>
                                <td>Applicant Start <span style={{ color: "red" }}>*</span></td>
                                <td>
                                    <input type='date' name="createdAt" class="form-control" placeholder='Start date' {...register("createdAt", {
                                        required: !jobs?.createdAt && "This field is required*"
                                    })} value={jobs?.createdAt} onChange={handleChange} /><br />
                                </td>
                            </tr>
                            <tr>
                                <td>Applicant Deadline <span style={{ color: "red" }}>*</span></td>
                                <td>
                                    <input type='date' name="deadline" class="form-control" placeholder='Deadline' {...register("deadline", {
                                        required: !jobs?.deadline && "This field is required*"
                                    })} value={jobs?.deadline} onChange={handleChange} /><br />

                                </td>
                            </tr>
                            <tr>
                                <td>Image <span style={{ color: "red" }}>*</span></td>
                                <td>
                                    <input {...register("image", {
                                        required: !jobs?.image && "This field is required*"
                                    })} type="file" multiple class="form-control" name="image" onChange={handleChange} />
                                    <ErrorMessage msg={errors.image?.message} />
                                    {
                                        jobs?.image.map(img => {

                                            let img_src = "";

                                            if (typeof (img) == "string") {
                                                img_src = img;
                                            } else {
                                                img_src = URL.createObjectURL(img)
                                            }

                                            return <img height={100} width={100} src={img_src} />
                                        })
                                    }
                                </td>
                            </tr>
                        </table>
                        <button className="post_btn" style={{ backgroundColor: "transparent", border: "none" }}>
                            {id ? <span className='post_link'>Update post</span> : <span className='post_link'>Post job</span>}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default PostJob
