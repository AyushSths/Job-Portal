import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import right_arrow from '../assets/images/right-arrow.png'
import google from '../assets/images/google.png'
import facebook from '../assets/images/facebook.png'
import { useState } from 'react'
import axios from "axios"
import { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setUser } from './redux/slice/userSlice'

function Login() {
    const throwIfNamespace = false
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let form_data = {
        username: "",
        email: "",
        password: "",
    }

    let [data, setData] = useState(form_data);
    let [error, setError] = useState("")

    async function handleSubmit(event) {
        event.preventDefault()
        // let url = "http://localhost:8000/api/users/login"
        let url = "https://job-portal-app-api-98as.onrender.com/api/users/login"
        await axios
            .post(url, data)
            .then((res) => {
                console.log(res);
                // console.log("username", res.data.user.name);
                console.log("user", res.data.data);
                dispatch(setUser(res.data.data))
                // console.log("access token", res.data?.token);
                localStorage.setItem('user', JSON.stringify(res.data.data));
                localStorage.setItem("access token", res.data?.token)
                navigate("/")
                alert(res.data?.msg)
                //setup user data in redux
            })
            .catch(err => {
                setError(err.response?.data?.msg)
                // console.log(err);
            })
    }

    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (error) {
            setShowError(true);

            const timerId = setTimeout(() => {
                setShowError(false);
                setError("");  // Clear the error after the specified delay
            }, 4000);

            return () => clearTimeout(timerId);
        }
    }, [error]);

    function handleChange(event) {
        // console.log(event.target.name);
        setData({ ...data, [event.target.name]: event.target.value })
    }

    return (
        <>
            <div className="container blur"></div>
            <div className="user-form" >
                <form className="form" onSubmit={handleSubmit}>
                    <h1 style={{ textAlign: "center" }}>Login</h1>
                    {showError && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    <div className="email-input">
                        <div class="flex-column">
                            <label>Email </label></div>
                        <div class="inputForm email">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="0 0 32 32" height="20"><g data-name="Layer 3" id="Layer_3"><path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z"></path></g></svg>
                            <input placeholder="Enter your Email" className="input" type="email" name='email' value={data.email} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="pwd-input">
                        <div class="flex-column">
                            <label>Password </label></div>
                        <div class="inputForm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" viewBox="-64 0 512 512" height="20"><path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0"></path><path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0"></path></svg>
                            <input placeholder="Enter your Password" className="input password" type="password" name='password' value={data.password} onChange={handleChange} required />
                        </div>
                    </div>

                    <div className="flex-row">
                        <div>
                            <input type="radio" />
                            <label>Remember me </label>
                        </div>
                        <span class="span">Forgot password?</span>
                    </div>
                    <button class="button-submit">Log In</button>


                    <p class="p line">Or With</p>

                    <div class="medias">
                        <div className="google"><img src={google} alt="" /> Google   </div>
                        <div className="facebook"> <img src={facebook} alt="" /> Facebook </div>
                    </div>
                    <div className="n-sign">
                        <p className="" style={{ fontSize: "18px" }}>Don't have an account? <Link class="btn-link" to="/register">Sign up</Link></p>
                    </div>
                </form>
                <div className="form-section">
                    <div className="section-content">
                        <h1>Jobs Portal</h1>
                        <p style={{ fontSize: "18px" }}>A dream doesn't become reality through magic; it takes sweat, determination and hard work....</p>
                        <p className="section-btn" style={{ fontSize: "18px" }}>Don't have an account? <Link class="btn-link" to="/register">Sign up <img src={right_arrow} alt="" className="r-arrow" /></Link></p>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Login
