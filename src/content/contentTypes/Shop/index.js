import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import SingleProduct from './single'
import Cart from './cart'
import { getImageUrl } from '../../../utils/helpers'

const StyledProductList = styled.ul`
    display: flex;
    flex-wrap: wrap;

    li {
        width: 30%;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: 1px solid #222;
        border-radius: 10px;
        margin: 0 1.5%;
        box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);
        cursor: pointer;

        .img-container {
            min-height: 200px;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            &:hover {
                background: rgba(0, 0, 0, 0.1)
            }
        }

        .text-container {
            border-top: 1px solid #222;
            width: 100%;
            text-align: center;

            p {
                margin: 5px 0;
            }

            p.title {
                font-size: 18px;
            }
        }

    }
`

const Shop = ({ data }) => {

    const [ products, setProducts ] = useState([])
    const [ currentProduct, setCurrentProduct ] = useState(null)
    const [ showCart, setShowCart ] = useState(false)

    const defaultCurrency = 'NGN' //TODO: Add currency field to space settings
    const currency = defaultCurrency

    useEffect(() => {
      setProducts(data)
    
      return () => {}
    }, [])

    return (
        <StyledProductList>
            {
                products.map((product) => {
                    const { id, name, price, images } = product
                    
                    // Get the main product image
                    const { filename, width, height, alt, url } = images[0];
                    
                    return (
                        <li key={id} onClick={() => setCurrentProduct(product)}>
                            <div className='img-container'>
                                <Image 
                                  src={getImageUrl(url, filename, 'product-images')} 
                                  width={width} 
                                  height={height} 
                                  alt={alt} 
                                />
                            </div>
                            <div className='text-container'>
                                <p className='title'>{name}</p>
                                <p>{`${currency} ${price}`}</p>
                            </div>
                        </li>
                    )
                })
            }
            { 
                currentProduct && <SingleProduct 
                                    product={currentProduct} 
                                    currency={currency} 
                                    setShowCart={setShowCart} 
                                    setCurrentProduct={setCurrentProduct} 
                                /> 
            }
            { showCart && <Cart setShowCart={setShowCart} /> }
        </StyledProductList>
    )
}

export default Shop