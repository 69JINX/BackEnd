import React from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';
import '././../Css/OffCanvas_data.css'
import Link from 'next/link';
import OffCanvas_Cart_Cards from './OffCanvas_Cart_data/OffCanvas_Cart_Cards';
import { IoLockClosedOutline } from "react-icons/io5";
import { Poppins } from '@next/font/google'

const poppins = Poppins({ subsets: ['latin-ext'], weight: ['400'] })

function OffCanvas_Cart() {
    return (
        <>
                <Offcanvas.Header closeButton>
                    <Link href="#" className="logo fs-4 fw-bold">Frank And Oak</Link>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div className='w-100 text-white py-2 bg-black text-center'>
                        <strong>Free shipping on order $99+ and free returns</strong>
                    </div>
                    <div className='OffCanvas-Cart-Cards p-3 overflow-scroll' style={{ height: '84%' }}>
                        <OffCanvas_Cart_Cards />
                        <OffCanvas_Cart_Cards />
                        <OffCanvas_Cart_Cards />
                        <OffCanvas_Cart_Cards />
                    </div>
                    <div className='p-2 bg-light'>
                        <Link href="#" className="text-decoration-none">
                            <button className={`${poppins.className} w-100 p-2 fs-5 fw-bold text-white bg-black`}>Secure Checkout <IoLockClosedOutline size={17} /></button>
                        </Link>
                    </div>
                </Offcanvas.Body>
        </>
    )
}

export default OffCanvas_Cart