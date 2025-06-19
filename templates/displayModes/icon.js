import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'

const StyledIconWrapper = styled.div`
    position: absolute;
    left: ${props => `${props.$config.position.x}%`};
    top: ${props => `${props.$config.position.y}%`};
    width: 60px;
    height: 60px;
    display: block;
`

const StyledIcon = styled.div`
    background-color: rgba(221, 221, 221, 0.7);
    border-radius: 8px;
    border: 1px solid #222;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s ease;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    width: 60px;
    height: 60px;
    margin: 2rem;

    &:hover {
        background-color: rgba(221, 221, 221, 0.9);
        box-shadow: 6px 6px 6px rgba(0, 0, 0, 0.3);
        border-color: #000;
    }
`

const StyledIconText = styled.p`
    color: #fff;
    margin-top: 0.25rem;
    font-size: 1rem;
    text-align: center;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: color 0.2s ease;
`

const Icon = ({ pageData, pageConfig }) => {    
    
  return (
    <StyledIconWrapper $config={pageConfig}>
        <StyledIcon>
            <Image 
                src={process.env.NODE_ENV === 'production' 
                    ? pageConfig.icon?.url 
                    : `/icons/${pageConfig.icon?.filename}`
                    || '/icons/default.svg'}
                alt={pageConfig.hotspotName || pageData.title}
                width={36}
                height={36}
                style={{
                    filter: 'brightness(0) invert(1)',
                    opacity: 0.9,
                    transition: 'opacity 0.2s ease'
                }}
            />
        </StyledIcon>
        <StyledIconText>
            {pageConfig.hotspotName || pageData.title}
        </StyledIconText>
    </StyledIconWrapper>
  )
}

export default Icon