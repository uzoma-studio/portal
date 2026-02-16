import React, { useState, useRef } from 'react'
import styled from 'styled-components'

import ModalWrapper from '../modals/ModalWrapper'
import AddPageModal from '../modals/AddPageModal'
import UploadImageModal from '../modals/UploadImageModal'
import AddTextModal from '../modals/AddTextModal'

import { StyledToolbarButton } from '../styles'
import MenuButtonContainer from './components/MenuButtonContainer'

import { FaFileMedical } from "react-icons/fa6";
import { FaImage } from "react-icons/fa";
import { RxText } from "react-icons/rx";

const Toolbar = ({ pageData, backgroundDimensions }) => {
    const [ currentOpenModal, setCurrentOpenModal ] = useState('')

    const modals = {
        page: <AddPageModal
                    isCreatePageMode={true}
                    setIsModalOpen={setCurrentOpenModal}
                    pageData={pageData}
                />,
        image: <UploadImageModal
                    setIsModalOpen={setCurrentOpenModal}
                    backgroundDimensions={backgroundDimensions}
                />,
        text: <AddTextModal 
                    setIsModalOpen={setCurrentOpenModal} 
                    backgroundDimensions={backgroundDimensions}
                />
    }

    return (
        <>
            <StyledToolbarContainer>
                <MenuButtonContainer tooltipText="Add text" tooltipPosition="left">
                    <StyledToolbarButton onClick={() => setCurrentOpenModal('text')}>
                        <RxText />
                    </StyledToolbarButton>
                </MenuButtonContainer>
                <MenuButtonContainer tooltipText="Upload image" tooltipPosition="left">
                    <StyledToolbarButton onClick={() => setCurrentOpenModal('image')}>
                        <FaImage />
                    </StyledToolbarButton>
                </MenuButtonContainer>
                <MenuButtonContainer tooltipText="Add new page" tooltipPosition="left">
                    <StyledToolbarButton onClick={() => setCurrentOpenModal('page')}>
                        <FaFileMedical />
                    </StyledToolbarButton>
                </MenuButtonContainer>
            </StyledToolbarContainer>

           { 
                currentOpenModal && 
                    currentOpenModal !== 'text' ?
                        <ModalWrapper tabName={`Add ${currentOpenModal}`} modalCloseFn={() => setCurrentOpenModal(null)} isFullHeight={currentOpenModal === 'page'}>
                            { modals[currentOpenModal] }
                        </ModalWrapper>
                        :
                        modals[currentOpenModal]
            }
        </>
    )
}

// TODO: Modals should actually be able to stand alone and not need <ModalWrapper />
export default Toolbar

export const StyledToolbarContainer = styled.div`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 1000;
`;