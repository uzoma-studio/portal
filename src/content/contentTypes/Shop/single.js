import React, { useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import Cart, { addToCart } from './cart'
import { getImageUrl } from '../../../utils/helpers'

const StyledProductModal = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.25);
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;

    .modal {
        background: white;
        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        padding: 20px;
        min-width: 300px;
        max-height: 100%;
        overflow: scroll;
        z-index: 1000;

        .text-container {
            .section {
                margin: 1rem 0;

                label { font-size: 14px; color: #333}
            }
        }
    }
`

const SingleProduct = ({ product, currency, setShowCart, setCurrentProduct }) => {
    const { name, price, productImage, description, images } = product;
    const { url, width, height, alt, filename } = images[0];

    const handleButtonClick = () => {
        addToCart({name, price, image: {url, alt}})
        setShowCart(true)
        setCurrentProduct(null)
    }

    return (
        <StyledProductModal onClick={() => setCurrentProduct(null)}>
            <div className='modal' onClick={e => e.stopPropagation()}>
                <div className='img-container'>
                    <Image 
                        src={getImageUrl(url, filename, 'product-images')}
                        width={width} 
                        height={height} 
                        alt={alt} 
                    />
                </div>
                <div className='text-container'>
                    <div className='section'>
                        <button className='default-button' onClick={() => handleButtonClick()}>Add to cart</button>
                    </div>
                    <h2>{name}</h2>
                    <div className='section'>
                        <label>Description</label>
                        <p>{description}</p>
                    </div>
                    <div className='section'>
                        <label>Price</label>
                        <p>{`${currency} ${price}`}</p>
                    </div>
                </div>
                <div className='section'>
                    <button className='default-button' onClick={() => handleButtonClick()}>Add to cart</button>
                </div>
            </div>
        </StyledProductModal>
    )
}

export default SingleProduct