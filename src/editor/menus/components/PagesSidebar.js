import React, { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
import { MdMenu } from 'react-icons/md'
import { useSpace } from '@/context/SpaceProvider'
import CloseButton from '@/uiComponents/closeButton'

const PagesSidebar = ({ setCurrentPageId }) => {

    const { pages, lastCreatedPage } = useSpace()
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isHamburgerAnimating, setIsHamburgerAnimating] = useState(false)

    useEffect(() => {
      if (!lastCreatedPage) return;

      setIsHamburgerAnimating(true);
      const timer = setTimeout(() => {
        setIsHamburgerAnimating(false);
      }, 5000);

      return () => clearTimeout(timer);
    }, [lastCreatedPage?.ts]);

  return (
    isSidebarOpen ?
      <>
        <Overlay onClick={() => setIsSidebarOpen(false)} />
        <StyledSidebar>
          <SidebarHeader>
            <h3>Pages</h3>
            <CloseButton closeFn={() => setIsSidebarOpen(false)} position={{x: '90', y: '0.5'}} />
          </SidebarHeader>
          <PagesList>
            {pages && pages.length > 0 ? (
              pages.map((page) => (
                <PageItem
                  key={page.id}
                  onClick={() => {
                    setCurrentPageId(page.id);
                    setIsSidebarOpen(false);
                  }}
                >
                  {page.title || 'Untitled Page'}
                </PageItem>
              ))
            ) : (
              <NoPages>No pages in this space</NoPages>
            )}
          </PagesList>
        </StyledSidebar>
      </>
      :
      <HamburgerButton
          $isAnimating={isHamburgerAnimating}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          title="Open pages"
          aria-label="Open pages sidebar"
          >
          <MdMenu />
      </HamburgerButton>
  )
}

export default PagesSidebar

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`

const StyledSidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 300px;
  background: white;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  z-index: 1000;
  display: flex;
  flex-direction: column;
`

const SidebarHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;

  h3 {
    margin: 0;
    font-size: 1.25rem;
    font-weight: 600;
  }
`

const PagesList = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 0;
`

const PageItem = styled.button`
  width: 100%;
  padding: 1rem;
  text-align: left;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 0.95rem;
  color: #333;
  border-left: 4px solid transparent;
  transition: all 0.2s ease;

  &:hover {
    background: #f5f5f5;
    border-left-color: var(--primary-color);
    padding-left: calc(1rem + 4px);
  }

  &:active {
    background: #eee;
  }
`

const NoPages = styled.div`
  padding: 2rem 1rem;
  text-align: center;
  color: #999;
  font-size: 0.9rem;
`

const HamburgerButton = styled.button`
  background: none;
  border: none;
  font-size: 2.5rem;
  cursor: pointer;
  padding: 0.5rem;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s ease;
  position: relative;
  overflow: visible;

  &::after {
    content: '';
    position: absolute;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: #ef4444;
    opacity: 0;
    right: 3px;
    bottom: 6px;
    transform: scale(0.6);
    pointer-events: none;
  }

  &:hover {
    color: var(--body-text-color);
  }

  &:active {
    color: #666;
  }

  ${props => props.$isAnimating && css`
    animation: ${pulse} 0.7s ease-out;

    &::after {
      opacity: 1;
      animation: ${pulseCircle} 2s ease-in-out infinite;
    }
  `}
`;