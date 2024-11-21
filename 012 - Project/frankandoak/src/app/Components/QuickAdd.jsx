'use client'
import React from 'react'
import QuickAdd_Cards from './QuickAdd_Cards.jsx'
import './../Css/QuickAdd.css'
import Slider from "react-slick"; // npm i react-slick
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; //npm i slick-carousel
import {QA_bgout1,QA_bgout2,QA_bgout3,QA_bgout4,QA_bgout5,QA_bgout6,QA_bgout7,QA_bgout8,QA_bgout9,QA_bgout10} from './../../Public/images.jsx'
import {QA_bgin1,QA_bgin2,QA_bgin3,QA_bgin4,QA_bgin5,QA_bgin6,QA_bgin7,QA_bgin8,QA_bgin9,QA_bgin10} from './../../Public/images.jsx'



function QuickAdd() {

    var settings = {
        slidesToShow: 4.1,
        slidesToScroll: 4,
        infinite: false,
        speed:200,
        mobileFirst: true,//add this one
        responsive: [
            {
                breakpoint: 1420,
                settings: {
                    slidesToShow: 3.2,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 1130,
                settings: {
                    slidesToShow: 2.5,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 890,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 710,
                settings: {
                    slidesToShow: 1.6,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 570,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
            // You can unslick at a given breakpoint now by adding:
            // settings: "unslick"
            // instead of a settings object
        ]
    }


    return (
        <>
            <Slider {...settings} className='Quick-Add'>
                <div><QuickAdd_Cards title={'The SeaCell™ Crewneck Cardigan in Dark Chocolate'} price={'$149.00'} bg_out={QA_bgout1.src} bg_in={QA_bgin1.src} /></div>
                <div><QuickAdd_Cards title={'The Zip Up Bomber Jacket in Light Beige'} price={'$149.00'} bg_out={QA_bgout2.src} bg_in={QA_bgin2.src} /></div>
                <div><QuickAdd_Cards title={'The Button-up Sweater Vest in Space Blue'} price={'$89.50'} bg_out={QA_bgout3.src} bg_in={QA_bgin3.src} /></div>
                <div><QuickAdd_Cards title={'The Fluid Camp Collar Blouse in White'} price={'$79.50'} bg_out={QA_bgout4.src} bg_in={QA_bgin4.src} /></div>
                <div><QuickAdd_Cards title={'The Jane Straight Pant in Dark Chocolate'} price={'$119.00'} bg_out={QA_bgout5.src} bg_in={QA_bgin5.src} /></div>
                <div><QuickAdd_Cards title={'The Relaxed 2-Button Blazer in Light Grey'} price={'$199.00'} bg_out={QA_bgout6.src} bg_in={QA_bgin6.src} /></div>
                <div><QuickAdd_Cards title={'The Camp Collar Printed Dress in White'} price={'$149.00'} bg_out={QA_bgout7.src} bg_in={QA_bgin7.src} /></div>
                <div><QuickAdd_Cards title={'The Margaret Recycled Wool Topcoat in Dark Chocolate'} price={'$449.00'} bg_out={QA_bgout8.src} bg_in={QA_bgin8.src} /></div>
                <div><QuickAdd_Cards title={'The Amelia Balloon Pant in Green'} price={'$119.00'} bg_out={QA_bgout9.src} bg_in={QA_bgin9.src} /></div>
                <div><QuickAdd_Cards title={'The SeaCell™ Boxy Sweater in Bright Purple'} price={'$129.00'} bg_out={QA_bgout10.src} bg_in={QA_bgin10.src} /></div>
            </Slider>
        </>

    )
}

export default QuickAdd