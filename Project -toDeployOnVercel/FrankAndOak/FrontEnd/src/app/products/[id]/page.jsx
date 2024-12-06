'use client'
import Navigbar from '@/app/Components/Navigbar';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import './../../Css/singleProduct.css'
import Image from 'next/image';
import { CiHeart } from "react-icons/ci";
import Footer_About from '@/app/Components/Footer/Footer_About';
import Footer from '@/app/Components/Footer';
import { useSelector } from 'react-redux';

function Product() {

    const [selectedSize, setselectedSize] = useState('');
    const [product, setProduct] = useState(null);
    const [filepath, setfilepath] = useState('');
    const [addToCartText, setaddToCartText] = useState('Add to Cart')
    const products = useSelector((state) => state.products.value);
    const idFromParams = useParams();

    useEffect(() => {
        if (!(JSON.stringify(products) === '{}')) {
            const productOfParams = products.data.filter((product) => product._id === idFromParams.id);
            setProduct(productOfParams[0]);
            setfilepath(products.filepath);
        }
    }, [products])

    const addToCart = () => {
        if (selectedSize == '') {
            return;
        }

    }
    return (
        <>
            <Navigbar />
            {product &&
                <div className='singleProduct'>
                    <div className='productImages'>
                        <div className='d-flex flex-wrap'>
                            {
                                product.gallery && product.gallery.map((image) => (
                                    <img className='p-2' width={450} src={filepath + image} />
                                ))
                            }
                            {
                                (!(product.gallery) || product.gallery && product.gallery.length == 0) ?
                                    <div className='text-danger text-center w-100 fs-3 fw-bold'>
                                        Gallery Images Not Available
                                    </div>
                                    : ''
                            }
                        </div>
                    </div>
                    <div className='productDetails p-5'>
                        <div role='button' className='goToHomePage text-decoration-underline'>
                            Home
                        </div>
                        <div className='my-3 new'>
                            NEW
                        </div>
                        <div className='title'>
                            {product.name}
                        </div>
                        <div className='mt-2 d-flex align-items-center'>
                            <div className='price'>
                                ₹{product.price}
                            </div>
                            <div className='discount text-danger ms-2'>
                                -{(((product.mrp - product.price) / product.mrp) * 100).toFixed(2)}%
                            </div>
                        </div>
                        <div className='mrp text-danger fw-bold'>
                            ₹{product.mrp}
                        </div>
                        <div className='interest-free my-2'>
                            4 interest-free payments of $19.24 with Klarna.
                        </div>
                        <div>
                            {
                                (Array.from({ length: 5 })).map((_, index) => (
                                    <svg role='button' key={index} className='me-1' xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="transparent" stroke="black" stroke-width="1"><polygon points="12,2 15,9 22,9 17,14 18.5,21 12,17 5.5,21 7,14 2,9 9,9" stroke-linejoin="round" /></svg>
                                ))
                            }
                        </div>
                        <hr className='my-4' />
                        <div className='select-size d-flex justify-content-between'>
                            <div>Select a size</div>
                            <div className='text-decoration-underline'>Sizing Guide</div>
                        </div>
                        <div className='sizes my-4'>

                            {
                                product.size.map((size, index) => (
                                    <div role='button' data-value={size._id} onClick={(e) => setselectedSize(e.target.dataset.value)} className={`${selectedSize == size._id ? 'bg-black text-white' : ''} px-2 me-3 py-1 productSize d-inline-block`}>
                                        {size.name}
                                    </div>
                                ))
                            }

                        </div>
                        <hr className='my-3' />
                        <div className='d-flex'>
                            <div role={`${selectedSize == '' ? '' : 'button'}`} className='addToCart w-75 position-relative me-2' onClick={addToCart} onMouseEnter={() => selectedSize == '' ? setaddToCartText('Select a Size') : ''} onMouseLeave={() => setaddToCartText('Add to Cart')} >
                                {addToCartText}
                            </div>
                            <div className='addToWishlist align-content-center bg-transparent'>
                                <CiHeart size={30} />
                            </div>
                        </div>
                        <hr className='my-4' />
                        <div className='offers d-flex'>
                            <div className='d-flex align-content-center align-items-center'>
                                <img width={30} src="https://cdn.shopify.com/s/files/1/0553/7100/6130/files/shipping-holiday-PDP-v1.svg?v=1732296041" />
                                <span className='ms-2'>Free Shipping over $99</span>
                            </div>
                            <div className='ms-5'>
                                <img width={25} src="https://cdn.shopify.com/s/files/1/0553/7100/6130/files/returns-holiday-PDP-v1.svg?v=1732296041" />
                                <span className='ms-2'>Free Extended Returns</span>
                            </div>
                        </div>
                        <hr className='my-4' />
                        <div className='overview fw-medium'>
                            <div className='fs-6'>Overview</div>
                            <div className='my-4'>
                                {product.description}
                            </div>
                        </div>
                    </div>
                </div >
            }
            {
                !(product) &&
                <div className='text-center'>
                    <h1>No product found</h1>
                </div>
            }
            <Footer />
        </>
    )
}

export default Product