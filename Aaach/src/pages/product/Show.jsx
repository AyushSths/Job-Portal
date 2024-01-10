

import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Rating from "react-rating-stars-component"
import Star from "../../assets/images/Star.png"
import EmptyStar from "../../assets/images/star-empty.png"
import favourites from "../../assets/images/heart.png"
import cart from "../../assets/images/shopping-cart.png"
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../redux/slice/cartSlice';

export default function Show() {

    const dispatch = useDispatch();
    const [product, setproduct] = useState({});
    const { id } = useParams();
    const [rating_value, setRatingValue] = useState(0);
    const user = useSelector((redux_store) => { return redux_store.user.value })
    let path = `Home / products `
    // console.log("id", id);
    async function fetchProductDetail() {
        let url = `http://localhost:8000/api/products/${id}`
        await axios.get(url)
            .then(res => {
                setproduct(res.data.data)
                console.log(res.data.name);
            })
            .catch(err => {
                console.log("error", err);
            })
    }

    useEffect(() => {
        fetchProductDetail()
    }, []);

    async function handleCart(e, product) {
        e.preventDefault();
        console.log("buttn");
        // dispatch(addToCart(product))

        const cartItemData = {
            name: product.name,
            price: product.price,
            categories: product.categories[0],
            brand: product.brand[0],
            images: product.images[0],
            productId: product._id, // Assuming this is the product ID
            userId: user._id,
            username: user.name,
            // email: user_email,     // Assuming this is the user ID
            quantity: 1,          // You can adjust the quantity as needed
        };

        await axios.post('http://localhost:8000/api/cart', cartItemData)
            .then((res) => {
                // Handle success, e.g., show a success message
                console.log('Item added to cart successfully', res);
                console.log("Show Orders", cartItemData)
            })
            .catch((error) => {
                // Handle error, e.g., show an error message
                console.error('Error adding item to cart:', error);
            });
    }

    function updateReview(e) {
        e.preventDefault()
        axios.put(`http://localhost:8000/api/products/review/${id}`, {
            rating: rating_value,
            comment: e.target.comment.value
        }, {
            headers: {
                Authorization: "Bear " + localStorage.getItem("access_token")
            }
        }).then(res => {
            fetchProductDetail()
        })
    }

    function handleAddToCart(e, product) {
        e.preventDefault();
        console.log("buttn");
        dispatch(addToCart(product))
    }

    return (
        <div class="product-container">
            <span className='path'><Link to="/home">Home</Link> / products / {product.categories} / <b>{product.brand}  &gt; {product.name}</b></span>
            <hr />
            <div className='row show-row'>
                <div className='col-md-6  '>
                    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            {
                                product.images?.map((image, index) => {
                                    console.log("data", product.name);
                                    return <div class={`carousel-item ${index == 0 ? "active" : ""} `}>
                                        <img src={image} class="d-block h-8" alt="..." />
                                    </div>
                                })
                            }
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className='col-md-6 detail'>
                    <div>

                        <h5 className='pro_brand'>{product?.brand != null ? product?.brand[0] : "Brand Unavailable"}</h5>
                        <h4 className='pro_name'>{product?.name}</h4>
                        <div class="first-section">
                            {/* <label for="" class="form-label">Rating</label> */}
                            {/* {
                                product?.reviews?.map((review) => {
                                    let temp = [];
                                    let avg = review.rating / review;
                                    console.log({ avg })
                                    for (let i = 0; i < (review.rating); i++) {
                                        temp.push("")
                                    }
                                    console.log({ temp });
                                    return <div>
                                        <p>
                                            {temp.map(el => (
                                                el != null ? <img src={Star} width={18} /> : <img src={EmptyStar} width={18} />
                                            ))}
                                        </p>
                                    </div>
                                })
                            } */}
                            <div className='rate'>
                                Rating  <span>{product.rating?.rate} <span className='star_5'></span></span>
                                {/* <img src={Star} alt="" className='star_5' /> */}


                            </div>

                        </div>
                        <hr />
                        <div className="second-section">
                            <h4 style={{ color: "red" }}>Rs. {product.price}</h4>
                            <p style={{ fontSize: "17px", letterSpacing: "0.3px" }}>{product?.description ? product?.description : "Description Unavailable"}</p>
                        </div>
                    </div>

                    <button className='btn btn-primary add as' onClick={(e) => handleCart(e, product)}>ADD TO CART</button>
                </div>

            </div>
            <hr />
            <h4 style={{ opacity: "0.8" }}>Ratings and Reviews</h4>
            {
                product?.reviews?.map((review) => {
                    let temp = []
                    for (let i = 0; i < (review.rating); i++) {
                        temp.push("")
                    }
                    console.log({ temp });
                    return <div className='p-2 m-2' style={{
                        boxShadow: "1px 1px 10px 0px grey"
                    }}>
                        <p>{review.created_by.name} {
                            temp.map(el => {
                                return <img src={Star} alt="" width={18} />
                            })
                        }</p>
                        <p>{review.comment}</p>
                    </div>
                })
            }
            {
                user?.role == "buyer"
                &&
                <>
                    <form className='mt-5' onSubmit={updateReview}>
                        <div class="mb-3">
                            <label for="" class="form-label">Rating</label>
                            <Rating
                                initialRating={rating_value}
                                onChange={(e) => { setRatingValue(e) }}
                                emptySymbol={<img width={22} src={EmptyStar} className="icon" />}
                                fullSymbol={<img width={22} src={Star} className="icon" />}
                            />
                            {/* <input type="number" name='rating' class="form-control" id="" aria-describedby="" /> */}
                        </div>
                        <div class="mb-3">
                            <label for="" class="form-label">Comment</label>
                            <textarea name="comment" className='form-control'>
                            </textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </>
            }

        </div>
    )
}