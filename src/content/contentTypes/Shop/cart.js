import React, { useState, useEffect } from 'react'
import CloseButton from '@/uiComponents/closeButton'
import Image from 'next/image'
import styled from 'styled-components'

export const addToCart = (selectedProduct) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const updatedCart = [...cart, selectedProduct]
    localStorage.setItem('cart', JSON.stringify(updatedCart))
}

const StyledCart = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    width: 40%;
    background: #fff;
    padding: 1rem;
    overflow-y: scroll;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .cart-list {

        margin-top: 2rem;

        .cart-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem 0;
            border-top: 1px solid #ccc;
            border-bottom: 1px solid #ccc;

            .remove-button {
                color: red;
                cursor: pointer;

                &:hover {
                    background: #ccc;
                }
            }
        }
    }
`

const Cart = ({ setShowCart }) => {

    const [cart, setCart] = useState([])

    useEffect(() => {
        // Check if 'localStorage' is available
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    const removeItemFromCart = (index) => {
        const updatedCart = [...cart]; // Create a shallow copy of the cart
        updatedCart.splice(index, 1); // Remove the item
        setCart(updatedCart); // Update the state with the new array
        localStorage.setItem('cart', JSON.stringify(updatedCart))
    }

    const cartQuantity = cart.length
    const cartTotal = cart.reduce((accumulator, currentValue) => accumulator + Number(currentValue.price), 0)

    return (
        <StyledCart>
            <div className='header'>
                <h5>Your Cart</h5>
                <CloseButton closeFn={() => setShowCart(false)} position={{x: 85, y: 1.5}} />
            </div>
            <div className='cart-list'>
                {
                    cartQuantity > 0 && cart.map((item, index) => (
                        <div key={index} className='cart-item'>
                            <Image
                                src={item.image.url}
                                alt={item.image.alt}
                                width={100}
                                height={100}
                            />
                            <div>
                                <p>{item.title}</p>
                                <p>${item.price}</p>
                            </div>
                            <button className='remove-button' onClick={() => removeItemFromCart(index)} >x</button>
                        </div>
                    ))
                }
            </div>
            {
                cartQuantity > 0 &&
                    <div className='checkout'>
                        <div>
                            <h5>Total:</h5>
                            <h5>${cartTotal}</h5>
                        </div>
                        <button
                            onClick={() => setShowCheckoutForm(true)}
                            className='default-button'
                        >
                            Checkout
                        </button>
                    </div>
            }
        </StyledCart>

    )
}

export default Cart