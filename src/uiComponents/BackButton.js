import React from 'react'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'

const StyledButton = styled.button`
    font-size: 1.5rem;
    margin-bottom: 1rem;
`

/**
 * BackButton component to navigate to the previous page.
 *
 * This component renders a button that, when clicked, calls the provided onClickFn
 * with the prevPage argument and navigates the user back to the previous page using
 * Next.js's router.
 *
 * @param {Function} onClickFn - The function to call when the button is clicked.
 * @param {object} prevPage - The argument to pass to the onClickFn function - should be an object representing page data.
 * @returns {JSX.Element} - The rendered back button component.
 */
const BackButton = ({ onClickFn, prevPage }) => {

    const router = useRouter()
    
    const goBack = () => {
        onClickFn(prevPage)
        router.back()
    }

  return (
        <StyledButton onClick={() => goBack()}>
            ⬅️
        </StyledButton>
  )
}

export default BackButton