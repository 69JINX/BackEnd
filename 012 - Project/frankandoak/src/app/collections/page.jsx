'use client'
import React, { useEffect, useState } from 'react'
import Navigbar from '../Components/Navbar'
import NavbarSlider from '../Components/NavbarSlider'
import './../Css/Collections.css'
import Footer from '../Components/Footer'
import QuickAdd_Cards from '../Components/QuickAdd_Cards'
import { Noto_Sans } from 'next/font/google'
import { useSelector } from 'react-redux'

const notoSans = Noto_Sans({ subsets: ['latin-ext'], weight: ['400'] });

function page() {

    const [products, setProducts] = useState([]);
    const [filepath, setFilepath] = useState('');
    const [parentCategories, setparentCategories] = useState([]);
    const [productCategories, setproductCategories] = useState([]);
    const [loader, setLoader] = useState(true);

    const fetchedProducts = useSelector((state) => state.products.value);
    const fetchedProductCategories = useSelector((state) => state.productCategories.value);
    const fetchedParentCategories = useSelector((state) => state.parentCategories.value);


    useEffect(() => {
        setProducts(fetchedProducts.data);
        console.log('Products => ', fetchedProducts);
        setFilepath(fetchedProducts.filepath);
        setLoader(false);
    }, [fetchedProducts])

    useEffect(() => {
        setproductCategories(fetchedProductCategories.data);
        console.log('fetchedProductCategories => ', fetchedProductCategories);
    }, [fetchedProductCategories])

    useEffect(() => {
        setparentCategories(fetchedParentCategories.data);
        console.log('fetchedParentCategories => ', fetchedParentCategories);
    }, [fetchedParentCategories])


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
                        <div className={`loader text-center m-auto ${loader ? 'd-block' : 'd-none'}`}>
                            <div id="loader">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div className='Sub-Categories overflow-y-scroll border-bottom'>
                            {
                                parentCategories && parentCategories.map((parentCategory, index) => (
                                    <div key={index}>
                                        <div className='p-2'><strong>{parentCategory.name}</strong></div>
                                        <ul className='ms-2 list-unstyled'>
                                            {productCategories && productCategories.map((productCategory, index) => (
                                                productCategory.parent_category.name === parentCategory.name ?
                                                    <li key={index}><input role='button' type="checkbox" className='mx-2' />{productCategory.name}</li>
                                                    : ''
                                            ))
                                            }
                                        </ul>
                                    </div>

                                ))
                            }
                        </div>
                    </div>
                    <div className='w-75'>
                        <div className={`${notoSans.className} fs-5 py-3 border-top mx-3`}>
                            Shop All
                        </div>
                        <div className={`loader text-center m-auto ${loader ? 'd-block' : 'd-none'}`}>
                            <div id="loader">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div className='products d-flex flex-wrap gap-4 overflow-y-scroll p-3'>
                            {products && products.map((product) => (
                                <div key={product._id}>
                                    <QuickAdd_Cards product={product} filepath={filepath} />
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