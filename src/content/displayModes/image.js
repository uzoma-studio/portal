import React from 'react'
import styled from 'styled-components'
import Image from 'next/image'
import { StyledDisplayModeText } from './styles'

const StyledContainer = styled.div`
    position: absolute;
    left: ${props => `${props.$config.position.x}%`};
    top: ${props => `${props.$config.position.y}%`};
`

const StyledImageWrapper = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 10px;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
    overflow: hidden;

    &:hover {
        transform: scale(1.005);
        box-shadow: 8px 8px 12px rgba(0, 0, 0, 0.4);
    }

    & > img {
        transition: opacity 0.1s ease;
    }
`

const ImageDisplayMode = ({ pageData, pageConfig }) => {
  return (
    <StyledContainer $config={pageConfig}>
        <StyledImageWrapper>
            <Image 
                src={pageData.coverImage?.url}
                alt={pageData.title}
                width={200}
                height={200}
            />
        </StyledImageWrapper>
        <StyledDisplayModeText>{pageData.title}</StyledDisplayModeText>
    </StyledContainer>
  )
}

export default ImageDisplayMode