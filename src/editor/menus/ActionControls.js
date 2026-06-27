import React from 'react'
import styled, { keyframes } from 'styled-components'
import { StyledToolbarButton } from '../styles'
import MenuButtonContainer from './components/MenuButtonContainer'

import { MdEdit } from "react-icons/md";
import { FaGear, FaEye } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";
import { ImSpinner8 } from "react-icons/im";

const ActionControls = ({ isBuildMode, setIsBuildMode, setShowEditSpaceModal, saveSpaceEdits, isSaving, setCurrentPageId }) => {

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
        </StyledContainer>
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