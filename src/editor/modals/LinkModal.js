import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSpace } from '@/context/SpaceProvider'
import { MdClose } from 'react-icons/md'

const LinkModal = ({ 
    elementPosition, 
    selectedImageId,
    selectedTextId,
    onClose,
    onLinkChange,
    linkedPageId
}) => {
    const { pages, images: spaceImages, texts: spaceTexts } = useSpace()
    const [selectedPageId, setSelectedPageId] = useState(linkedPageId || null)

    const handlePageSelect = (pageId) => {
        const newPageId = selectedPageId === pageId ? null : pageId
        setSelectedPageId(newPageId)
        onLinkChange(newPageId)
    }

    if (!elementPosition || !pages?.length) return null

    return (
        <StyledModalOverlay onClick={onClose}>
            <StyledLinkModal 
                $top={elementPosition.top}
                $left={elementPosition.left + elementPosition.width + 10}
                onClick={(e) => e.stopPropagation()}
            >
                <StyledHeader>
                    <h3>Link to Page</h3>
                    <StyledCloseButton onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}>
                        <MdClose />
                    </StyledCloseButton>
                </StyledHeader>

                <StyledPagesList>
                    {pages.map(page => (
                        <StyledPageItem
                            key={page.id}
                            onClick={(e) => {
                                e.stopPropagation();
                                handlePageSelect(page.id);
                            }}
                            $selected={selectedPageId === page.id}
                        >
                            <StyledCheckbox $selected={selectedPageId === page.id}>
                                {selectedPageId === page.id && '✓'}
                            </StyledCheckbox>
                            <span>{page.title}</span>
                        </StyledPageItem>
                    ))}
                </StyledPagesList>

                {selectedPageId && (
                    <StyledFooter>
                        <p>Linked to: <strong>{pages.find(p => p.id === selectedPageId)?.title}</strong></p>
                    </StyledFooter>
                )}
            </StyledLinkModal>
        </StyledModalOverlay>
    )
}

export default LinkModal

const StyledModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1600;
`

const StyledLinkModal = styled.div`
    position: fixed;
    top: ${props => `${props.$top}px`};
    left: ${props => `${props.$left}px`};
    width: 280px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    max-height: 400px;
    z-index: 1601;
    animation: slideIn 0.2s ease-out;

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-10px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid #eee;
    
    h3 {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
    }
`

const StyledCloseButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    transition: color 0.2s ease;

    &:hover {
        color: #333;
    }
`

const StyledPagesList = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 8px;
`

const StyledPageItem = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s ease;
    background-color: ${props => props.$selected ? '#e8f0fe' : 'transparent'};
    
    &:hover {
        background-color: ${props => props.$selected ? '#e8f0fe' : '#f5f5f5'};
    }

    span {
        font-size: 14px;
        color: #333;
    }
`

const StyledCheckbox = styled.div`
    width: 18px;
    height: 18px;
    border: 2px solid ${props => props.$selected ? '#4a90e2' : '#ddd'};
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    background-color: ${props => props.$selected ? '#4a90e2' : 'white'};
    color: white;
    font-size: 12px;
    font-weight: bold;
    transition: all 0.2s ease;
`

const StyledFooter = styled.div`
    padding: 12px;
    border-top: 1px solid #eee;
    background-color: #f9f9f9;
    border-radius: 0 0 8px 8px;
    
    p {
        margin: 0;
        font-size: 12px;
        color: #666;
    }

    strong {
        color: #333;
    }
`
