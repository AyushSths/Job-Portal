// import necessary dependencies
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import delet from "../assets/images/delete.png";
import checkout from "../assets/images/checkout.png";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Cart(props) {

    const [products, setProducts] = useState(null);
    const [cartDetails, setcartDetails] = useState(null);
    function fetchData() {
        axios.get('http://localhost:8000/api/cart')
            .then((res) => {
                // Handle success, e.g., show a success message
                console.log('Cart products', res.data);
                setcartDetails(res.data.data)
            })
            .catch((err) => {
                // Handle error, e.g., show an error message
                console.error('Error cart products', err);
            });
    }
    useEffect(() => {
        fetchData()
    }, [])
    console.log('Cart Details', cartDetails);

    function fetchProductData() {
        let url = `http://localhost:8000/api/products?search_term=${props.search_term}`
        axios.get(url)
            .then(res => {
                let fetch_data = res.data.data
                setProducts(fetch_data)
                console.log(fetch_data)
                console.log(fetch_data[0].rating.count)
            })
            .catch(err => {
                console.log("error", err);
            })
    }
    useEffect(() => {
        fetchProductData()
    }, [props.search_term]);

    const totalAmount = cartDetails ? cartDetails.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0) : 0;

    const increaseQuantity = (index) => {
        const updatedCart = [...cartDetails];
        updatedCart[index].quantity += 1;
        setcartDetails(updatedCart);
        updateQuantityInDatabase(updatedCart[index]._id, updatedCart[index].quantity);

        const updatedProducts = [...products];
        if (updatedProducts[index].rating.count > 1) {
            console.log(products)
            updatedProducts[index].rating.count -= 1;
            setProducts(updatedProducts);
            console.log("updated", updatedProducts);
            updateCountInDatabase(updatedProducts[index]._id, updatedProducts[index].rating.count);
        }
    };

    const decreaseQuantity = (index) => {
        const updatedCart = [...cartDetails];
        if (updatedCart[index].quantity > 1) {
            updatedCart[index].quantity -= 1;
            setcartDetails(updatedCart);
            updateQuantityInDatabase(updatedCart[index]._id, updatedCart[index].quantity);
        }

        const updatedProducts = [...products];
        if (updatedCart[index].quantity > 1) {
            updatedProducts[index].rating.count += 1;
            setProducts(updatedProducts);
            console.log("updated", updatedProducts);
            updateCountInDatabase(updatedProducts[index]._id, updatedProducts[index].rating.count);
        }
        // else if (updatedCart[index].quantity < 2) {
        //     deleteItem(updatedCart[index]._id);
        // }

    };

    const updateQuantityInDatabase = (itemId, newQuantity) => {
        // Make a PUT request to your API endpoint to update the quantity in MongoDB.
        axios
            .put(`http://localhost:8000/api/cart/${itemId}`, { quantity: newQuantity })
            .then((res) => {
                console.log("Quantity updated in MongoDB");
            })
            .catch((err) => {
                console.error("Error updating quantity in MongoDB", err);
            });
    };

    const updateCountInDatabase = (id, newCount) => {
        // Make a PUT request to your API endpoint to update the quantity in MongoDB.
        axios
            .put(`http://localhost:8000/api/products/${id}`, { count: newCount })
            .then((res) => {
                console.log("Count updated in MongoDB", res.data);
            })
            .catch((err) => {
                console.error("Error updating count in MongoDB", err);
            });
    };

    const deleteItem = (itemId) => {
        axios
            .delete(`http://localhost:8000/api/cart/${itemId}`)
            .then((res) => {
                if (res.status === 200) {
                    console.log("Item deleted from cart");
                    // After successful deletion, you can update the cart details by fetching the updated data.
                    fetchData();
                } else {
                    console.error("Unexpected status code:", res.status);
                }
            })
            .catch((err) => {
                if (err.response && err.response.status === 404) {
                    console.log("Item not found in cart.", itemId);
                } else {
                    console.error("Error deleting item from cart", err);
                }
            });
    };

    return (
        <div>
            <div className="row justify-content-center">
                <h4>My Cart</h4>
                <hr />
                <div className="col-4 left">
                    <p style={{ marginBottom: "0" }}>
                        Cart list - {cartDetails?.length} items
                    </p>
                    <hr />
                    {cartDetails?.length == 0 ? <><h4 id="empty">Add items to your cart</h4><button class="add_item"><Link to="/Home">Add +</Link></button></> :
                        cartDetails?.map((item, index) => {
                            const ind = item.price
                            return (
                                item.name && (
                                    <div className="card_pro" key={index}>
                                        <div className="row g-0">
                                            <div className="col-md-2">
                                                <Link to={`/products/${item._id}`}><img src={item.images} className="img-fld rounded-start" /></Link>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body">
                                                    <h5 className="card-title">
                                                        <div className="quantity">
                                                            <span className="handle_quantity">
                                                                <button onClick={() => decreaseQuantity(index)}>-</button>{" "}
                                                                <span id="num">{
                                                                    item.quantity}
                                                                </span>{" "}
                                                                <button onClick={() => increaseQuantity(index)}>+</button>
                                                            </span>
                                                        </div>
                                                        <Link to={`/products/${item._id}`}>{item.name}</Link>
                                                    </h5>
                                                    <p className="card-text">{item.brands}</p>
                                                    <p className="card-text">Rs.{item.price}</p>
                                                    <p className="card-text">
                                                        <small className="text-muted">Last updated 3 mins ago</small>
                                                        <span className="delet" onClick={() => deleteItem(item._id)}>
                                                            <img src={delet} alt="Remove" />
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            );
                        })}
                </div>
                <div className="col-4 right">
                    <div className="details">
                        <div className="total">
                            <h5 className="text-muted">
                                <b>PRICE DETAILS</b>
                            </h5>
                            <hr style={{ marginBottom: "25px" }} />
                            <table>
                                <tr>
                                    <td>Total items</td>
                                    <td className="amnt">{cartDetails?.length}</td>
                                </tr>
                                <tr>
                                    <td>Total NRP</td>
                                    <td className="amnt">Rs.{totalAmount}</td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ width: "400%" }}><hr /></td>
                                </tr>
                                <tr>
                                    <td><b>Total Amount</b> </td>
                                    <td class='amnt'><b>Rs.{totalAmount}</b></td>
                                </tr>

                            </table>
                        </div>
                        {cartDetails?.length == 0 ? null :
                            <Link to="/checkout"> <button className="add chkout">CHECKOUT <img src={checkout} alt="" /></button></Link>}
                    </div>
                </div>
            </div>
        </div>
    )
}