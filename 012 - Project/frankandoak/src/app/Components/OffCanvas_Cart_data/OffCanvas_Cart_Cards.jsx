import Image from 'next/image'
import React from 'react'
import { cart_img } from '../../../Public/images.jsx'
import { FaRegHeart } from "react-icons/fa"
import Link from 'next/link.js'
import { Signika_Negative } from '@next/font/google'

const Signika = Signika_Negative({ subsets: ['latin-ext'] })

function OffiCanvas_Cart_Cards() {
    return (
        <div className={`Cart-item d-flex py-3 border-bottom`}>
            <div className='w-25 mx-2 bg-black'>
                <Image src={cart_img} height={180}></Image>
            </div>
            <div className='w-75 px-2 d-flex flex-column justify-content-between'>
                <div className='w-100'>
                    <div className='d-flex justify-content-between '>
                        <div>Product 1</div>
                        <div role='button'>X</div>
                    </div>
                    <div className='text-black-50'>
                        Size : XXL
                    </div>
                    <div className='mt-2'>
                        <Link href=""><span className={`${Signika.className} text-decoration-underline`}>Move to Wishlist</span></Link>
                        <span className='px-2'><FaRegHeart color='black' /></span>
                    </div>
                </div>
                <div className='w-100 d-flex justify-content-between'>
                    <div className='d-flex fs-5'>
                        <div className='px-3 py-2 border' role='button'>–</div>
                        <div className='px-3 py-2 border' role='button'>4</div>
                        <div className='px-3 py-2 border' role='button'>+</div>
                    </div>
                    <div className='fs-6 align-content-end' >
                        <strong>$4999</strong>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OffiCanvas_Cart_Cards