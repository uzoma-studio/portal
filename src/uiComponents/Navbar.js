import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const StyledNavabr = styled.ul`
    display: flex;
    flex-direction: ${props => props.$direction && props.$direction === 'column' ? props.$direction : 'row'};
    justify-content: center;
    text-align: center;

    li {
        margin: 0 0.25rem;
    }
`
/**
 * Navbar component
 * 
 * @param {object} [pages=false] - Pages to be shown in the navigation
 * @param {string} direction - flexDirection property for Navbar (valid options: 'horizontal' or 'vertical')
 * @returns {JSX.Element} Header component
 */
const Navbar = ({ pages, direction }) => {
  return (
    <StyledNavabr
        $direction={direction}
    >
        {
            pages.map(({ id, title, slug }) => 
                <li key={id}>
                    <Link href={`/#${slug}`}>
                        {title}
                    </Link>
                </li>
            )
        }
    </StyledNavabr>
  )
}

export default Navbar