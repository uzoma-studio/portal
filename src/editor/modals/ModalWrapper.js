import React from 'react'
import { StyledModalOverlay, StyledModalContent, StyledTabButton } from '../styles'
import CloseButton from '@/uiComponents/closeButton'

const ModalWrapper = ({ children, tabName, modalCloseFn, isCreatePageMode=true, isFullHeight=false }) => {
  return (
    <StyledModalOverlay onClick={modalCloseFn}>
        <StyledModalContent
            $isCreatePageMode={isCreatePageMode}
            $isFullHeight={isFullHeight}
            onClick={e => e.stopPropagation()}
        >
            <CloseButton closeFn={modalCloseFn} position={{ x: '95', y: '0' }} />
            <div className="flex justify-start mb-4 border-b border-gray-200">
                <StyledTabButton
                    onClick={() => setActiveTab('addPage')}
                    className={`relative mr-4 py-2 px-4 bg-transparent border-none cursor-pointer active`}
                >
                    { tabName }
                </StyledTabButton>
            </div>
            { children }
        </StyledModalContent>
    </StyledModalOverlay>
  )
}

export default ModalWrapper