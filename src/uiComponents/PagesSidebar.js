import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const StyledSidebar = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 300px;
    height: 100vh;
    background: ${props => props.$theme?.style?.menu?.backgroundColor || '#fff'};
    transform: translateX(${props => props.$isOpen ? '0' : '-100%'});
    transition: transform 0.3s ease-in-out;
    z-index: 1000;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    padding: 2rem;
`

const StyledSidebarHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
`

const StyledCloseButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    color: ${props => props.$theme?.style?.bodyTextColor || '#222'};
    padding: 0.5rem;
`

const StyledPageList = styled.ul`
    list-style: none;
    padding: 0;
    margin: 0;
`

const StyledPageItem = styled.li`
    margin-bottom: 1rem;
`

const StyledPageLink = styled(Link)`
    color: ${props => props.$theme?.style?.bodyTextColor || '#222'};
    text-decoration: none;
    font-size: 1.1rem;
    display: block;
    padding: 0.5rem 0;
    transition: color 0.2s ease-in-out;

    &:hover {
        color: ${props => props.$theme?.style?.menu?.hoverColor || '#666'};
    }
`

const StyledOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    opacity: ${props => props.$isOpen ? '1' : '0'};
    visibility: ${props => props.$isOpen ? 'visible' : 'hidden'};
    transition: all 0.3s ease-in-out;
    z-index: 999;
`

const PagesSidebar = ({ isOpen, onClose, pages, theme }) => {
    return (
        <>
            <StyledOverlay $isOpen={isOpen} onClick={onClose} />
            <StyledSidebar $isOpen={isOpen} $theme={theme}>
                <StyledSidebarHeader>
                    <h2 style={{ margin: 0 }}>Pages</h2>
                    <StyledCloseButton onClick={onClose} $theme={theme}>
                        ×
                    </StyledCloseButton>
                </StyledSidebarHeader>
                <StyledPageList>
                    {pages?.map((page) => (
                        <StyledPageItem key={page.id}>
                            <StyledPageLink 
                                href={`/${page.slug}`} 
                                onClick={onClose}
                                $theme={theme}
                            >
                                {page.title}
                            </StyledPageLink>
                        </StyledPageItem>
                    ))}
                </StyledPageList>
            </StyledSidebar>
        </>
    )
}

export default PagesSidebar 