import axios from 'axios'
import { useState, useEffect } from 'react'
import ImgnotFound from "../assets/images/ImgnotFound.jpg"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Star from "../assets/images/Star.png"
import EmptyStar from "../assets/images/star-empty.png"
import star_rating from "../assets/images/5-star-rating.png"

// import Rating from '../pages/product/Star';

export default function Home(props) {

    const dispatch = useDispatch();
    const user = useSelector((redux_store) => {
        console.log("redux store", redux_store)
        return redux_store.user.value
    })
    const [products, setProducts] = useState(null);
    const [originalProducts, setOriginalProducts] = useState(null);
    const [meta_data, setMetadata] = useState({})
    const [isLoadingProduct, setisLoadingProduct] = useState(true);
    const [rating_value, setRatingValue] = useState(0);

    // useEffect(() => {
    //     let url = `http://localhost:8000/Home`
    //     axios.get(url)
    //         .then(res => {
    //             let fetch_data = res.data
    //             console.log("user", fetch_data);
    //             setuserDetails(fetch_data)
    //             console.log("user details", userDetails)
    //         })
    //         .catch(err => {
    //             console.log("error user", err);
    //         })

    // }, []);

    function fetchData() {
        let url = `http://localhost:8000/api/products?search_term=${props.search_term}&page=${meta_data.page}`
        axios.get(url)
            .then(res => {
                let fetch_data = res.data.data
                setProducts(fetch_data)
                setOriginalProducts(fetch_data)
                console.log(fetch_data)
                console.log(fetch_data[0].rating.count)
                setisLoadingProduct(false)
                setMetadata({ ...meta_data, total: res.data.data[0]?.metadata[0].total })
            })
            .catch(err => {
                console.log("error", err);
            })
    }
    useEffect(() => {
        fetchData()
    }, [props.search_term, meta_data]);

    // const [products, setProducts] = useState(todos)

    async function handleAddToCart(e, product, index) {
        e.preventDefault();
        console.log("buttn");
        // dispatch(addToCart(product))
        alert("Added to cart")

        const updatedProducts = [...products];
        if (updatedProducts[index].rating.count > 1) {
            updatedProducts[index].rating.count -= 1;
            setProducts(updatedProducts);
            console.log("updated", updatedProducts);
            updateCountInDatabase(updatedProducts[index]._id, updatedProducts[index].rating.count);
        }
        const cartItemData = {
            name: product.name,
            price: product.price,
            categories: product.categories[0],
            brand: product.brand[0],
            images: product.images[0],
            productId: product._id, // Assuming this is the product ID
            userId: user._id,
            username: user.name,
            quantity: 1,          // You can adjust the quantity as needed
        };

        await axios.post('http://localhost:8000/api/cart', cartItemData)
            .then((res) => {
                // Handle success, e.g., show a success message
                console.log('Item added to cart successfully', res);
                console.log("Orders", cartItemData)
            })
            .catch((error) => {
                // Handle error, e.g., show an error message
                console.error('Error adding item to cart:', error);
            });
    }

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

    const filteredCat = (catItem) => {
        console.log('cat');
        const result = originalProducts.filter((curpro) => {
            return curpro.categories[0] === catItem
        });
        setProducts(result)
        console.log(result);
    }
    const filteredBran = ((catItem) => {
        console.log('cat');
        const result = originalProducts.filter((curpro) => {
            return curpro.brand[0] === catItem
        })
        setProducts(result)
        console.log(result);
    })
    const filteredPriceFirst = () => {
        console.log('cat');
        const result = originalProducts.filter((curpro) => {
            return curpro.price < 1000
        })
        setProducts(result)
        console.log(result);
    }
    const filteredPriceSecond = () => {
        console.log('cat');
        const result = originalProducts.filter((curpro) => {
            return curpro.price > 1000 && curpro.price < 1500
        })
        setProducts(result)
        console.log(result);
    }
    const filteredPriceThird = () => {
        console.log('cat');
        const result = originalProducts.filter((curpro) => {
            return curpro.price > 1500 && curpro.price < 2500
        })
        setProducts(result)
        console.log(result);
    }
    const filteredPriceFourth = () => {
        console.log('cat');
        const result = originalProducts.filter((curpro) => {
            return curpro.price > 2500 && curpro.price < 4000
        })
        setProducts(result)
        console.log(result);
    }
    const filteredPriceFifth = () => {
        console.log('cat');
        const result = originalProducts.filter((curpro) => {
            return curpro.price > 4000
        })
        setProducts(result)
        console.log(result);
    }
    const sortPriceHTL = () => {
        const result = originalProducts
            .sort((a, b) => a.price < b.price ? 1 : -1)
            .map((curpro) => {
                return (
                    curpro
                )
            })
        setProducts(result)
    }
    const sortAlphabetHTL = () => {
        const result = originalProducts
            .sort((a, b) => a.name < b.name ? 1 : -1)
            .map((curpro) => {
                return (
                    curpro
                )
            })
        setProducts(result)
    }
    const sortPriceLTH = () => {
        const result = originalProducts
            .sort((a, b) => a.price > b.price ? 1 : -1)
            .map((curpro) => {
                return (
                    curpro
                )
            })
        setProducts(result)
    }
    const sortAlphabetLTH = () => {
        const result = originalProducts
            .sort((a, b) => a.name > b.name ? 1 : -1)
            .map((curpro) => {
                return (
                    curpro
                )
            })
        setProducts(result)
    }

    function handleSortOptionChange(e) {
        const selectedValue = e.target.value;

        switch (selectedValue) {
            case "priceHTL":
                sortPriceHTL();
                break;
            case "priceLTH":
                sortPriceLTH();
                break;
            case "nameLTH":
                sortAlphabetLTH();
                break;
            case "nameHTL":
                sortAlphabetHTL();
                break;
            default:
                // Do nothing or handle any default behavior
                break;
        }
    }

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

    let rate = products?.rating?.rate
    console.log("rate", rate);
    return (
        <>
            {/* <Mainslide /> */}
            <div className=''><h2 class="categorey">All Products</h2>
                <div className="title-line products-line"></div>
                <p className='small'><b>Aaach Fashion Wear</b> - {products?.length} items</p>
                <div className='sort-filter'>
                    <div className="sort-by">
                        <span>Sort by :</span>
                        <select className="form-select sort-dropdown" onChange={(e) => handleSortOptionChange(e)}>
                            <option class="sort-list" value="priceHTL">Price: High to Low</option>
                            <option value="priceLTH">Price: Low to High</option>
                            <option value="nameLTH">A-Z</option>
                            <option value="nameHTL">Z-A</option>
                        </select>
                    </div>
                </div>
                <hr style={{ opacity: "0.2" }} />
            </div>

            <div className="row">
                <div className="col-sm-2 filter">
                    <span className='fil' ><b  >Filters</b></span>
                    <div className='side-form'>
                        <div class="form-check">
                            <span className='title'><b>CATEGORIES</b></span>
                            <div className="list">
                                {/* {
                                    products?.map((product, id) => {
                                        const cat = product.categories
                                        return <>    
                                            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                            <button for="flexCheckDefault" onClick={() => filteredCat(cat)} >{product.categories == '' ? 'Unavailable' : product.categories}</button>
                                            <br />
                                        </>
                                    })
                                } */}
                                <button onClick={() => setProducts(originalProducts)} >All</button>
                                <button onClick={() => filteredCat("men's clothing")} id="men">Men's clothing</button>
                                <button onClick={() => filteredCat("women's clothing")} >Women's clothing</button>
                                <button onClick={() => filteredCat("jewelery")} >Jewelery</button>
                                <button onClick={() => filteredCat("electronics")} >Electronics</button>
                            </div>
                        </div>
                        <div class="form-check">
                            <span className='title'><b>BRANDS</b></span>
                            <div className="list">
                                <button onClick={() => setProducts(originalProducts)} >All</button>
                                <button onClick={() => filteredBran("Acer")} >Acer</button>
                                <button onClick={() => filteredBran("Erke")} >Erke</button>
                                <button onClick={() => filteredBran("Levis")} >Levis</button>
                                <button onClick={() => filteredBran("Sportswear")} >Sportswear</button>
                                <button onClick={() => filteredBran("John Hardy ")} >John Hardy Station</button>
                                <button onClick={() => filteredBran("Princess")} >Princess</button>
                                <button onClick={() => filteredBran(" Owl Rose Gold")} >Owl Rose Gold</button>
                                <button onClick={() => filteredBran("WD")} >WD</button>
                                <button onClick={() => filteredBran("SanDisk")} >SanDisk</button>
                                <button onClick={() => filteredBran("Silicon Power")} >Silicon Power</button>
                                <button onClick={() => filteredBran("Samsung")} >Samsung</button>
                                <button onClick={() => filteredBran("BIYLACLESEN")} >BIYLACLESEN</button>
                                <button onClick={() => filteredBran("Lock and Love")} >Lock and Love</button>
                                <button onClick={() => filteredBran("MBJ")} >MBJ</button>
                                <button onClick={() => filteredBran("Opna")} >Opna</button>
                                <button onClick={() => filteredBran("DANVOUY")} >DANVOUY</button>
                            </div>
                        </div>
                        <div class="form-check">
                            <span className='title'><b>PRICE</b></span>
                            <div className="list">
                                <button onClick={() => setProducts(originalProducts)} >All</button>
                                <button onClick={() => filteredPriceFirst()} >Rs.0 to Rs.1000</button>
                                <button onClick={() => filteredPriceSecond()} >Rs.1000 to Rs.1500</button>
                                <button onClick={() => filteredPriceThird()} >Rs.1500 to Rs.2500</button>
                                <button onClick={() => filteredPriceFourth()} >Rs.2500 to Rs.4000</button>
                                <button onClick={() => filteredPriceFifth()} >Over Rs.4000</button>

                            </div>
                        </div>


                    </div>
                </div>
                <div className="col-sm-10">
                    <div className="products row">
                        {
                            products?.map((product, index) => {
                                return <>

                                    <div className='col-sm-6  col-md-2 p-1'>
                                        <Link to={`/products/${product._id}`}>
                                            <div class="card product " >

                                                {/* <img src={"https://res.cloudinary.com/dtv8dtpkm/image/upload/v1679221462/cnlv5glezaixgasigxvk.webp"} class="card-img-top" alt="..." /> */}
                                                <img src={product.images[0] || ImgnotFound} class="card-img-top" alt="..." />
                                                <div class="card-body">
                                                    <h8 class="card-title fw-bold ">{product.name}</h8>
                                                    <p class="card-text" style={{ display: 'grid' }}>Rs. {product.price}
                                                        {/* <span><img src={star_rating} className='star_5' />
                                                            {
                                                            product.rating?.rate.map(rate => {
                                                                // if (rate===1){return <img src={one_stars}/> }
                                                                // else if (rate===2){return <img src={two_stars}/> }
                                                                // else if (rate === 3){return <img src={two_stars}/> }
                                                                // else if (rate === 4){return <img src={two_stars}/> }    
                                                                // else if (rate === 5){return <img src={two_stars}/> }
                                                                
                                                            })
                                                        }
                                                            <span>{product.rating?.rate}</span></span> */}
                                                    </p>
                                                </div>
                                            </div>
                                            {
                                                user?.role == "buyer" ?
                                                    <div >
                                                        <button class="btn btn-primary add atb" type='button' onClick={(e) => handleAddToCart(e, product, index)} >Add to Cart</button>
                                                    </div>
                                                    : <></>
                                            }
                                            {
                                                user?.role == "seller" ?
                                                    <>
                                                        <Link to={`/products/edit/${product._id}`}><button class="btn btn-primary add edit" type='button' >Edit</button></Link>
                                                    </> : <></>
                                            }
                                        </Link>
                                    </div>
                                </>
                            })
                        }
                    </div>
                </div>
            </div>
            <div>
                <ReactPaginate className="react_paginate"
                    breakLabel="..."
                    nextLabel=">>"
                    onPageChange={(e) => { setMetadata({ ...meta_data, page: e.selected + 1 }) }}
                    pageRangeDisplayed={5}
                    // pageCount={Math.ceil(meta_data.total / meta_data.per_page)}
                    pageCount={2}
                    previousLabel="<<"
                    renderOnZeroPageCount={null}
                />
            </div>
        </>
    )
}
