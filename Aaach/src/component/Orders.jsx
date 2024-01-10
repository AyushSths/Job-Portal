import axios from "axios";
import React from "react";
import { useEffect } from "react";
import delet from "../assets/images/delete.png";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Orders() {
    let value = 1
    const [orderDetails, setorderDetails] = useState(null);
    function fetchData() {
        axios.get("http://localhost:8000/api/cart/checkout")
            .then((res) => {
                // Handle success, e.g., show a success message
                console.log('Cart products', res.data);
                setorderDetails(res.data.data)
            })
            .catch((err) => {
                // Handle error, e.g., show an error message
                console.error('Error cart products', err);
            });
    }
    useEffect(() => {
        fetchData()
    }, []);

    const totalAmount = orderDetails ? orderDetails.reduce((total, item) => {
        return total + item.price * item.quantity;
    }, 0) : 0;

    return (
        <div>
            <div className="order-table ">
                <table>
                    <tr className="order-details">
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Total</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>

                    {
                        orderDetails?.map((item, index) => {
                            const ind = item.price
                            return (
                                <tr className="order-details">
                                    <td>{item._id}</td>
                                    <td>{item.fname} {item.lname}</td>
                                    <td>Rs. {item.total}</td>
                                    <td>01 Jan 2021</td>
                                    <td>{item.status}</td>

                                    <td>
                                        <Link to={`/products/view/${item?._id}`}><button className="bttn ed">View</button></Link>
                                        <Link to={`/products/edit/${item?._id}`}><button className="bttn ed">Edit</button></Link>
                                        {/* <br /><button className="bttn btn-danger remove" onClick={() => deleteItem(item._id)}>Delete</button> */}
                                    </td>
                                </tr>
                            )
                        })
                    }

                </table>
            </div>
        </div>
    )
}