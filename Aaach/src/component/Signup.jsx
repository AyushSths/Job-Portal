import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import Login from './Login';
import ErrorMessage from './ErrorMessage';
import { useNavigate } from "react-router-dom"
import insta from "../assets/images/logo_insta.jpg"
import facebook from "../assets/images/logo-facebook.jpg"
import twitter from "../assets/images/logo-twitter.jpg"
import { Link } from "react-router-dom"

export default function Signup() {
    let navigate = useNavigate()
    let [submittedOnce, setSubmittedOnce] = useState(false)
    let form_data = {
        uname: "",
        email: "",
        password: "",
        role: ""
    }
    let [data, setData] = useState(form_data);
    let [error, setError] = useState({
        uname: "",
        email: "",
        password: "",
        role: ""
    })

    async function handleSubmit(event) {
        event.preventDefault()
        setSubmittedOnce(true)

        //Check form validation
        let validForm = true
        if (!data.uname || !data.email || !data.password || !data.role) {
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
            let url = "https://ecommerce-sagartmg2.vercel.app/api/users/signup"
            let data = {
                "name": event.target.uname.value,
                "email": event.target.email.value,
                "password": event.target.password.value,
                "role": event.target.role.value
            }
            axios
                .post(url, data)
                .then(res => {
                    console.log(res);
                    navigate("/Login")
                })
                .catch(err => {
                    console.log(err.response.data);
                    let errors = err.response.data.errors
                    let temp = {}
                    errors.forEach(el => {
                        temp[el.param] = el.msg
                    })
                    setError(temp)
                })

            try {

                await axios.post("http://localhost:8000/signup", {
                    name, email, password, role,
                })
                    .then((res) => {
                        // dispatch(setUser(res.data.user))
                        alert("Signed up")
                        // navigate("/Home")
                    })
                    .catch(e => {
                        alert("Error signing up")
                        console.log(e);
                    })

            }
            catch (e) {
                console.log(e);

            }
        }

    }

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')

    return (
        <>
            <form onSubmit={handleSubmit} class="sign-up">
                <h2 id='title'>Sign Up</h2>
                <div class="mb-3">
                    <input type="text" class="form-control form-input" id="exampleInputPassword1" placeholder='Username' name='uname' value={data.uname} onChange={((event) => {
                        setData({ ...data, [event.target.name]: event.target.value })
                        setError({ ...error, [event.target.name]: event.target.value ? "" : "Required" })
                        setName(event.target.value)
                    })} />
                    {
                        submittedOnce && error.uname && <ErrorMessage msg={error.uname} />
                    }
                </div>
                <div class="mb-3">
                    <input type="email" class="form-control form-input" id="exampleInputEmail1" placeholder='E-mail' aria-describedby="emailHelp" name='email' value={data.email} onChange={((event) => {
                        setData({ ...data, [event.target.name]: event.target.value })
                        setError({ ...error, [event.target.name]: event.target.value ? "" : "Required" })
                        setEmail(event.target.value)
                    })} />
                    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    {
                        submittedOnce && error.email && <ErrorMessage msg={error.email} />
                    }
                </div>
                <div class="mb-3">
                    <input type="password" class="form-control form-input" id="exampleInputPassword1" placeholder='Password' name='password' value={data.password} onChange={((event) => {
                        setData({ ...data, [event.target.name]: event.target.value })
                        setError({ ...error, [event.target.name]: event.target.value ? "" : "Required" })
                        setPassword(event.target.value)
                    })} />
                    {
                        submittedOnce && error.password && <small>Required *</small> && <ErrorMessage msg={error.password} />
                    }
                </div>
                {/* <div className="mb-3">
                    <input type="text" class="form-control form-input" id="exampleInputPassword1" placeholder='Address' name='password' required />
                </div>
                <div className="mb-3">
                    <input type="number" class="form-control form-input" id="exampleInputPassword1" placeholder='Contact' name='password' required />
                </div> */}
                <div class="mb-3 ">
                    <select class="form-select form-input" aria-label="Default select example" name='role' value={data.role} onChange={((event) => {
                        setData({ ...data, [event.target.name]: event.target.value })
                        setError({ ...error, [event.target.name]: event.target.value ? "" : "Required" })
                        setRole(event.target.value)
                    })}>
                        <option selected>Select role</option>
                        <option value="buyer">Buyer</option>
                        <option value="seller">Seller</option>
                    </select>
                    {/* <input type="text" placeholder='role' onChange={handleChange} value="buyer" /> */}
                    {
                        submittedOnce && error.role && <small>Required *</small> && <ErrorMessage msg={error.role} />
                    }

                </div>
                {/* <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div> */}
                <button type="submit" class="btn btn-primary">Sign up</button>
                <div>
                    <hr className='line' /><span className='or'>OR</span><hr className='line' />
                </div>
                <span class="foot-logo"><a href="https://twitter.com/" class="href"><img src={twitter} /></a>
                    <a href="https://www.facebook.com/" class="href"><img src={facebook} /></a>
                    <a href="https://www.instagram.com/" class="href"><img src={insta} /></a>
                </span>
                <span class="need"> Already a user ? <Link to="/login" class="signup">LOGIN</Link></span>
            </form>
        </>
    );
}

