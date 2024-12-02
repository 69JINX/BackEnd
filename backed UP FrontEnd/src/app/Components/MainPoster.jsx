import React from 'react'
import './../Css/MainPoster.css'
import Button from 'react-bootstrap/Button';
import {MainPosterbg} from './../../Public/images.jsx'

function MainPoster() {
    return (
        <div className="Main" style={{backgroundImage:`url(${MainPosterbg.src})`}} >
            <div className="Heading text-center">
                <h1>Fall 2024</h1>
                <span className='fs-5 fw-medium'>The new classic</span>
                <div className="Buttons bg">
                    <Button variant="dark" className='rounded-0 px-5 fs-5 m-3'>Women</Button>
                    <Button variant="dark" className='rounded-0 px-5 fs-5 m-3'>Men</Button>
                </div>
            </div>
        </div>
    )
}

export default MainPoster