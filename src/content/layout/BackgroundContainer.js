import React, { useRef } from 'react'
import styled from 'styled-components';
import Image from 'next/image';

import { useSpace } from '@/context/SpaceProvider';

const BackgroundContainer = ({ children, isBuildMode, setIsBuildMode, currentEditImageId, setCurrentEditImageId, openAddPageModal }) => {

    const { settings, isCurrentUserSpaceOwner } = useSpace()
    const { theme, backgroundImage } = settings
    const imageRenderMode = theme?.style?.backgroundImageRenderMode

    const clickTimeout = useRef(null);

    const handleClick = async (e) => {

        if(isBuildMode){

            // Exit image edit mode when background is clicked
            if(currentEditImageId) {
                setCurrentEditImageId(null)
                return
            }

            // Always clear any previous timer before setting a new one
            clearTimeout(clickTimeout.current);
            // Start a timer for single click
            const currentTarget = e.currentTarget
            const clientX = e.clientX
            const clientY = e.clientY

            clickTimeout.current = setTimeout(() => {
                openAddPageModal(currentTarget, clientX, clientY);
            }, 250);
        }

        
    };
      
    const handleDoubleClick = () => {
        // If double click, prevent single click action
        clearTimeout(clickTimeout.current);
        setIsBuildMode(!isBuildMode)
    };

  return (
    <StyledBackgroundContainer $settings={theme}>
        { backgroundImage && theme.style.backgroundMode === 'image' ?
            imageRenderMode === 'background' ? (
                <Image 
                    src={backgroundImage.url}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    style={{cursor: isBuildMode ? 'crosshair' : 'auto'}}
                    alt={backgroundImage?.alt}
                    onClick={(e) => isCurrentUserSpaceOwner && handleClick(e)}
                    onDoubleClick={() => isCurrentUserSpaceOwner && handleDoubleClick()}
                />
            ) : (
                <div className="fixed inset-0 flex items-center justify-center">
                    <Image 
                        src={backgroundImage.url}
                        width={1200}
                        height={800}
                        style={{
                            objectFit: 'contain',
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            cursor: isBuildMode ? 'crosshair' : 'auto'
                        }}
                        className="md:w-[70%] lg:w-[60%] xl:w-[50%]"
                        quality={100}
                        alt={backgroundImage?.alt}
                        onClick={(e) => isCurrentUserSpaceOwner && handleClick(e)}
                        onDoubleClick={() => isCurrentUserSpaceOwner && handleDoubleClick()}
                    />
                </div>
            )
            :
            <div className='background'
                style={{cursor: isBuildMode ? 'crosshair' : 'auto'}}
                onClick={(e) => isCurrentUserSpaceOwner && handleClick(e)}
                onDoubleClick={() => isCurrentUserSpaceOwner && handleDoubleClick()}
            />
        }
        { children }
    </StyledBackgroundContainer>
  )
}

export default BackgroundContainer

export const StyledBackgroundContainer = styled.div`
    img {
        z-index: -1;
    }

    div.background {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        z-index: -1;
        background: ${props => props.$settings?.style?.backgroundMode === 'gradient' 
            ? `linear-gradient(180deg, 
                ${props.$settings?.style?.primaryColor || '#9333ea'}, 
                ${props.$settings?.style?.secondaryColor || '#c084fc'}, 
                ${props.$settings?.style?.backgroundColor || '#ffffff'})`
            : props.$settings?.style?.backgroundColor || '#ffffff'
        };
    }
`