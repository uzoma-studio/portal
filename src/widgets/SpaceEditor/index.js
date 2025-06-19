import React, { useState } from 'react';
import styled from 'styled-components';
import AddPageModal from './AddPageModal';
import EditSpaceModal from './EditSpaceModal'
import CloseButton from '../../components/closeButton';

const StyledModalOverlay = styled.div`
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 50;
    background-color: rgba(0, 0, 0, 0.5);
}
`

const StyledModalContent = styled.div`
    background: white;
    position: absolute;
    ${props => props.$isCreatePageMode && `
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    `}; //In create page mode the modal should be centred on the screen
    border-radius: 0.5rem;
    padding: 1.25rem;
    min-width: 300px;
    width: ${props => !props.$isCreatePageMode ? '100%' : '60%'};
    height: ${props => !props.$isCreatePageMode ? 'unset' : '80vh'};
    max-width: 800px;
    z-index: 51;
    overflow-y: ${props => props.$isCreatePageMode && 'auto'};
    background-color: white;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                0 4px 6px -4px rgba(0, 0, 0, 0.1);
`

const StyledAddButton = styled.button`
    background: #222;
    color: #fff;
    transition: transform 0.2s ease;
    z-index: 50;
    width: 50px;
    height: 50px;

    &:hover {
        transform: scale(1.1);
    }

    position: fixed;
    bottom: 2rem;
    right: 2rem;
    border-radius: 9999px;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.875rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledTabButton = styled.button`
    color: var(--body-text-color);
    
    &.active {
        color: var(--primary-color);
        
        &:after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 2px;
            background: var(--primary-color);
        }
    }
`;

const BuildMode = ({ theme, isModalOpen, setIsModalOpen, isCreatePageMode, pageData, pageCoords }) => {

    const [activeTab, setActiveTab] = useState('addPage');

    const handleClose = () => {
        setIsModalOpen(false)
    }

    return (
        <StyledModalOverlay onClick={handleClose}>
            <StyledModalContent 
                $isCreatePageMode={isCreatePageMode}
                onClick={e => e.stopPropagation()}
            >
                <CloseButton closeFn={handleClose} position={{x: '95', y: '0'}} />

                <div className="flex justify-start mb-4 border-b border-gray-200">
                    <StyledTabButton
                        onClick={() => setActiveTab('addPage')}
                        className={`relative mr-4 py-2 px-4 bg-transparent border-none cursor-pointer ${activeTab === 'addPage' ? 'active' : ''}`}
                        $theme={theme}
                    >
                        { isCreatePageMode ? 'Add Page' : 'Edit Page' }
                    </StyledTabButton>
                    {
                        isCreatePageMode &&
                            <StyledTabButton
                                onClick={() => setActiveTab('editSpace')}
                                className={`relative mr-4 py-2 px-4 bg-transparent border-none cursor-pointer ${activeTab === 'editSpace' ? 'active' : ''}`}
                                $theme={theme}
                            >
                                Edit Space
                            </StyledTabButton>
                    }
                </div>

            { activeTab === 'addPage' &&
                <AddPageModal 
                    setIsModalOpen={setIsModalOpen} 
                    isCreatePageMode={isCreatePageMode} 
                    pageData={pageData} 
                    pageCoords={pageCoords}
                />
            }
            {
                activeTab === 'editSpace' &&
                    <EditSpaceModal setIsModalOpen={setIsModalOpen} />
            }
            </StyledModalContent>
        </StyledModalOverlay>
    );
};

export default BuildMode; 