import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { StyledDisplayModeText } from './styles'
import { getContent } from 'data/fetchContent.server'

const StyledIconWrapper = styled.div`
    position: absolute;
    left: ${props => `${props.$config.position.x}%`};
    top: ${props => `${props.$config.position.y}%`};
    width: 80px;
    height: 80px;
    display: block;
`

const StyledIcon = styled.div`
    background-color: #cccccc;
    border-radius: 8px;
    border: 1px solid #222;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s ease;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    width: 80px;
    height: 80px;
    padding: 10px;

    &:hover {
        background-color: rgba(221, 221, 221, 0.9);
        box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.3);
        border-color: #000;
    }
`

const Icon = ({ pageData, pageConfig }) => {  
    
  return (
    <StyledIconWrapper $config={pageConfig}>
        <StyledIcon>
            <Image 
                src={pageConfig?.icon?.url || '/icons/default.svg'}
                alt={pageConfig?.hotspotName || pageData?.title}
                width={80}
                height={80}
                style={{
                    transition: 'opacity 0.2s ease',
                    zIndex: 1,
                    color: `var(--background-color)`
                }}
            />
        </StyledIcon>
        <StyledDisplayModeText>
            {pageConfig.hotspotName || pageData.title}
        </StyledDisplayModeText>
    </StyledIconWrapper>
  )
}

export default Icon