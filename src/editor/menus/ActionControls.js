import React, { useState } from 'react'
import styled from 'styled-components'
import { StyledToolbarButton } from '../styles'
import MenuButtonContainer from './components/MenuButtonContainer'

import { MdEdit } from "react-icons/md";
import { FaGear, FaEye } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";

const ActionControls = ({ isBuildMode, setIsBuildMode, setShowEditSpaceModal, saveSpaceEdits }) => {
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
                        <StyledToolbarButton onClick={() => saveSpaceEdits()}>
                            <FaSave />
                        </StyledToolbarButton>
                    </MenuButtonContainer>
                </>
                :
                <MenuButtonContainer tooltipText="Enter build mode" tooltipPosition="left">
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
  top: 2rem;
  right: 2rem;
  display: flex;
  gap: 1rem;
  z-index: 1000;
`;