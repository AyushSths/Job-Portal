import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Navigate, useParams } from "react-router-dom"
import { useNavigate } from 'react-router-dom';


export default function Create() {
    let navigate = useNavigate()
    const [product, setproduct] = useState({
        name: "",
        price: "",
        description: "",
        images: [],
        categories: [""],
        brand: [""]
    });

    const { id } = useParams()
    /* check if it is edit page */

    useEffect(() => {
        if (id) {
            let url = `http://localhost:8000/api/products/${id}`
            axios.get(url)
                .then(res => {
                    setproduct(res.data.data)
                })
        }
    }, []);

    function handleChange(e) {
        if (e.target.name == "images") {
            setproduct({
                ...product, images: [...product.images, ...e.target.files]
            })
        } else {
            setproduct({
                ...product, [e.target.name]: e.target.value
            })
        }

    }

    async function handleSubmit(e) {
        e.preventDefault();
        let temp = [...product.images]

        const productItemData = {
            name: product.name,
            price: product.price,
            description: product.description,
            categories: product.categories.map(category => category),
            brand: product.brand.map(brand => brand),
            images: product.images.map(img => {
                // Check if it's already a string (URL)
                return typeof img === "string" ? img : URL.createObjectURL(img);
            })

        };
        if (id) {
            // Update existing product
            await axios.put(`http://localhost:8000/api/products/${id}`, productItemData)
                .then(res => {
                    console.log('Product updated successfully', res);
                    alert("Product updated!")
                    navigate("/Home")
                })
                .catch(error => {
                    console.error('Error updating product:', error);
                    alert("Error updating product!")
                });
        } else {

            await axios.post('http://localhost:8000/api/products', productItemData)
                .then((res) => {
                    // Handle success, e.g., show a success message
                    console.log('Item added to products successfully', res);
                    console.log("product", productItemData)
                    alert("Product created!")
                    navigate("/Home")
                })
                .catch((error) => {
                    // Handle error, e.g., show an error message
                    console.error('Error adding item to products:', error);
                    alert("Error creating product!")
                });
        }
    }

    function addCategory() {
        let temp = product.categories // []
        temp.push("")

        setproduct({
            ...product, categories: temp
        })
    }
    function addBrand() {
        let temp = product.brand // []
        temp.push("")

        setproduct({
            ...product, brand: temp
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div class="mb-3">
                    <label class="form-label required-field">Name</label>
                    <input type="text" class="form-control" name="name" value={product?.name} onChange={handleChange} required />
                </div>
                <div class="mb-3">
                    <label class="form-label required-field">Price</label>
                    <input type="number" class="form-control" name="price" value={product?.price} onChange={handleChange} required />
                </div>
                <div class="mb-3">
                    <label class="form-label">Categories <button class="btn btn-sm btn-secondary" onClick={addCategory} >add new </button></label>
                    {
                        product?.categories.map((category, index) => {
                            return <div className='d-flex align-items-center mb-2'>
                                <input type="" class="form-control  " name="" value={category} onChange={(e) => {
                                    let temp = product.categories
                                    temp = temp.map((el, idx) => {
                                        if (index == idx) {
                                            return e.target.value
                                        }
                                        return el
                                    })

                                    setproduct({ ...product, categories: temp })
                                }} required />
                                <button className='mx-2  btn btn-danger btn-sm' onClick={() => {
                                    let temp = product.categories
                                    temp = temp.filter((el, idx) => {
                                        if (index != idx) {
                                            return true
                                        }
                                        return false
                                    })

                                    setproduct({ ...product, categories: temp })

                                }} > - </button>
                            </div>
                        })
                    }
                </div>
                <div class="mb-3">
                    <label class="form-label">Brand <button class="btn btn-sm btn-secondary" onClick={addBrand} >add new </button></label>
                    {
                        product?.brand.map((brand, index) => {
                            return <div className='d-flex align-items-center mb-2'>
                                <input type="" class="form-control  " name="" value={brand} onChange={(e) => {
                                    let temp = product.brand
                                    temp = temp.map((el, idx) => {
                                        if (index == idx) {
                                            return e.target.value
                                        }
                                        return el
                                    })

                                    setproduct({ ...product, brand: temp })
                                }} required />
                                <button className='mx-2  btn btn-danger btn-sm' onClick={() => {
                                    let temp = product.brand
                                    temp = temp.filter((el, idx) => {
                                        if (index != idx) {
                                            return true
                                        }
                                        return false
                                    })

                                    setproduct({ ...product, brand: temp })

                                }} > - </button>
                            </div>
                        })
                    }
                </div>
                <div class="mb-3">
                    <label class="form-label ">Description</label>
                    <textarea class="form-control" name="description" value={product?.description} onChange={handleChange} required />
                </div>
                <div class="mb-3">
                    <label class="form-label required-field">Images</label>
                    <input type="file" multiple class="form-control" name="images" onChange={handleChange} required />
                    <hr />
                    {
                        product?.images.map(img => {

                            let img_src = "";

                            if (typeof (img) == "string") {
                                img_src = img;
                            } else {
                                img_src = URL.createObjectURL(img)
                            }

                            return <img height={100} width={100} src={img_src} />
                        })
                    }
                </div>

                <button type="submit" class="btn btn-primary">{id ? "Update" : "Create"} Product</button>

            </form>
        </div>
    )
}