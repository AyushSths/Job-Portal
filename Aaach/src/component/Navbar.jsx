import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { NavLink } from "react-router-dom"
import { logout } from "../redux/slice/userSlice";
import Aaach from "../assets/images/logo-5-remove.png"
import cart from "../assets/images/shopping-cart.png"
import clipboard from "../assets/images/clipboard.png"
import profile from "../assets/images/user.png"
import favourites from "../assets/images/heart.png"
import menu from "../assets/images/menu.png"
import profile_s from "../assets/images/user-s.png"
import search_button from "../assets/images/search_button-transformed.png"
import close from "../assets/images/close.png"
import shopping from "../assets/images/shopping.json"
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Uparrow from './Uparrow';
export default function Navbar(props) {

    const user = useSelector((redux_state) => redux_state.user.value)
    const user_s = useSelector((redux_store) => {
        return redux_store.user.value
    })
    // const cart_items = useSelector((redux_state) => redux_state.cart_items.value)
    const dispatch = useDispatch()

    // const [status, setstatus] = useState(true);
    const [cartDetails, setcartDetails] = useState([]);
    const [newCartItem, setNewCartItem] = useState({});
    useEffect(() => {
        function fetch_data() {
            axios.get('http://localhost:8000/api/cart')
                .then((res) => {
                    // Handle success, e.g., show a success message
                    // console.log('Cart length products', res.data);
                    setcartDetails(res.data.data)
                })
                .catch((err) => {
                    // Handle error, e.g., show an error message
                    console.error('Error cart products', err);
                });
        }
        fetch_data()
    })
    const [orderDetails, setorderDetails] = useState([]);
    useEffect(() => {
        function fetch_data() {
            axios.get('http://localhost:8000/api/cart/checkout')
                .then((res) => {
                    // Handle success, e.g., show a success message
                    // console.log('Cart length products', res.data);
                    setorderDetails(res.data.data)
                })
                .catch((err) => {
                    // Handle error, e.g., show an error message
                    console.error('Error cart products', err);
                });
        }
        fetch_data()
    }, [])

    const handleLogout = () => {
        // localStorage.removeItem("access_token")
        dispatch(logout())
    }

    const [state, setState] = useState(false);
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setState(true)
            }
            else {
                setState(false)
            }
        })
    }, [])



    const [products, setProducts] = useState(null);
    const [originalProducts, setOriginalProducts] = useState(null);


    useEffect(() => {
        let url = `http://localhost:8000/api/products`
        axios.get(url)
            .then(res => {
                setProducts(res.data.data)
                setOriginalProducts(res.data.data)
                console.log("Prducts Data", res.data.data);
            })
            .catch(err => {

            })
    }, []);

    const filteredCat = (catItem) => {
        console.log('cat');
        const result = originalProducts.filter((curpro) => {
            return curpro.categories[0] === catItem
        });
        setProducts(result)
        console.log(result);
    }

    const [btn, setBtn] = useState(false)
    const handleClick = () => {
        setBtn(btn => !btn)
    }
    // let toggleClass = btn ? 'active' : '';
    let toggleClassName = btn ? 'collapsed' : '';

    // console.log("re-render");
    return (
        <>
            <nav class='navbar sticky-top navbar-expand-lg navbar-light bg-light shadow-sm p-2 mb-5 bg-body rounded' >
                <div class="container-fluid">
                    <Link class="navbar-brand logo" to="/*"><img src={Aaach} class="card-img-top" alt="..." /></Link>
                    <button class={`navbar-toggler ${toggleClassName}`} onClick={handleClick} type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        {toggleClassName == 'collapsed' ? <img src={close} /> : <img src={menu} />}
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 items">
                            <li class="nav-item">
                                <NavLink className='nav-link' aria-current="page" to="/home" id='home'>HOME</NavLink>
                            </li>
                            <li className="nav-item" >
                                <NavLink className="nav-link" to="men">MEN</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="women">WOMEN</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/footer/about">ABOUT</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/footer/contact">CONTACT</NavLink>
                            </li>
                            <li className="nav-item">
                                {
                                    user?.role == "seller"
                                    &&
                                    <li className="nav-item">
                                        <NavLink className="nav-link" to="/products/create">Post</NavLink>
                                    </li>
                                }
                            </li>
                        </ul>

                        <form className="d-flex" onSubmit={(e) => {
                            e.preventDefault();
                            props.setSearchTerm(e.target.search.value)
                        }}>
                            <input className="form-control search-bar me-2 " type="search" placeholder="Search for brands, products and more" name="search" aria-label="Search" />
                            <button className="btn btn-outline-success" type="submit"><Link to="/search_product"><img src={search_button} /></Link></button>
                        </form>

                    </div>
                </div>
                <div className="dropdown">
                    <Link className="dropdown-toggle" to="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src={profile} />
                    </Link>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1" >
                        <li id='wel'>
                            <b>Welcome</b>

                            {
                                user ? <><span style={{ display: "block" }} id="uname"><img src={profile_s} />{user?.name}(<span classNameName='small'>{user?.role}</span>)</span> </> :
                                    <span style={{ display: "block" }} id='uaccess'>To access account
                                    </span>
                            }

                            <hr />
                        </li>
                        <li>{
                            !user
                            &&
                            <Link className="dropdown-item" to="/login">LOGIN</Link>

                        }</li>
                        <li>{!user
                            &&
                            <Link className="dropdown-item" to="signup">SIGNUP</Link>
                        }</li>
                        <li>
                            {
                                user
                                &&
                                <Link className="dropdown-item" onClick={handleLogout} to="/*">Logout</Link>

                            }
                        </li>
                    </ul>
                </div>
                <span className='cart' >
                    {
                        user ?
                            user?.role == "buyer" ?
                                <Link className="nav-link" to="/cart"><img src={cart} className='img' /> <span className="cart_length"> {cartDetails?.length}  </span></Link> : <Link className="nav-link" to="/orders"><img src={clipboard} className='img' />
                                    <span className="cart_length"> {orderDetails?.length}  </span></Link> :
                            <Link className="nav-link" to="/login"><img src={cart} className='img' /></Link>
                    }
                </span>
            </nav>

            <div className="up-arrow" >
                <Uparrow />
            </div>
        </>
    );
}