import React from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
    font-size: 1.5rem;
    margin-bottom: 1rem;
    position: absolute;
    top: ${props => `${props.$position.y}%`};
    left: ${props => `${props.$position.x}%`};
    color: red;
    font-weight: bold;
    font-size: 28px;
`

/**
 * CloseButton component
 * 
 * This component renders a styled close button that calls a provided function when clicked.
 * 
 * @param {Object} props - The props object
 * @param {Function} props.closeFn - The function to call when the button is clicked
 * @param {Object} props.position - The position object containing x and y values to position the button
 * @param {number} props.position.x - The x-coordinate percentage to position the button
 * @param {number} props.position.y - The y-coordinate percentage to position the button
 * 
 * @returns {JSX.Element} The rendered close button
 */

const CloseButton = ({ closeFn, position }) => {
  return (
    <StyledButton onClick={closeFn} $position={position}>
        x
    </StyledButton>
  )
}

export default CloseButton