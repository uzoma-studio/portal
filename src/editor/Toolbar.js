import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import ModalWrapper from './modals/ModalWrapper'
import AddPageModal from './modals/AddPageModal'
import UploadImageModal from './modals/UploadImageModal'
import { StyledToolbarButton } from './styles'

import { BsFillFileEarmarkPlusFill } from "react-icons/bs";
import { FaImage } from "react-icons/fa";

const Toolbar = ({ pageData }) => {
    const [ currentOpenModal, setCurrentOpenModal ] = useState(null)

    const modals = {
        page: <AddPageModal
                    isCreatePageMode={true}
                    setIsModalOpen={setCurrentOpenModal}
                    pageData={pageData}
                />,
        image: <UploadImageModal
                    setIsModalOpen={setCurrentOpenModal}
                />
    }

    return (
        <>
            <StyledToolbarContainer>
                {/* Button for image uploads */}
                <StyledToolbarButton onClick={() => setCurrentOpenModal('image')}>
                    <FaImage />
                </StyledToolbarButton>
                <StyledToolbarButton onClick={() => setCurrentOpenModal('page')}>
                    <BsFillFileEarmarkPlusFill />
                </StyledToolbarButton>
            </StyledToolbarContainer>

           { 
                currentOpenModal && 
                    <ModalWrapper tabName={`Add ${currentOpenModal}`} modalCloseFn={() => setCurrentOpenModal(null)}>
                        { modals[currentOpenModal] }
                    </ModalWrapper>
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