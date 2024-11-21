import React from 'react'
import Image from 'next/image'
import './../Css/FeaturedCategories.css'
import {FC_img1,FC_img2,FC_img3,FC_img4} from './../../Public/images.jsx'

function FeaturedCategories() {
    return (
        <div className='FeaturedCategories m-5'>
            <h2 className='my-5'>Featured Categories</h2>
            <div className="images d-flex justify-content-between flex-wrap">
                <div className="img d-block mb-5">
                    <img className='d-block' src={FC_img1.src}></img>
                    <span className='d-block py-2 fw-bold'>Womens Sweaters</span>
                </div>
                <div className="img">
                    <img className='d-block' src={FC_img2.src}></img>
                    <span className='d-block py-2 fw-bold'>Womens Jackets</span>
                </div>
                <div className="img">
                    <img className='d-block' src={FC_img3.src}></img>
                    <span className='d-block py-2 fw-bold'>Mens Sweaters</span>
                </div>
                <div className="img">
                    <img className='d-block' src={FC_img4.src}></img>
                    <span className='d-block py-2 fw-bold'>Mens Jackets</span>
                </div>
            </div>
        </div>
    )
}

export default FeaturedCategories