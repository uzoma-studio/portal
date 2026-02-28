import React, { useState, useEffect } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { StyledToolbarButton } from '../styles'
import MenuButtonContainer from './components/MenuButtonContainer'
import PagesSidebar from './components/PagesSidebar'
import { useSpace } from '@/context/SpaceProvider'

import { MdEdit, MdMenu } from "react-icons/md";
import { FaGear, FaEye } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";

const ActionControls = ({ isBuildMode, setIsBuildMode, setShowEditSpaceModal, saveSpaceEdits, isSaving, setCurrentPageId }) => {
  const { lastCreatedPage } = useSpace();
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
    <>
      <StyledContainer>
        {
            isBuildMode ? 
                <>
                    <MenuButtonContainer tooltipText="Preview" tooltipPosition="left">
                        <StyledToolbarButton onClick={() => setIsBuildMode(false)}>
                            <FaEye />
                        </StyledToolbarButton>
                    </MenuButtonContainer>
                    <MenuButtonContainer tooltipText="Space settings" tooltipPosition="left">
                        <StyledToolbarButton onClick={() => setShowEditSpaceModal(true)}>
                            <FaGear />
                        </StyledToolbarButton>
                    </MenuButtonContainer>
                    <MenuButtonContainer tooltipText="Save and Publish" tooltipPosition="left">
                        <StyledToolbarButton onClick={() => saveSpaceEdits()} disabled={isSaving}>
                            {isSaving ? <StyledSpinner /> : <FaSave />}
                        </StyledToolbarButton>
                    </MenuButtonContainer>

                </>
                :
                <MenuButtonContainer tooltipText="Edit" tooltipPosition="left">
                    <StyledToolbarButton onClick={() => setIsBuildMode(true)}>
                        <MdEdit />
                    </StyledToolbarButton>
                </MenuButtonContainer>
        }
        <HamburgerButton
          $isAnimating={isHamburgerAnimating}
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          title="Open pages"
          aria-label="Open pages sidebar"
        >
          <MdMenu />
        </HamburgerButton>
      </StyledContainer>
      {
        isSidebarOpen && 
            <PagesSidebar 
                onClose={() => setIsSidebarOpen(false)} 
                setCurrentPageId={setCurrentPageId}
            />
      }
    </>
  )
}

export default ActionControls

export const StyledContainer = styled.div`
  display: flex;
  gap: 1rem;
  z-index: 1000;
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.08);
  }
  100% {
    transform: scale(1);
  }
`;

const pulseCircle = keyframes`
  0% {
    transform: scale(0.6);
    opacity: 0.3;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(0.6);
    opacity: 0.3;
  }
`;

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
  margin-left: auto;
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

const StyledSpinner = styled(ImSpinner8)`
  animation: spin 2s linear infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;