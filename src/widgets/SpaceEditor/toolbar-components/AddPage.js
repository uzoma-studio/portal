import React, { useState } from 'react'
import { StyledToolbarButton } from '../Toolbar'
import AddPageModal from '../AddPageModal'
import { StyledModalOverlay, StyledModalContent } from './styles'
import CloseButton from '@/components/closeButton'

const ToolbarAddPage = () => {

  const [ isModalOpen, setIsModalOpen ] = useState(false)

  const handleClose = () => setIsModalOpen(false)

  return (
    <>
      {isModalOpen ? (
        <StyledModalOverlay onClick={handleClose}>
          <StyledModalContent
            $isCreatePageMode={true}
            onClick={e => e.stopPropagation()}
          >
            <CloseButton closeFn={handleClose} position={{ x: '95', y: '0' }} />
            <AddPageModal />
          </StyledModalContent>
        </StyledModalOverlay>
      ) : (
        <StyledToolbarButton onClick={() => setIsModalOpen(true)}>
          +
        </StyledToolbarButton>
      )}
    </>
  )
}

export default ToolbarAddPage