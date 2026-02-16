import React, { useContext } from 'react'
import styled from 'styled-components'
import { useSpace } from '@/context/SpaceProvider'
import Navbar from './Navbar'
import NewsTicker from './NewsTicker'

const StyledFooter = styled.footer`
    background: var(--menu-background);
    color: var(--body-text-color);
    font-family: var(--body-font);
`;

/**
 * Footer component (very similar to Header, can they be squashed into one?)
 * 
 * @param {string} background - Background color or image
 * @param {string} height - Height of the header
 * @param {boolean} [showPagesNav=false] - Flag to show/hide pages navigation
 * @param {object} [pages=false] - Pages to be passed to the Navbar component
 * @returns {JSX.Element} Footer component
 */

// TODO: change folder structure of the project: folders = root-components (Footer, Header, Navbar, etc), site-widgets (NewsTicker, AuthButton), page-content-types (Blog, Shop)
// TODO: make the site softcodeable, meaning all content, styles and settings for root components like Footer, Header, Navbar, etc should be set on the CMS
const Footer = ({ background, height, pages, showPagesNav, children }) => {
    const { settings } = useSpace()
    const { theme } = settings
    
    return (
        <StyledFooter 
            className="fixed bottom-0 w-full overflow-hidden py-4 px-10 text-center"
            style={{ height: theme?.style?.menuHeight || '3.5rem' }}
        >
            { theme?.style?.menu?.showNewsTicker && <NewsTicker /> }
        </StyledFooter>
    );
};

export default Footer;