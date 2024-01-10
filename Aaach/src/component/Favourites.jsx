import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToFavourite, reset } from "../redux/slice/cartSlice";
import delet from "../assets/images/delete.png"
import cart from "../assets/images/shopping-cart.png"
import { addToCart } from '../redux/slice/cartSlice';
import { useState } from "react";

export default function Favourites() {

    const dispatch = useDispatch();
    const [products, setproducts] = useState(null);
    const user = useSelector((redux_store) => {
        return redux_store.user.value
    })
    const cart_items = useSelector(redux_store => redux_store.cart_items.value)
    let sn = 1;
    useEffect(() => {
        let url = `https://ecommerce-sagartmg2.vercel.app/api/products`
        axios.get(url)
            .then(res => {
                setproducts(res.data.data[0].data)
            })
            .catch(err => {

            })
    }, []);
    function handleAddToCart(e, product) {
        e.preventDefault();

        console.log("buttn");
        dispatch(addToFavourite(product))
    }

    return (
        <div>
            <div class="row justify-content-center">
                <h4>My Wishlist</h4>
                <hr />
                <div class="col-4 left">
                    <p style={{ marginBottom: '0' }}><input type="checkbox" />   0/1 items selected</p>
                    <hr />
                    {
                        cart_items.map(item => {
                            console.log(item);

                            return <>

                                {
                                    item.name &&
                                    <div class="card_pro" style={{ width: "708px" }}>
                                        <div class="row g-0">
                                            <div class="col-md-4">
                                                <span style={{ position: 'absolute' }}><input type="checkbox" /> {item.brands}</span>
                                                <img src={item.images} class="img-fluid rounded-start" />
                                            </div>
                                            <div class="col-md-8">
                                                <div class="card-body">

                                                    <h5 class="card-title">
                                                        {/* <img src={cart} /> */}
                                                        <span class='cart_sm'><img src={cart} onClick={(e) => handleAddToCart(e, products)} /></span> : <></>

                                                        {/* {
                                                            products?.map(product => {
                                                                {
                                                                    user?.role == "buyer" ?
                                                                        <span class='cart_sm'><img src={cart} onClick={(e) => handleAddToCart(e, product)} /></span> : <></>
                                                                }
                                                            })
                                                        } */}
                                                        {item.name}</h5>
                                                    <p class="card-text">{item.brands}</p>
                                                    <p class="card-text">{item.price}</p>
                                                    <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small>
                                                        <span class="delet_f"><img src={delet} /></span>
                                                    </p>
                                                    {/* <button onClick={item.name == null} >Delete</button> */}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </>
                        })
                    }
                </div>
            </div>
        </div>
    )
}