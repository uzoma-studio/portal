import React, { useEffect, useState } from 'react'
import { Rnd } from 'react-rnd';
import styled from 'styled-components';
import Image from 'next/image';
import { useSpace } from '@/context/SpaceProvider';

const RenderSpaceImages = ({ isBuildMode, currentEditImageId, setCurrentEditImageId, backgroundDimensions, setSelectedElementPosition, setCurrentPageId }) => {
    
    const { images: spaceImages, pages } = useSpace()
    const [currentDimensions, setCurrentDimensions] = useState({ width: 0, height: 0 });
    const [resizedImages, setResizedImages] = useState(new Set());
    const [hoveredImageId, setHoveredImageId] = useState(null);

    // Update dimensions when backgroundDimensions change
    useEffect(() => {
        const dimensions = backgroundDimensions?.width > 0 && backgroundDimensions?.height > 0 
            ? backgroundDimensions 
            : { width: window.innerWidth || 1200, height: window.innerHeight || 800 };
        
        setCurrentDimensions(dimensions);
    }, [backgroundDimensions]);
    
    const handleImageClick = (id, event) => {
        if (isBuildMode) {
            setCurrentEditImageId(id);
            // Get the element's position for ElementControl
            const rect = event.currentTarget.getBoundingClientRect();
            setSelectedElementPosition({
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height
            });
        } else {
            // In preview mode, check if image is linked to a page
            const image = spaceImages.find(img => img.id === id);
            if (image?.linkToPage) {
                setCurrentPageId(image.linkToPage.id);
            }
        }
    };
    
    
    return (
        <>
            { spaceImages.map(({ id, image, position, size, linkToPage }, index) => {
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
                        onClick={(e) => handleImageClick(id, e)}
                        onMouseEnter={() => setHoveredImageId(id)}
                        onMouseLeave={() => setHoveredImageId(null)}
                        onResizeStop={(e, direction, ref, delta, position) => {
                            // Save the new size dimensions of the preview image
                            const image = spaceImages[index]
                            const imgWidthPx = Number(ref.style.width.split('px')[0])
                            const imgHeightPx = Number(ref.style.height.split('px')[0])
                            // Save sizes as percentages for responsiveness
                            image.size.width = (imgWidthPx / currentDimensions.width) * 100
                            image.size.height = (imgHeightPx / currentDimensions.height) * 100
                            // Save new position as percentages too
                            image.position.x = (position.x / currentDimensions.width) * 100
                            image.position.y = (position.y / currentDimensions.height) * 100
                            setResizedImages(prev => new Set([...prev, id]));
                            image.isEdited = true
                        }}
                        onDragStop={(e, direction) => {
                            const image = spaceImages[index]
                            image.position.x = (direction.x / currentDimensions.width) * 100
                            image.position.y = (direction.y / currentDimensions.height) * 100
                            image.isEdited = true
                            setCurrentEditImageId(null)
                        }}
                        disableDragging={!isBuildMode}
                        enableResizing={isBuildMode}
                        className={isBuildMode && currentEditImageId === id ? 'active-edit-image' : ''}
                    >
                        <StyledSpaceImage
                            $zIndex={index+1}
                            $hasLink={!!linkToPage}
                            $isCurrentEditImage={currentEditImageId === id}
                            $isBuildMode={isBuildMode}
                            onDragStart={(e) => e.preventDefault()}
                        >
                            <Image
                                src={image.url} 
                                alt={image.alt || `space image ${image.filename}`}
                                fill
                                style={{ objectFit: 'contain' }}
                                draggable={false}
                            />
                            {hoveredImageId === id && linkToPage && (() => {
                                const tooltipText = typeof linkToPage === 'string'
                                    ? linkToPage
                                    : pages?.find(p => p.id === linkToPage.id)?.title || 'Internal link';
                                return <StyledImageTooltip>{tooltipText}</StyledImageTooltip>;
                            })()}
                        </StyledSpaceImage>
                    </Rnd>
                })
            }
        </>
    )
}

export default RenderSpaceImages

export const StyledSpaceImage = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: contain;
    overflow: visible;
    cursor: ${props => props.$hasLink ? 'pointer' : (props.$isBuildMode ? 'move' : 'default')};
    transition: transform 0.2s ease;

    ${props => props.$hasLink && `
        &:hover {
            transform: scale(1.05);
        }
    `}
`

export const StyledImageTooltip = styled.div`
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 12px;
    white-space: nowrap;
    max-width: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
    z-index: 1000;
    
    &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid rgba(0, 0, 0, 0.9);
    }
`;