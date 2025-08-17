import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components';
import Image from 'next/image';

import { useSpace } from '@/context/SpaceProvider';

const BackgroundContainer = ({ children, isBuildMode, setIsBuildMode, currentEditImageId, setCurrentEditImageId, backgroundDimensions, setBackgroundDimensions }) => {

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
                
                setBackgroundDimensions({
                    width: rect.width,
                    height: rect.height
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
    }, []);

    const handleClick = async (e) => {
        if(isBuildMode){
            // Exit image edit mode when background is clicked
            if(currentEditImageId) {
                setCurrentEditImageId(null)
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

    height: 100vh;
    z-index: -1;
    overflow: hidden;

    img {
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