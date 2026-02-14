import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { MdEdit, MdDelete, MdLink } from 'react-icons/md'
import { useSpace } from '@/context/SpaceProvider'

const ElementControl = ({ 
    selectedImageId, 
    selectedTextId,
    onEdit,
    onDelete,
    onLink,
    elementPosition,
    backgroundDimensions 
}) => {
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const hasSelection = selectedImageId || selectedTextId
    const isText = !!selectedTextId

    useEffect(() => {
        if (elementPosition && backgroundDimensions) {
            // Position above the element
            const top = elementPosition.top - 60
            const left = elementPosition.left + (elementPosition.width / 2) - 75 // Center the controls

            setPosition({
                top: Math.max(10, top), // Don't go above viewport
                left: Math.max(10, left)
            })
        }
    }, [elementPosition, backgroundDimensions])

    if (!hasSelection) return null

    return (
        <StyledElementControlContainer $top={position.top} $left={position.left}>
            <IconButton 
                onClick={onEdit}
                title="Edit"
                aria-label="Edit element"
            >
                <MdEdit />
            </IconButton>
            <IconButton 
                onClick={onDelete}
                title="Delete"
                aria-label="Delete element"
                $danger
            >
                <MdDelete />
            </IconButton>
            <IconButton 
                onClick={onLink}
                title={isText ? "Link text" : "Link image"}
                aria-label="Link element"
            >
                <MdLink />
            </IconButton>
        </StyledElementControlContainer>
    )
}

export default ElementControl

const StyledElementControlContainer = styled.div`
    position: fixed;
    top: ${props => `${props.$top}px`};
    left: ${props => `${props.$left}px`};
    display: flex;
    gap: 8px;
    z-index: 1500;
    animation: slideIn 0.2s ease-out;

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`

const IconButton = styled.button`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: ${props => props.$danger ? '#ef4444' : '#4a90e2'};
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

    &:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        background: ${props => props.$danger ? '#dc2626' : '#357abd'};
    }

    &:active {
        transform: scale(0.95);
    }
`
