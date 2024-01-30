import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import user from '../assets/images/user.png'
import left_arrow from '../assets/images/left-arrow.png'
import home_image from '../assets/images/home_image.jpg'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import ErrorMessage from './pages/ErrorMessage'

function Register() {
    const throwIfNamespace = false
    let navigate = useNavigate()
    const [user, setUser] = useState("")
    let [submittedOnce, setSubmittedOnce] = useState(false)
    let form_data = {
        uname: "",
        email: "",
        password: "",
        role: "",
        contact: "",
        company: "",
        education: ""
    }
    let [data, setData] = useState(form_data);
    let [error, setError] = useState({
        uname: "",
        email: "",
        password: "",
        role: "",
        contact: "",
        company: "",
        education: ""
    })



    const handleSubmit = async (event) => {
        event.preventDefault()
        setSubmittedOnce(true)
        console.log("Form submit")
        //Check form validation
        let validForm = true
        if (!data.uname || !data.email || !data.password || !data.role || !data.company || !data.education || !data.contact) {
            validForm = false
            setError((prev) => {
                return {
                    ...prev, uname: "Required*"
                }
            })
            setError((prev) => {
                return {
                    ...prev, email: "Required*"
                }
            })
            setError((prev) => {
                return {
                    ...prev, password: "Required*"
                }
            })
            setError((prev) => {
                return {
                    ...prev, role: "Required*"
                }
            })
            setError((prev) => {
                return {
                    ...prev, company: "Required*"
                }
            })
            setError((prev) => {
                return {
                    ...prev, education: "Required*"
                }
            })
            setError((prev) => {
                return {
                    ...prev, contact: "Required*"
                }
            })
        }

        // if error = {email:"E-mail already in use",password:""}
        let error_values = Object.values(error)
        error_values.forEach((err) => {
            if (err) {
                validForm = false
            }
        })

        if (validForm) {
            //api call
            let url = "http://localhost:8000/api/users/register"
            let data = {
                "uname": event.target.uname.value,
                "email": event.target.email.value,
                "password": event.target.password.value,
                "role": event.target.role.value,
                "company": event.target.company.value,
                "education": event.target.education.value,
                "contact": event.target.contact.value
            }
            axios
                .post(url, data)
                .then(res => {
                    console.log("From data", res);
                    alert("Signed up")
                    navigate("/Login")
                })
                .catch(err => {
                    console.log(err.response.data);
                    let errors = err.response.data.errors
                    console.log("errors", errors);
                    let temp = {}
                    errors.forEach(el => {
                        console.log("el", el);
                        temp[el.param] = el.msg
                    })
                    console.log("error temp", temp);
                    setError(temp)
                })
        }

        console.log("errror data", error.password);

    }

    function handleChange(event) {
        // const { name, value } = event.target;

        // setData((prevData) => ({
        //     ...prevData,
        //     [name]: value,
        // }));

        // setError((prevError) => ({
        //     ...prevError,
        //     [name]: value ? "" : "Required*",
        // }));

        console.log(event.target.name);
        setData({ ...data, [event.target.name]: event.target.value })
        setError({ ...error, [event.target.name]: event.target.value ? "" : "Required" })
    }

    const [showError, setShowError] = useState(false);

    // useEffect(() => {
    //     if (error.uname || error.email || error.password || error.role || error.company || error.education || error.contact) {
    //         setShowError(true);

    //         const timerId = setTimeout(() => {
    //             setShowError(false);
    //             setError({
    //                 uname: "",
    //                 email: "",
    //                 password: "",
    //                 role: "",
    //                 company: "",
    //                 education: "",
    //                 contact: ""
    //             });
    //         }, 4000);

    //         return () => clearTimeout(timerId);
    //     }
    // }, [error]);



    return (
        <>
            {/* <div className="home categorey-section">
                <div className="container">
                    <img src={home_image} alt="" className='home_img' style={{ height: "90%", filter: "blur(4px)" }} />
                </div>
            </div> */}
            <div className="container blur"></div>
            <div className="user-form">
                <div className="register-section">
                    <div className="section-content">
                        <h1 style={{ textAlign: "center" }}>Jobs Portal</h1>
                        <p style={{ fontSize: "18px", textAlign: "center" }}>A dream doesn't become reality through magic; it takes sweat, determination and hard work....</p>
                        <p className="section-btn" style={{ fontSize: "18px" }}>Already got an account? <Link class="btn-link" to="/login"><img src={left_arrow} alt="" className="r-arrow" /> Log in </Link></p>
                    </div>
                </div>
                <form class="form" style={{ borderRadius: "0px 20px 20px 0px" }} onSubmit={handleSubmit}>
                    <h1 style={{ textAlign: "center" }}>Sign Up</h1>
                    <div class="flex-column">
                        <label>Username </label></div>
                    <div class="inputForm">
                        <img src={user} alt="" />
                        <input placeholder="Enter username" class="input" type="text" name="uname" value={data.uname} onChange={handleChange} />
                        {
                            submittedOnce && error.uname && <ErrorMessage msg={error.uname} />
                        }
                    </div>
                    <div class="flex-column">
                        <label>Email </label></div>
                    <div class="inputForm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 32 32" height="20"><g data-name="Layer 3" id="Layer_3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g></svg>
                        <input placeholder="Enter Email" class="input" type="email" name='email' value={data.email} onChange={handleChange} style={{ display: "block" }} />
                        {
                            submittedOnce && error.email && <ErrorMessage msg={error.email} />
                        }
                    </div>

                    <div class="flex-column">
                        <label>Password </label></div>
                    <div class="inputForm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="-64 0 512 512" height="20"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>
                        <input placeholder="Enter Password" class="input" type="password" autocomplete="new-password" name='password' value={data.password} onChange={handleChange} />
                        {
                            submittedOnce && error.password && <ErrorMessage msg={error.password} />
                        }
                    </div>
                    <div class="flex-column">
                        <label>Role </label></div>
                    <div class="inputForm">
                        <img src={user} alt="" />
                        <select class="form-select form-input" aria-label="Default select example" name='role' value={data.role} onChange={handleChange} >

                            <option selected>Select role</option>
                            <option value="Company">Company</option>
                            <option value="Job-seeker">Job-seeker</option>
                        </select>
                        {
                            submittedOnce && error.role && <ErrorMessage msg={error.role} />
                        }
                    </div>
                    <div class="flex-column">
                        <label>Education </label></div>
                    <div class="inputForm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="-64 0 512 512" height="20"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>
                        <input placeholder="Education" class="input" type="text" name='education' value={data.education} onChange={handleChange} />
                        {
                            submittedOnce && error.education && <ErrorMessage msg={error.education} />
                        }
                    </div>
                    <div class="flex-column">
                        <label>Company </label></div>
                    <div class="inputForm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="-64 0 512 512" height="20"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>
                        <input placeholder="Company" class="input" type="text" name='company' value={data.company} onChange={handleChange} />
                        {
                            submittedOnce && error.company && <ErrorMessage msg={error.company} />
                        }
                    </div>
                    <div class="flex-column">
                        <label>Contact </label></div>
                    <div class="inputForm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="-64 0 512 512" height="20"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>
                        <input placeholder="Contact no." class="input" type="number" name='contact' value={data.contact} onChange={handleChange} />
                        {
                            submittedOnce && error.contact && <ErrorMessage msg={error.contact} />
                        }
                    </div>
                    <button class="button-submit">Sign Up</button>
                    <p class="p line">Or With</p>

                    <div class="flex-row">
                        {/* <button class="btn google">
                        <svg xml:space="preserve" style="enable-background:new 0 0 512 512;" viewBox="0 0 512 512" y="0px" x="0px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" id="Layer_1" width="20" version="1.1">
                            <path d="M113.47,309.408L95.648,375.94l-65.139,1.378C11.042,341.211,0,299.9,0,256
	c0-42.451,10.324-82.483,28.624-117.732h0.014l57.992,10.632l25.404,57.644c-5.317,15.501-8.215,32.141-8.215,49.456
	C103.821,274.792,107.225,292.797,113.47,309.408z" style="fill:#FBBB00;"></path>
                            <path d="M507.527,208.176C510.467,223.662,512,239.655,512,256c0,18.328-1.927,36.206-5.598,53.451
	c-12.462,58.683-45.025,109.925-90.134,146.187l-0.014-0.014l-73.044-3.727l-10.338-64.535
	c29.932-17.554,53.324-45.025,65.646-77.911h-136.89V208.176h138.887L507.527,208.176L507.527,208.176z" style="fill:#518EF8;"></path>
                            <path d="M416.253,455.624l0.014,0.014C372.396,490.901,316.666,512,256,512
	c-97.491,0-182.252-54.491-225.491-134.681l82.961-67.91c21.619,57.698,77.278,98.771,142.53,98.771
	c28.047,0,54.323-7.582,76.87-20.818L416.253,455.624z" style="fill:#28B446;"></path>
                            <path d="M419.404,58.936l-82.933,67.896c-23.335-14.586-50.919-23.012-80.471-23.012
	c-66.729,0-123.429,42.957-143.965,102.724l-83.397-68.276h-0.014C71.23,56.123,157.06,0,256,0
	C318.115,0,375.068,22.126,419.404,58.936z" style="fill:#F14336;"></path>

                        </svg>

                        Google

                    </button><button class="btn apple">
                        <svg xml:space="preserve" style="enable-background:new 0 0 22.773 22.773;" viewBox="0 0 22.773 22.773" y="0px" x="0px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" id="Capa_1" width="20" height="20" version="1.1"> <g> <g> <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573 c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z"></path> <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334 c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0 c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019 c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464 c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648 c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z"></path> </g></g></svg>

                        Apple

                    </button> */}
                    </div>
                </form>

            </div>
        </>
    )
}

export default Register
