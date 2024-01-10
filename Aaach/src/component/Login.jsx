import axios, { AxiosHeaders } from 'axios';
import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../redux/slice/userSlice';
import insta from "../assets/images/logo_insta.jpg"
import facebook from "../assets/images/logo-facebook.jpg"
import twitter from "../assets/images/logo-twitter.jpg"
import bg from "../assets/images/bg_4-transformed.png"
import { Link } from "react-router-dom"

export default function Login() {
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
        let url = `${process.env.REACT_APP_SERVER_URL}/users/login`
        axios
            .post(url, data)
            .then((res) => {
                console.log(res);
                dispatch(setUser(res.data.user))
                // console.log("username", res.data.user.name);
                localStorage.setItem("access token", res.data.access_token)
                navigate("/Home")
                //setup user data in redux
            })
            .catch(err => {
                setError(err.response.data.msg)
            })

        try {

            await axios.post("http://localhost:8000/login", { data })
                .then((res) => {
                    // dispatch(setUser(res.data.user))
                    // alert("Welcome")
                    // navigate("/Home")
                })
                .catch(e => {
                    alert("Invalid credintials")
                    console.log(e);
                })

        }
        catch (e) {
            console.log(e);

        }

    }

    async function submit(e) {
        e.preventDefault();



    }

    function handleChange(event) {
        // console.log(event.target.name);
        setData({ ...data, [event.target.name]: event.target.value })
    }


    return (
        <>
            {
                error
                &&
                <div class="alert alert-danger" role="alert">
                    {error}
                </div>
            }
            <form onSubmit={handleSubmit} className="login">
                <h2 id='title'>Login</h2>
                <div class="mb-3">
                    <input type="email" className="form-control form-input" id="exampleInputEmail1" placeholder='Email' aria-describedby="emailHelp" name='email' value={data.email} onChange={handleChange} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">

                    <input type="password" className="form-control form-input" id="exampleInputPassword1" placeholder='Password' name='password' value={data.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Log in</button>
                <div>
                    <hr className='line' /><span className='or'>OR</span><hr className='line' />
                </div>
                <span className="foot-logo">
                    <a href="https://twitter.com/" className="href"><img src={twitter} /></a>
                    <a href="https://www.facebook.com/" className="href"><img src={facebook} /></a>
                    <a href="https://www.instagram.com/" className="href"><img src={insta} /></a>
                </span>
                <span className="need"> Need an account ? <Link to="/signup" className="signup">SIGN UP</Link></span>
            </form>
        </>
    );
}