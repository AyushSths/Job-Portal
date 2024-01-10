// import necessary dependencies
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import khalti from "../../assets/images/khalti.png";
import esewa from "../../assets/images/esewa.png";
import fonepay from "../../assets/images/fonepay.png";
import cashondelivery from "../../assets/images/cashondelivery.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Checkout(props) {

    const [products, setProducts] = useState(null);
    const user = useSelector((redux_store) => {
        console.log("redux store", redux_store)
        return redux_store.user.value
    })
    const [data, setData] = useState({
        fname: "",
        lname: "",
        company: "",
        country: "",
        town: "",
        state: "",
        postcode: "",
        phone: "",
        email: "",
        payment: "",
        cartDetails: "",
        total: "",
        status: ""
        // products: {
        //     name: "",
        //     price: "",
        //     categories: "",
        //     brand: "",
        //     status: "",
        //     images: "",
        //     productId: "",
        //     userId: "",
        //     username: "",
        //     quantity: ""
        // }
    });
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



    async function handleSubmit(event) {
        console.log("order placing...");
        event.preventDefault()
        // setSubmittedOnce(true)

        try {

            await axios.post("http://localhost:8000/api/cart/checkout", {
                "fname": data.fname,
                "lname": data.lname,
                "com_name": data.company,
                "country": data.country,
                "town": data.town,
                "state": data.state,
                "postcode": data.postcode,
                "phone": data.phone,
                "email": data.email,
                "payment": data.payment,
                "cartDetails": cartDetails,
                "total": totalAmount
                // "product": {
                //     name: product.name,
                //     price: product.price,
                //     categories: product.categories[0],
                //     brand: product.brand[0],
                //     images: product.images[0],
                //     productId: product._id,
                //     userId: user._id,
                //     username: user.name,
                //     quantity: 1,
                // }
            })
                .then((res) => {
                    // dispatch(setUser(res.data.user))
                    console.log("Order placed", res);
                    alert("Order placed")
                    // navigate("/Home")
                })
                .catch(e => {
                    alert("Error placing your order")
                    console.log(e);
                })

        }
        catch (e) {
            console.log(e);

        }
    }
    return (
        <div>
            <div className="row justify-content-center">

                <div className="col-5">
                    <form className="bill_details" action="" >
                        <h4 className="feature">Billing details</h4>
                        <table>
                            <tr>
                                <td><label htmlFor="name">First name <span style={{ color: "red" }}>*</span> </label></td>
                                <td><label htmlFor="name">Last name <span style={{ color: "red" }}>*</span> </label></td>
                            </tr>
                            <tr className="bill_inputs">
                                <td><input type="text" name="fname" id="" value={data.fname} onChange={(event) => {
                                    setData({ ...data, fname: event.target.value });
                                }} required /></td>
                                <td><input type="text" name="lname" id="" value={data.lname} onChange={(event) => {
                                    setData({ ...data, lname: event.target.value });
                                }} required /></td>
                            </tr>
                            <tr>
                                <td>Company name (optional)</td>
                            </tr>
                            <tr className="bill_heading">
                                <td colSpan={2}><input type="text" name="company" id="" value={data.company} onChange={(event) => {
                                    setData({ ...data, company: event.target.value });
                                }} /></td>
                            </tr>
                            <tr>
                                <td>Country <span style={{ color: "red" }}>*</span></td>
                            </tr>
                            <tr className="bill_country">
                                <td colSpan={2}><select class="form-select" aria-label="Default select example" name="country" value={data.country} onChange={(event) => {
                                    setData({ ...data, country: event.target.value });
                                }}>
                                    <option value="Nepal">Nepal</option>
                                    <option value="Australia" >Australia</option>
                                    <option value="India">India</option>
                                    <option value="Canada">Canada</option>
                                    <option value="Japan">Japan</option>
                                    <option value="South Korea">South Korea</option>
                                    <option value="USA">USA</option>
                                </select>
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="">Town / City <span style={{ color: "red" }}>*</span></label></td>
                            </tr>
                            <tr className="bill_heading">
                                <td colSpan={2}><input type="text" name="town" id="" value={data.town} onChange={(event) => {
                                    setData({ ...data, town: event.target.value });
                                }} required /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="">State / Zone <span style={{ color: "red" }}>*</span></label></td>
                            </tr>
                            <tr className="bill_heading bill_country">
                                <td colSpan={2}>
                                    <select class="form-select" aria-label="Default select example" name="state" value={data.state} onChange={(event) => {
                                        setData({ ...data, state: event.target.value });
                                    }}>
                                        <option value="Bagmati" defaultValue={"Bagmati"}>Bagmati</option>
                                        <option value="Koshi">Koshi</option>
                                        <option value="Madhesh">Madhesh</option>
                                        <option value="Gandaki">Gandaki</option>
                                        <option value="Lumbini">Lumbini</option>
                                        <option value="Karnali">Karnali</option>
                                        <option value="Sudurpashchim">Sudurpashchim</option>
                                    </select>
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor="">Postcode / ZIP (optioonal)</label></td>
                            </tr>
                            <tr className="bill_heading">
                                <td colSpan={2}><input type="text" id="" name="postcode" value={data.postcode} onChange={(event) => {
                                    setData({ ...data, postcode: event.target.value });
                                }} /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="">Phone <span style={{ color: "red" }}>*</span></label></td>
                            </tr>
                            <tr className="bill_heading">
                                <td colSpan={2}><input type="number" name="phone" id="" value={data.phone} onChange={(event) => {
                                    setData({ ...data, phone: event.target.value });
                                }} required /></td>
                            </tr>
                            <tr>
                                <td><label htmlFor="">Email address <span style={{ color: "red" }}>*</span></label></td>
                            </tr>
                            <tr className="bill_heading">
                                <td colSpan={2}><input type="email" name="email" id="" value={data.email} onChange={(event) => {
                                    setData({ ...data, email: event.target.value });
                                }} required /></td>
                            </tr>
                        </table>
                    </form>
                </div>
                <div className="col-4 right place_order">
                    <div className="details">
                        <div className="total">
                            <h4 className="text-muted">
                                <b>Your order</b>
                            </h4>
                            <table>
                                <tr>
                                    <th>Products</th>
                                    <th className="amnt">Subtotal</th>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ padding: "0" }}><hr /></td>
                                </tr>
                                <tbody>
                                    {
                                        cartDetails?.map(product => {
                                            return (
                                                <>
                                                    <tr className="chk_products">
                                                        <td className="chk_name">{product.name} x {product.quantity}</td>
                                                        <td className="amnt">{product.price}</td>
                                                    </tr>
                                                    < tr >
                                                        <td colSpan="2" style={{ padding: "0" }}><hr /></td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }

                                </tbody>
                                <tr>
                                    <td>Subtotal</td>
                                    <td className="amnt">Rs.{totalAmount}</td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ padding: "0" }}><hr /></td>
                                </tr>
                                <tr>
                                    <td>Shipping</td>
                                    <td className="amnt">Rs.99</td>
                                </tr>
                                <tr>
                                    <td colSpan="2" style={{ padding: "0" }}><hr /></td>
                                </tr>
                                <tr>
                                    <td><b>Total Amount</b> </td>
                                    <td class='amnt tta'><b>Rs.{totalAmount + 99}</b></td>
                                </tr>
                                <tbody className="payment_method">
                                    <tr>
                                        <td><input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value="Cash on delivery" onChange={(event) => {
                                            setData({ ...data, payment: event.target.value })
                                        }} />
                                            <label class="form-check-label" for="flexRadioDefault1">
                                                Cash on delivery
                                            </label></td>
                                        <td className="amnt"><img src={cashondelivery} alt="" /></td>
                                    </tr>
                                    < tr >
                                        <td colSpan="2" style={{ padding: "0" }}><hr /></td>
                                    </tr>
                                    <tr>
                                        <td><input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value="Khalti" onChange={(event) => {
                                            setData({ ...data, payment: event.target.value })
                                        }} />
                                            <label class="form-check-label" for="flexRadioDefault2">
                                                Khalti
                                            </label></td>
                                        <td className="amnt"><img src={khalti} alt="" /></td>
                                    </tr>
                                    < tr >
                                        <td colSpan="2" style={{ padding: "0" }}><hr /></td>
                                    </tr>
                                    <tr>
                                        <td><input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" value="eSewa" onChange={(event) => {
                                            setData({ ...data, payment: event.target.value })
                                        }} />
                                            <label class="form-check-label" for="flexRadioDefault3">
                                                eSewa
                                            </label></td>
                                        <td className="amnt"><img src={esewa} alt="" /></td>
                                    </tr>
                                    < tr >
                                        <td colSpan="2" style={{ padding: "0" }}><hr /></td>
                                    </tr>
                                    <tr>
                                        <td><input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault4" value="Fonepay" onChange={(event) => {
                                            setData({ ...data, payment: event.target.value })
                                        }} />
                                            <label class="form-check-label" for="flexRadioDefault4">
                                                Fonepay
                                            </label></td>
                                        <td className="amnt"><img src={fonepay} alt="" /></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {cartDetails?.length == 0 ? null :
                            // cartDetails?.map((product, index) => { return <button className="add chkout" onClick={(event) => handleSubmit(event, product, index)}>Place Order</button> })
                            <button className="add chkout" onClick={handleSubmit}>Place Order</button>
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}