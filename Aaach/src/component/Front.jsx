import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import star_rating from "../assets/images/5-star-rating.png";
import favourites_sm from "../assets/images/heart_wh.png";
import Mainslide from "./Mainslide";
import { Link } from "react-router-dom"
import ImgnotFound from "../assets/images/ImgnotFound.jpg"
import mens_clothing from "../assets/images/mens_clothing.jpg"
import womens_clothing from "../assets/images/womens clothing.jpg"
import electronics from "../assets/images/electronics.jpg"
import jewellery from "../assets/images/jewellery-2.jpg"

export default function Front(props) {
    const user = useSelector((redux_store) => {
        return redux_store.user.value
    })
    const [products, setProducts] = useState([]);
    const [meta_data, setMetadata] = useState({
        page: 1,
        per_page: 28
    })
    useEffect(() => {
        product()
    }, [props.search_term])

    async function product() {
        try {

            // let url = `https://fakestoreapi.com/products`;
            let url = `http://localhost:8000/api/products/?page=${meta_data.page}`;
            await axios.get(url)
                .then(res => {
                    setProducts(res.data.data);
                    console.log("Data", res.data.data);
                })
                .catch(err => {
                    console.log("Error", err);
                });
        }
        catch (err) {
            console.log("Error", err);
        }
    }

    console.log("re-render");
    return (
        <>
            <Mainslide />
            <div className="products row" id="featured">
                <p className="feature">Explore Categories</p>
                <div className="title-line explore-line"></div>
                <div className='col-sm-6  col-md-3 p-3 '>
                    <Link to='men'>
                        <div class="card product explore_card" >
                            <div className="exp_more">Explore more </div>
                            <img src={mens_clothing} class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h6 class="card-title fw-bold ">Men's Fashion</h6>
                            </div>
                        </div>
                        {/* <div>
                            <Link to="/login"><button class="btn btn-primary add atb" type='button'  >Add to Cart</button></Link>
                        </div> */}
                    </Link>
                </div>
                <div className='col-sm-6  col-md-3 p-3 '>
                    <Link to='women'>
                        <div class="card product explore_card" >
                            <div className="exp_more">Explore more </div>
                            <img src={womens_clothing} class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h6 class="card-title fw-bold ">Women's Fashion</h6>
                            </div>
                        </div>
                        {/* <div>
                            <Link to="/login"><button class="btn btn-primary add atb" type='button'  >Add to Cart</button></Link>
                        </div> */}
                    </Link>
                </div>
                <div className='col-sm-6  col-md-3 p-3 '>
                    <Link to='jewellery'>
                        <div class="card product explore_card" >
                            <div className="exp_more">Explore more</div>
                            <img src={jewellery || ImgnotFound} class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h6 class="card-title fw-bold ">Jewellery</h6>
                            </div>
                        </div>
                        {/* <div>
                            <Link to="/login"><button class="btn btn-primary add atb" type='button'  >Add to Cart</button></Link>
                        </div> */}
                    </Link>
                </div>
                <div className='col-sm-6  col-md-3 p-3 '>
                    <Link to='electronics'>
                        <div class="card product explore_card" >
                            <div className="exp_more">Explore more</div>
                            <img src={electronics || ImgnotFound} class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h6 class="card-title fw-bold ">Electronics</h6>
                            </div>
                        </div>
                        {/* <div>
                            <Link to="/login"><button class="btn btn-primary add atb" type='button'  >Add to Cart</button></Link>
                        </div> */}
                    </Link>
                </div>
                <p className="feature">Featured Products</p>
                <div className="title-line feature-line"></div>
                {products?.map((product) => {
                    return <>
                        <div className='col-sm-6  col-md-2 p-1'>
                            <Link to={`/products/${product._id}`}>
                                <div class="card product " >


                                    <img src={product.images[0] || ImgnotFound} class="card-img-top" alt="..." />
                                    <div class="card-body">
                                        <h6 class="card-title fw-bold ">{product.name}</h6>
                                        <p class="card-text" style={{ display: 'grid' }}>Rs. {product.price}
                                            {/* <span><img src={star_rating} className='star_5' /></span> */}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <Link to="/login"><button class="btn btn-primary add atb" type='button'  >Add to Cart</button></Link>
                                </div>
                            </Link>
                        </div>
                    </>

                })}
            </div>
        </>
    );
}