'use client'
import React, { useEffect, useState } from 'react'
import Navigbar from '../Components/Navbar'
import NavbarSlider from '../Components/NavbarSlider'
import './../Css/Collections.css'
import Footer from '../Components/Footer'
import QuickAdd_Cards from '../Components/QuickAdd_Cards'
import { QA_bgout1, QA_bgout2, QA_bgout3, QA_bgout4, QA_bgout5, QA_bgout6, QA_bgout7, QA_bgout8, QA_bgout9, QA_bgout10 } from './../../Public/images.jsx'
import { QA_bgin1, QA_bgin2, QA_bgin3, QA_bgin4, QA_bgin5, QA_bgin6, QA_bgin7, QA_bgin8, QA_bgin9, QA_bgin10 } from './../../Public/images.jsx'
import { Noto_Sans } from 'next/font/google'
import { useDispatch, useSelector } from 'react-redux'

const notoSans = Noto_Sans({ subsets: ['latin-ext'], weight: ['400'] });

function page() {

    const [products, setProducts] = useState([]);
    const [filepath, setFilepath] = useState('');

    const fetchedProducts = useSelector((state) => state.products.value);
    const dispatch = useDispatch();


    useEffect(() => {
        setProducts(fetchedProducts.data);
        console.log(fetchedProducts);
        setFilepath(fetchedProducts.filepath);
    }, [fetchedProducts])


    return (
        <>
            <div className='collections'>
                <NavbarSlider />
                <Navigbar />
                <div className='d-flex'>
                    <div className='w-25 ps-3'>
                        <div className={`${notoSans.className} fs-5 py-3 border-bottom mx-3`}>
                            Shop All
                        </div>
                        <div className='p-2'><strong>Sub Categories</strong></div>
                        <div className='Sub-Categories overflow-y-scroll border-bottom'>
                            <ul className='ms-2 list-unstyled'>
                                {
                                    <li><input type="checkbox" className='mx-2' />T-Shirts</li>

                                }
                            </ul>
                        </div>
                    </div>
                    <div className='w-75'>
                        <div className={`${notoSans.className} fs-5 py-3 border-top mx-3`}>
                            Shop All
                        </div>
                        <div className='products d-flex flex-wrap gap-4 overflow-y-scroll p-3'>

                            {products && products.map((product) => (
                                <div key={product._id}>
                                    <QuickAdd_Cards 
                                    title={product.name} 
                                    price={`$${product.price}.00`} 
                                    mrp={`$${product.mrp}.00`} 
                                    bg_out={filepath + product.thumbnail} 
                                    bg_in={filepath + product.image_on_hover} 
                                    colors={product.color}/>

                                </div>
                            ))
                            }



                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default page