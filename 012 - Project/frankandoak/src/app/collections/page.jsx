import React from 'react'
import Navigbar from '../Components/Navbar'
import NavbarSlider from '../Components/NavbarSlider'
import './../Css/Collections.css'
import Footer from '../Components/Footer'
import QuickAdd_Cards from '../Components/QuickAdd_Cards'
import { QA_bgout1, QA_bgout2, QA_bgout3, QA_bgout4, QA_bgout5, QA_bgout6, QA_bgout7, QA_bgout8, QA_bgout9, QA_bgout10 } from './../../Public/images.jsx'
import { QA_bgin1, QA_bgin2, QA_bgin3, QA_bgin4, QA_bgin5, QA_bgin6, QA_bgin7, QA_bgin8, QA_bgin9, QA_bgin10 } from './../../Public/images.jsx'
import { Noto_Sans } from '@next/font/google'

const notoSans = Noto_Sans({ subsets: ['latin-ext'], weight: ['400'] });

function page() {

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
                                    Array.from({ length: 50 }, (_, index) => index + 1).map(item =>
                                        <li><input type="checkbox" className='mx-2' />T-Shirts</li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>
                    <div className='w-75'>
                        <div className={`${notoSans.className} fs-5 py-3 border-top mx-3`}>
                            Shop All
                        </div>
                        <div className='products d-flex flex-wrap gap-4 overflow-y-scroll p-3'>
                            {
                                Array.from({ length: 10 }, (_, index) => index + 1).map(item =>
                                    <div>
                                        <QuickAdd_Cards title={'The SeaCell™ Crewneck Cardigan in Dark Chocolate'} price={'$149.00'} bg_out={QA_bgout1.src} bg_in={QA_bgin1.src} />
                                    </div>
                                )
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