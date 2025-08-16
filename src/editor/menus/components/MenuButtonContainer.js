import React, { useState } from 'react';
import styled from 'styled-components';

const MenuButtonContainer = ({ children, tooltipText, tooltipPosition = 'top' }) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  return (
    <StyledContainer
      onMouseEnter={() => setIsTooltipVisible(true)}
      onMouseLeave={() => setIsTooltipVisible(false)}
    >
      {children}
      {isTooltipVisible && (
        <StyledTooltipContent $tooltipPosition={tooltipPosition}>
          {tooltipText}
        </StyledTooltipContent>
      )}
    </StyledContainer>
  );
};

export default MenuButtonContainer;

const StyledContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledTooltipContent = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.9);
  color: white;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
  z-index: 10000;
  pointer-events: none;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  
  /* Position the tooltip based on the position prop */
  ${props => {
    switch (props.$tooltipPosition) {
      case 'top':
        return `
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          
          &::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 4px solid transparent;
            border-top-color: rgba(0, 0, 0, 0.9);
          }
        `;
      case 'bottom':
        return `
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          
          &::after {
            content: '';
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 4px solid transparent;
            border-bottom-color: rgba(0, 0, 0, 0.9);
          }
        `;
      case 'left':
        return `
          right: calc(100% + 8px);
          top: 50%;
          transform: translateY(-50%);
          
          &::after {
            content: '';
            position: absolute;
            left: 100%;
            top: 50%;
            transform: translateY(-50%);
            border: 4px solid transparent;
            border-left-color: rgba(0, 0, 0, 0.9);
          }
        `;
      case 'right':
        return `
          left: calc(100% + 8px);
          top: 50%;
          transform: translateY(-50%);
          
          &::after {
            content: '';
            position: absolute;
            right: 100%;
            top: 50%;
            transform: translateY(-50%);
            border: 4px solid transparent;
            border-right-color: rgba(0, 0, 0, 0.9);
          }
        `;
      default:
        return `
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          
          &::after {
            content: '';
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            border: 4px solid transparent;
            border-top-color: rgba(0, 0, 0, 0.9);
          }
        `;
    }
  }}
`;
