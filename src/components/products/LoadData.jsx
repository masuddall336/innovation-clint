import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Details from './Details';
import banner from '/img/Product_Details_section_banner.png'

const LoadData = () => {
    const product = useLoaderData();
    return (
        <div className=''>
            <dvi>
                <img className='h-[20vh] md:h-full' src={banner} alt="" />
            </dvi>
            <Details product={product}></Details>
        </div>
    )
}

export default LoadData
