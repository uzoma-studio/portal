import React from 'react'
import styled from 'styled-components'
import { MdClose } from 'react-icons/md'
import { useSpace } from '@/context/SpaceProvider'
import CloseButton from '@/uiComponents/closeButton'

const PagesSidebar = ({ onClose, setCurrentPageId }) => {

    const { pages } = useSpace()
  return (
    <>
      <Overlay onClick={onClose} />
      <StyledSidebar>
        <SidebarHeader>
          <h3>Pages</h3>
          <CloseButton closeFn={onClose} position={{x: '90', y: '0.5'}} />
        </SidebarHeader>
        <PagesList>
          {pages && pages.length > 0 ? (
            pages.map((page) => (
              <PageItem
                key={page.id}
                onClick={() => {
                  setCurrentPageId(page.id);
                  onClose()
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
