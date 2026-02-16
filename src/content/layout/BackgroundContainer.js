import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components';
import Image from 'next/image';

import { useSpace } from '@/context/SpaceProvider';

const BackgroundContainer = ({ children, isBuildMode, setIsBuildMode, currentEditImageId, setCurrentEditImageId, backgroundDimensions, setBackgroundDimensions, currentEditTextId, setCurrentEditTextId, showLinkModal }) => {

    const { settings, isCurrentUserSpaceOwner } = useSpace()
    const { theme, backgroundImage } = settings
    const imageRenderMode = theme?.style?.backgroundImageRenderMode

    const clickTimeout = useRef(null);
    const backgroundRef = useRef(null);

    // Get background dimensions
    useEffect(() => {
        const updateDimensions = () => {
            
            if (backgroundRef.current) {
                const rect = backgroundRef.current.getBoundingClientRect();
                
                // In preview mode (not build mode), use full viewport dimensions
                // In build mode, use container dimensions
                const width = isBuildMode ? rect.width : window.innerWidth;
                const height = isBuildMode ? rect.height : window.innerHeight;
                
                setBackgroundDimensions({
                    width: width,
                    height: height
                });
            }
        };

        // Initial measurement
        updateDimensions();

        window.addEventListener('resize', updateDimensions);
        
        // Cleanup
        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, [isBuildMode]);

    const handleClick = async (e) => {

        if(isBuildMode){
            // Exit image edit mode when background is clicked
            if(currentEditImageId) {
                setCurrentEditImageId(null)
                return
            }
            if(currentEditTextId) {
                setCurrentEditTextId(null)
                return
            }
        }  
    };
      
    const handleDoubleClick = () => {
        // If double click, prevent single click action
        clearTimeout(clickTimeout.current);
        setIsBuildMode(!isBuildMode)
    };

  return (
    <StyledBackgroundContainer 
        $settings={theme}
        $isBuildMode={isBuildMode}
        ref={backgroundRef}
        onClick={(e) => isCurrentUserSpaceOwner && handleClick(e)}
        onDoubleClick={() => isCurrentUserSpaceOwner && handleDoubleClick()}
    >
        <div className='background'
            style={{cursor: isBuildMode ? 'crosshair' : 'auto'}}
        />
        { children }
    </StyledBackgroundContainer>
  )
}

export default BackgroundContainer

export const StyledBackgroundContainer = styled.div`
    position: relative;
    z-index: 0;
    overflow: hidden;
    
    ${props => props.$isBuildMode ? `
        height: 80vh;
        width: 80%;
        margin-left: 10%;
        margin-top: 10vh;
        border: 1px solid #ccc;
        border-radius: 8px;
    ` : `
        height: 100vh;
        width: 100vw;
        margin: 0;
        margin-left: -8px;
        position: fixed;
        top: 0;
        left: 0;
    `}

    img {
        max-width: 100%;
        max-height: 100%;
    }

    div.background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 300%;
        overflow-y: scroll;
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