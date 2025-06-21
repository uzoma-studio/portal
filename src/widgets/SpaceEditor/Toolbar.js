import React, { useState } from 'react'
import styled from 'styled-components'
import AddPageModal from './AddPageModal'
import ModalWrapper from './ModalWrapper'

const Toolbar = ({ pageData }) => {
    const [ isAddPageModalOpen, setIsAddPageModalOpen ] = useState(false)

    return (
        <>
            <StyledToolbarContainer>
                <StyledToolbarButton onClick={() => setIsAddPageModalOpen(true)}>
                    +
                </StyledToolbarButton>
            </StyledToolbarContainer>

            <>
                { 
                    isAddPageModalOpen && 
                        <ModalWrapper tabName='Add Page' modalCloseFn={() => setIsAddPageModalOpen(false)}>
                            <AddPageModal
                                isCreatePageMode={true}
                                setIsModalOpen={setIsAddPageModalOpen}
                                pageData={pageData}
                            />
                        </ModalWrapper>
                }
            </>
        </>
    )
}

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

export const StyledToolbarButton = styled.button`
  background: var(--primary-color);
  color: var(--accent-color);
  border: none;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  padding: 0;
  margin: 0;
  font-size: 1.5rem;
  font-family: inherit;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 4px 0px rgba(0,0,0,1);
  transition: all 0.2s ease-in-out;
  transform: translateY(0);

  &:hover, &:focus {
    background: var(--accent-color);
    color: var(--primary-color);
    box-shadow: 0 6px 12px rgba(0,0,0,0.2), 0 3px 6px rgba(0,0,0,0.15);
    transform: translateY(-2px);
    outline: none;
  }

  &:active {
    background: var(--accent-color);
    color: var(--primary-color);
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    transform: translateY(1px);
  }
`;