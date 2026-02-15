import React, { useState } from 'react'
import styled from 'styled-components'
import { StyledToolbarButton } from '../styles'
import MenuButtonContainer from './components/MenuButtonContainer'

import { MdEdit } from "react-icons/md";
import { FaGear, FaEye } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";

const ActionControls = ({ isBuildMode, setIsBuildMode, setShowEditSpaceModal, saveSpaceEdits, isSaving }) => {
  return (
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
    </StyledContainer>
  )
}

export default ActionControls

export const StyledContainer = styled.div`
  position: fixed;
  top: 1rem;
  right: 2rem;
  display: flex;
  gap: 1rem;
  z-index: 1000;
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