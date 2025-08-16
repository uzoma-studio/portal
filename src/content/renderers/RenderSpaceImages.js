import React from 'react'
import { Rnd } from 'react-rnd';
import styled from 'styled-components';
import Image from 'next/image';
import { useSpace } from '@/context/SpaceProvider';

const RenderSpaceImages = ({ isBuildMode, currentEditImageId, setCurrentEditImageId }) => {
    
    const { images: spaceImages } = useSpace()

    return (
        <>
            { spaceImages.map(({ id, image, position, size, linkToPage }, index) =>
                <Rnd
                    key={id}
                    default={{
                        x: position.x,
                        y: position.y,
                        width: size.width,
                        height: size.height,
                    }}
                    maxWidth={size.width}
                    maxHeight={size.height}
                    onClick={() => { isBuildMode && setCurrentEditImageId(id) }}
                    onResizeStop={(e, direction, ref, delta) => {
                        // Save the new size dimensions of the preview image
                        const image = spaceImages[index]
                        image.size.width = Number(ref.style.width.split('px')[0])
                        image.size.height = Number(ref.style.height.split('px')[0])
                        image.isEdited = true
                    }}
                    onDragStop={(e, direction) => {
                        const image = spaceImages[index]
                        image.position.x = direction.x
                        image.position.y = direction.y
                        image.isEdited = true
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
                        onClick={() => {linkToPage && setCurrentPageId(linkToPage.id)}}
                        onDragStart={(e) => e.preventDefault()}
                    >
                        <Image
                            src={image.url} 
                            alt={image.alt || `space image ${image.filename}`}
                            width={size.width}
                            height={size.height}
                            draggable={false}
                        />
                    </StyledSpaceImage>
                </Rnd>
            )}
        </>
    )
}

export default RenderSpaceImages

export const StyledSpaceImage = styled.div`
    position: absolute;
    object-fit: contain;
    cursor: ${props => props.$hasLink ? 'pointer' : (props.$isCurrentEditImage && props.$isBuildMode ? 'move' : 'default')};
    transition: transform 0.2s ease;

    ${props => props.$hasLink && `
        &:hover {
            transform: scale(1.05);
        }
    `}
`