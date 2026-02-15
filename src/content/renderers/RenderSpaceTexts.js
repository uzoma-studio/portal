import React, { useEffect, useState } from 'react'
import { Rnd } from 'react-rnd';
import styled from 'styled-components';
import { useSpace } from '@/context/SpaceProvider';

// TODO: Explore combining RenderSpaceTexts and RenderSpaceImages into a single component that can render both types based on props
const RenderSpaceTexts = ({ isBuildMode, currentEditTextId, setCurrentEditTextId, backgroundDimensions, setSelectedElementPosition, setCurrentPageId }) => {
    
    const { texts: spaceTexts, setTexts } = useSpace()
    const [currentDimensions, setCurrentDimensions] = useState({ width: 0, height: 0 });

    // Update dimensions when backgroundDimensions change
    useEffect(() => {
        const dimensions = backgroundDimensions?.width > 0 && backgroundDimensions?.height > 0 
            ? backgroundDimensions 
            : { width: window.innerWidth || 1200, height: window.innerHeight || 800 };
        
        setCurrentDimensions(dimensions);
    }, [backgroundDimensions]);

    const handleTextClick = (id, event) => {
        if (isBuildMode) {
            setCurrentEditTextId(id);
            // Get the element's position for ElementControl
            const rect = event.currentTarget.getBoundingClientRect();
            setSelectedElementPosition({
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height
            });
        } else {
            // In preview mode, check if text is linked to a page
            const text = spaceTexts.find(t => t.id === id);
            if (text?.linkToPage) {
                setCurrentPageId(text.linkToPage.id);
            }
        }
    };
    
    return (
        <>
            { spaceTexts?.map(({ id, content, fontSize, fontColor, position, size, linkToPage }, index) => {
                // Calculate pixel positions from percentages
                const pixelX = (position.x / 100) * currentDimensions.width
                const pixelY = (position.y / 100) * currentDimensions.height

                // Calculate size from percentages
                const pixelWidth = (size.width / 100) * currentDimensions.width
                const pixelHeight = (size.height / 100) * currentDimensions.height

                return <Rnd
                        key={id}
                        position={{
                            x: pixelX,
                            y: pixelY
                        }}
                        size={{
                            width: pixelWidth,
                            height: pixelHeight
                        }}
                        onClick={(e) => handleTextClick(id, e)}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            const updatedTexts = [...spaceTexts];
                            const textIndex = updatedTexts.findIndex(t => t.id === id);
                            if (textIndex !== -1) {
                                const textWidthPx = Number(ref.style.width.split('px')[0])
                                const textHeightPx = Number(ref.style.height.split('px')[0])
                                updatedTexts[textIndex].size.width = (textWidthPx / currentDimensions.width) * 100
                                updatedTexts[textIndex].size.height = (textHeightPx / currentDimensions.height) * 100
                                updatedTexts[textIndex].position.x = (position.x / currentDimensions.width) * 100
                                updatedTexts[textIndex].position.y = (position.y / currentDimensions.height) * 100
                                updatedTexts[textIndex].isEdited = true
                                setTexts(updatedTexts);
                            }
                        }}
                        onDragStop={(e, direction) => {
                            const updatedTexts = [...spaceTexts];
                            const textIndex = updatedTexts.findIndex(t => t.id === id);
                            if (textIndex !== -1) {
                                updatedTexts[textIndex].position.x = (direction.x / currentDimensions.width) * 100
                                updatedTexts[textIndex].position.y = (direction.y / currentDimensions.height) * 100
                                updatedTexts[textIndex].isEdited = true
                                setTexts(updatedTexts);
                            }
                            setCurrentEditTextId(null)
                        }}
                        disableDragging={!isBuildMode}
                        enableResizing={isBuildMode}
                        className={isBuildMode && currentEditTextId === id ? 'active-edit-text' : ''}
                    >
                        <StyledSpaceText
                            $fontSize={fontSize}
                            $fontColor={fontColor}
                            $isBuildMode={isBuildMode}
                            $isCurrentEdit={currentEditTextId === id}
                            $hasLink={!!linkToPage}
                            onDragStart={(e) => e.preventDefault()}
                        >
                            {content}
                        </StyledSpaceText>
                    </Rnd>
                })
            }
        </>
    )
}

export default RenderSpaceTexts

export const StyledSpaceText = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    padding: 8px;
    font-size: ${props => `${props.$fontSize}px`};
    color: ${props => props.$fontColor};
    word-wrap: break-word;
    cursor: ${props => props.$hasLink ? 'pointer' : (props.$isBuildMode ? 'move' : 'default')};
    border: ${props => props.$isCurrentEdit ? '2px dashed #4a90e2' : 'none'};
    border-radius: 4px;
    background: ${props => props.$isCurrentEdit ? 'rgba(74, 144, 226, 0.1)' : 'transparent'};
    transition: all 0.2s ease;
    
    ${props => props.$hasLink && `
        &:hover {
            transform: scale(1.02);
            opacity: 0.8;
        }
    `}
`;
