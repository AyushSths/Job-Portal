import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function OrderView() {
    const { id } = useParams();
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        fetchData();
    }, [id]);

    function fetchData() {
        axios
            .get(`http://localhost:8000/api/cart/checkout/${id}`)
            .then((res) => {
                console.log('Order details', res.data);
                setOrderDetails(res.data.data);
            })
            .catch((err) => {
                console.error('Error fetching order details', err);
            });
    }

    // const totalAmount = orderDetails ? orderDetails?.map((item) => {
    //     return (<>
    //         {
    //             item?.cartDetails?.reduce((total, pro) => {
    //                 return total + pro.price * pro.quantity;
    //             })
    //         }
    //     </>)

    // }, 0) : 0;

    // console.log("totalAmount", totalAmount);
    return (
        <div>
            <div className="row justify-content-center">

                <div className="col-5">
                    <form className="bill_details" action="" >
                        <h4 className="categorey" style={{ color: "black" }}>Order details</h4>
                        <div className="title-line products-line"></div>
                        <div className="info">
                            <table className="order_info">
                                <tbody>
                                    <tr>
                                        <th colSpan={2}>Order info</th>
                                    </tr>
                                    <tr>
                                        <td>Id</td>
                                        <td className="odetail_left">{orderDetails?._id}</td>
                                    </tr>
                                    <tr>
                                        <td>Date</td>
                                        <td className="odetail_left">01 Jan 2023</td>
                                    </tr>
                                    <tr>
                                        <td>payment_method</td>
                                        <td className="odetail_left">{orderDetails?.payment}</td>
                                    </tr>
                                    <tr>
                                        <td>Status</td>
                                        <td className="odetail_left">{orderDetails?.status}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="info">
                            <table className="customer_info">
                                <tbody>
                                    <tr>
                                        <th colSpan={2}>Customer info</th>
                                    </tr>
                                    <tr>
                                        <td>Name</td>
                                        <td className="odetail_left">{orderDetails?.fname} {orderDetails?.lname}</td>
                                    </tr>
                                    <tr>
                                        <td>Email</td>
                                        <td className="odetail_left">{orderDetails?.email}</td>
                                    </tr>
                                    <tr>
                                        <td>Phone</td>
                                        <td className="odetail_left">{orderDetails?.phone}</td>
                                    </tr>
                                    <tr>
                                        <td>Country</td>
                                        <td className="odetail_left">{orderDetails?.country}</td>
                                    </tr>
                                    <tr>
                                        <td>State</td>
                                        <td className="odetail_left">{orderDetails?.state}</td>
                                    </tr>
                                    <tr>
                                        <td>Address</td>
                                        <td className="odetail_left">{orderDetails?.town}</td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </form>
                </div>
                <div className="col-4 right place_order">
                    <div className="details">
                        <div className="total">
                            <h4 className="text-muted">
                                <b>Order items</b>
                            </h4>
                            <table>
                                <tr>
                                    <th>Products  ({orderDetails?.cartDetails?.length})</th>
                                    <th className="amnt" colSpan={2}>Subtotal</th>
                                </tr>
                                <tr>
                                    <td colSpan="3" style={{ padding: "0" }}><hr /></td>
                                </tr>
                                <tbody>


                                    {
                                        orderDetails?.cartDetails?.map(item => {
                                            return (
                                                <>
                                                    <tr className="chk_products">
                                                        <td style={{ width: "150px" }}><img src={item.images} className="product-image" style={{ width: "50px", height: "60px" }} /></td>
                                                        <td className="chk_name">{item.name} x {item?.quantity}</td>
                                                        <td className="amnt">{item?.price}</td>
                                                    </tr>
                                                    < tr >
                                                        <td colSpan="3" style={{ padding: "0" }}><hr /></td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }

                                </tbody>
                                <tr>
                                    <td>Subtotal</td>
                                    <td className="amnt" colSpan={2}>Rs.{orderDetails?.total - 99}</td>

                                </tr>
                                <tr>
                                    <td colSpan="3" style={{ padding: "0" }}><hr /></td>
                                </tr>
                                <tr>
                                    <td>Shipping</td>
                                    <td className="amnt" colSpan={2}>Rs.99</td>
                                </tr>
                                <tr>
                                    <td colSpan="3" style={{ padding: "0" }}><hr /></td>
                                </tr>
                                <tr>
                                    <td><b>Total Amount</b> </td>
                                    <td class='amnt tta' colSpan={2}><b>Rs.{orderDetails?.total}</b></td>

                                </tr>

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}
