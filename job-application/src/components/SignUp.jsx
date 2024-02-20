import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import user from '../assets/images/user.png'
import left_arrow from '../assets/images/left-arrow.png'
import home_image from '../assets/images/home_image.jpg'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import ErrorMessage from './pages/ErrorMessage'
import { useForm, SubmitHandler } from "react-hook-form"
import Register from './Register'
import { setUser } from './redux/slice/userSlice'

function SignUp() {
    const throwIfNamespace = false
    let navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const [err, setErr] = useState(null)

    // console.log(watch());

    const onSubmit = async (datas, event) => {
        event.preventDefault()
        // console.log(datas)
        let url = "http://localhost:8000/api/users/register"
        let data = {
            "uname": event.target.uname.value,
            "email": event.target.email.value,
            "password": event.target.password.value,
            "role": event.target.role.value,
            "company": event.target.company?.value,
            "education": event.target.education?.value,
            "contact": event.target.contact.value
        }
        await axios
            .post(url, data)
            .then(res => {
                console.log("From data", res);
                setUser(res)
                alert("Signed up")
                navigate("/Login")
            })
            .catch(err => {
                console.log("Axios Error", err.response.data.errors)
                setErr(err.response.data.errors[0].msg)
            })
    }
    console.log("Form Errors", errors);


    return (
        <>
            {/* <div className="home categorey-section">
                <div className="container">
                    <img src={home_image} alt="" className='home_img' style={{ height: "90%", filter: "blur(4px)" }} />
                </div>
            </div> */}
            <div className="container blur"></div>

            <div className="user-form" style={{ marginBottom: "100px" }}>
                <div className="register-section">
                    <div className="section-content">
                        <h1 style={{ textAlign: "center" }}>Jobs Portal</h1>
                        <p style={{ fontSize: "18px", textAlign: "center" }}>A dream doesn't become reality through magic; it takes sweat, determination and hard work....</p>
                        <p className="section-btn" style={{ fontSize: "18px" }}>Already got an account? <Link class="btn-link" to="/login"><img src={left_arrow} alt="" className="r-arrow" /> Log in </Link></p>
                    </div>
                </div>
                <form class="form" style={{ borderRadius: "0px 20px 20px 0px" }} onSubmit={handleSubmit(onSubmit)}>
                    <h1 style={{ textAlign: "center" }}>Sign Up</h1>
                    <div className="uname-input">
                        <div class="flex-column">
                            <label>Username </label></div>
                        <div class="inputForm">
                            <img src={user} alt="" />
                            <input {...register("uname", {
                                required: "This field is required*", maxLength: {
                                    value: 30,
                                    message: "Max length is 30"
                                }
                            })} placeholder="Enter username" class="input" type="text" />
                        </div>
                        <ErrorMessage msg={errors.uname?.message} />
                    </div>
                    <div className="email-input">
                        <div class="flex-column">
                            <label>Email </label></div>
                        <div class="inputForm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 32 32" height="20"><g data-name="Layer 3" id="Layer_3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g></svg>
                            <input {...register("email", { required: "This field is required*" })} placeholder="Enter Email" class="input" type="email" />
                        </div>
                        <ErrorMessage msg={errors.email?.message || err} />
                    </div>
                    <div className="pwd-input">
                        <div class="flex-column">
                            <label>Password </label></div>
                        <div class="inputForm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="-64 0 512 512" height="20"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>
                            <input {...register("password", {
                                required: "This field is required*", maxLength: {
                                    value: 8,
                                    message: "Max length is 8"
                                }, minLength: {
                                    value: 6,
                                    message: "Min length should be exactly or greater then 6"
                                }
                            })} placeholder="Enter Password" class="input" type="password" autocomplete="new-password" />
                        </div>
                        <ErrorMessage msg={errors.password?.message} />
                    </div>
                    <div className="role-input">
                        <div class="flex-column">
                            <label>Role </label></div>
                        <div class="inputForm">
                            <img src={user} alt="" />
                            <select {...register("role", { required: "This field is required*" })} class="form-select form-input" aria-label="Default select example" style={{ backgroundColor: "transparent" }} >
                                <option selected>Select role</option>
                                <option value="Company">Company</option>
                                <option value="Job-seeker">Job-seeker</option>
                            </select>
                        </div>
                        <ErrorMessage msg={errors.role?.message} />
                    </div>
                    {watch("role") === "Company" && (
                        <div className="com-input">
                            <div className="flex-column">
                                <label>Company</label>
                            </div>
                            <div className="inputForm">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    viewBox="-64 0 512 512"
                                    height="20"
                                >
                                    <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path>
                                    <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path>
                                </svg>
                                <input
                                    {...register("company", { required: "This field is required*" })}
                                    placeholder="Company"
                                    className="input"
                                    type="text"
                                />
                            </div>
                            <ErrorMessage msg={errors.company?.message} />
                        </div>
                    )}
                    {watch("role") === "Job-seeker" && (
                        <div className="edu-input">
                            <div class="flex-column">
                                <label>Education </label></div>
                            <div class="inputForm">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="-64 0 512 512" height="20"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>
                                <input {...register("education", { required: "This field is required*" })} placeholder="Education" class="input" type="text" />
                            </div>
                            <ErrorMessage msg={errors.education?.message} />
                        </div>
                    )}


                    <div className="con-input">
                        <div class="flex-column">
                            <label>Contact </label></div>
                        <div class="inputForm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="-64 0 512 512" height="20"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>
                            <input {...register("contact", {
                                required: "This field is required*", maxLength: {
                                    value: 10,
                                    message: "Number should be of length 10"
                                }, minLength: {
                                    value: 10,
                                    message: "Number should be of length 10"
                                }
                            })} placeholder="Contact no." class="input" type="number" />
                        </div>
                        <ErrorMessage msg={errors.contact?.message} />
                    </div>
                    <button class="button-submit">Sign Up</button>
                </form>
            </div>
        </>
    )
}

export default SignUp
