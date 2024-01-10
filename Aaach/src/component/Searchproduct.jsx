import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import ImgnotFound from "../assets/images/ImgnotFound.jpg"
import { Link } from "react-router-dom"
import notfound from "../assets/images/no result-2.png"

export default function Searchproduct(props) {
    const [products, setproducts] = useState({});
    const [isLoadingProduct, setisLoadingProduct] = useState(true);
    let path = 'Home / products / search_product'
    useEffect(() => {
        // let url = `https://ecommerce-sagartmg2.vercel.app/api/products?search_term=${props.search_term}`
        let url = `http://localhost:8000/api/products?search_term=${props.search_term}`;

        axios.get(url)
            .then(res => {
                // setproducts(res.data.data[0].data)
                setproducts(res.data.data)
                setisLoadingProduct(false)
                // setMetadata({ ...meta_data, total: res.data.data[0]?.metadata[0].total })
            })
            .catch(err => {

            })
    }, [props.search_term])

    if (isLoadingProduct) {
        return <>
            <div className='home-spinner' style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "90vh"
            }}>
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
        </>
    }

    return (
        <>
            <span className='path'><Link to="/home">Home</Link> / products / search_product  </span>
            <div><h2 class="categorey">Searched product for : {
                props.search_term
            } ({products?.length}) </h2></div>
            <hr />
            {products?.length === 0 ? (
                <img src={notfound} alt="" className='notfound' />
            ) : (
                <div className="products row">
                    {
                        products != null ?
                            products?.map(product => {
                                return <div className='col-sm-6  col-md-3 p-3'>
                                    <Link to={`/products/${product.id}`}>
                                        <div class="card product " >

                                            {/* <img src={"https://res.cloudinary.com/dtv8dtpkm/image/upload/v1679221462/cnlv5glezaixgasigxvk.webp"} class="card-img-top" alt="..." /> */}
                                            <img src={product.images || ImgnotFound} class="card-img-top" alt="..." />
                                            {/* <img src={ImgNotfound} class="card-img-top" alt="..." /> */}
                                            <div class="card-body">
                                                <h5 class="card-title ">{product.name}</h5>
                                                <p class="card-text">${product.price}</p>
                                                <Link class="nav-link" to="/login"><button class="btn btn-primary add" type='button' >Add to Cart</button></Link>

                                                {/* {
                                            user?.role == "buyer" ?
                                                <button class="btn btn-primary add" type='button' onClick={(e) => handleAddToCart(e, product)} >Add to Cart</button>
                                                : <></>
                                        }
                                        {
                                            user?.role == "seller" ?
                                                <>
                                                    <Link to={`/products/edit/${product._id}`}><button class="btn btn-primary" type='button' >Edit</button></Link>
                                                    <button class="btn btn-danger mx-2" type='button' >Delete</button>
                                                </> : <></>
                                        } */}
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            }) :
                            products?.map(product => {
                                return <div className="not"> <p class="card-text">Search product not found!</p></div>
                            })
                    }
                </div>
            )}
        </>)
}