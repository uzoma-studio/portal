import React, { useState } from 'react'
import styled from 'styled-components'
import { StyledToolbarButton } from '../styles'
import MenuButtonContainer from './components/MenuButtonContainer'
import PagesSidebar from './components/PagesSidebar'

import { MdEdit, MdMenu } from "react-icons/md";
import { FaGear, FaEye } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";

const ActionControls = ({ isBuildMode, setIsBuildMode, setShowEditSpaceModal, saveSpaceEdits, isSaving, setCurrentPageId }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
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

  &:hover {
    color: var(--body-text-color);
  }

  &:active {
    color: #666;
  }
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