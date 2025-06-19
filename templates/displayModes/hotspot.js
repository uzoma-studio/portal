import React from 'react'
import styled, { keyframes } from 'styled-components'

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.08); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
`;

const StyledHotspotWrapper = styled.div`
  position: absolute;
  left: ${props => `${props.$config.position.x}%`};
  top: ${props => `${props.$config.position.y}%`};
  width: ${props => `${props.$spaceTheme?.style?.hotspotSize}px`};
  height: ${props => `${props.$spaceTheme?.style?.hotspotSize}px`};
  cursor: pointer;
  display: block;
  z-index: 1;
`;

const StyledHotspotIcon = styled.div`
  background: ${props => props.$spaceTheme?.style?.hotspotColor};
  width: ${props => `${props.$spaceTheme?.style?.hotspotSize}px`};
  height: ${props => `${props.$spaceTheme?.style?.hotspotSize}px`};
  border-radius: 100%;
  z-index: -1;
  animation: ${pulse} 1.5s infinite ease-in-out;
  transition: width 0.2s, height
  &:hover {
    width: ${props => `${Number(props.$spaceTheme?.style?.hotspotSize) + 2.5}px`};
    height: ${props => `${Number(props.$spaceTheme?.style?.hotspotSize) + 2.5}px`};
    animation-play-state: paused;
  }
`;

const StyledHotspotTooltip = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: .25em;
  opacity: 0;
  transition: opacity 0.3s;

  ${StyledHotspotWrapper}:hover & {
    opacity: 1;
  }
`;

const StyledTooltipArrow = styled.div`
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid ${props => props.$spaceTheme?.style?.hotspotColor};
`;

const StyledTooltipText = styled.div`
  font-family: ${props => props.$spaceTheme?.style?.bodyFont};
  background: ${props => props.$spaceTheme?.style?.hotspotColor};
  color: ${props => props.$spaceTheme?.style?.bodyTextColor};
  padding: 2.5px;
  border-radius: 5px;
`;

const Hotspot = ({ pageData, pageConfig, spaceTheme }) => {
  return (
    <StyledHotspotWrapper $config={pageConfig} $spaceTheme={spaceTheme}>
      <StyledHotspotIcon $config={pageConfig} $spaceTheme={spaceTheme} />
      <StyledHotspotTooltip>
        <StyledTooltipArrow $config={pageConfig} $spaceTheme={spaceTheme} />
        <StyledTooltipText $config={pageConfig} $spaceTheme={spaceTheme}>
          {pageConfig.hotspotName || pageData.title}
        </StyledTooltipText>
      </StyledHotspotTooltip>
    </StyledHotspotWrapper>
  )
}

export default Hotspot