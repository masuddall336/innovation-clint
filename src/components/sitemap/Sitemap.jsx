import React from 'react'
import ScrollTop from '../ScrollTop'
import './sitemap.css'
import { Link } from 'react-router-dom'

const Sitemap = () => {
    return (
        <div className='pb-5 pt-36 flex gap-36 justify-center'>
            <ScrollTop></ScrollTop>
            <ul className='home'>
                <li><span className=" text-3xl font-extrabold pb-5">Home</span>
                    <ul className='inside_home'>
                        <Link to='/sustainability'><li className='pt-2 cursor-pointer'>Sustainability</li></Link>
                        <Link to='/products'><li className=' cursor-pointer'>Product</li></Link>
                        <Link to='/gallery'><li className=' cursor-pointer'>Gallery</li></Link>
                        <Link to='/'><li className=' cursor-pointer'>About</li></Link>
                    </ul>
                </li>
            </ul>
            <ul className='home'>
                <li><span className=" text-3xl font-extrabold pb-5">About</span>
                    <ul className='inside_home'>
                        <Link to='/contact_us'><li className=' cursor-pointer'>Contact us</li></Link>
                        <Link to='/qc_qa'><li className=' cursor-pointer'>QC & QA</li></Link>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default Sitemap
