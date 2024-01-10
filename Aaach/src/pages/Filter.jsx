import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import star_rating from "../assets/images/5-star-rating.png";
import water_bg from "../assets/images/water-color.jpg";
import favourites_sm from "../assets/images/heart_wh.png"
import { Link } from "react-router-dom"
import ImgnotFound from "../assets/images/ImgnotFound.jpg"

export default function Filter() {
    const [products, setProducts] = useState([]);
    const [meta_data, setMetadata] = useState({
        page: 1,
        per_page: 28
    })
    useEffect(() => {
        product()
    }, [])

    async function product() {
        try {
            let url = `http://localhost:8000/api/products/?page=${meta_data.page}`;
            await axios.get(url)
                .then(res => {
                    setProducts(res.data.data);
                    console.log("Data", res.data.data);
                })
                .catch(err => {
                });
        }
        catch (err) {
            console.log("Error", err);
        }
    }
    console.log("Front ", products);
    // const result = products.filter((curpro) => {
    //     // console.log(curpro.categories);
    //     return curpro.categories === catItem
    // });
    // setProducts(result);
    // console.log("Result", result);
    // console.log("re-render");
    return (
        <>
            <div className="products row" id="featured">
                <h3>Featured Products</h3>
                {products?.map((product) => {
                    // product.categories == "men's clothing" ?
                    return <>
                        <div className='col-sm-6  col-md-2 p-1'>
                            <Link to={`/products/${product._id}`}>
                                <div class="card product " >


                                    <img src={product.images || ImgnotFound} class="card-img-top" alt="..." />
                                    <div class="card-body">
                                        <h6 class="card-title fw-bold ">{product.name}</h6>
                                        <p class="card-text" style={{ display: 'grid' }}>Rs. {product.price}
                                            <span><img src={star_rating} className='star_5' /></span></p>
                                        <div className='awb'>
                                            <Link to="/login"><button class="btn btn-primary add atb" type='button'  >Add to Cart</button></Link>
                                            <Link to="/login"><button className='btn btn-primary add atw' ><img src={favourites_sm} />        Wishlist</button></Link>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </>

                })}



            </div>
        </>
    );


}