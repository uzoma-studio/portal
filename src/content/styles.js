import styled from 'styled-components'
import Link from 'next/link';

// Confused about a styling inconsistency between Space and Page? Check out the TODO written in the Pages.ts `style` field
export const StyledPage = styled.div`
    position: absolute;
    ${props => {
        const isCenterModal = props.$spaceTheme?.style?.defaultPageStyles?.pageDisplayStyle === 'center-modal';
        return `
            top: ${isCenterModal ? '50%' : `${props.$settings?.position?.y}%`};
            left: ${isCenterModal ? '50%' : `${props.$settings?.position?.x}%`};
        `;
    }}
    width: ${props => `${props.$settings?.size?.width}px`};
    height: ${props => `${props.$settings?.size?.height}px`};
    background-color: ${props => props.$settings?.style?.backgroundColor};
    color: ${props => props.$settings?.style?.textColor};
    border: ${props => props.$settings?.style?.borderWidth} solid ${props => props.$spaceTheme?.style?.menu?.backgroundColor};
    padding: 20px;
    box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.5);
    overflow: scroll;
    transform: ${props => `${props.$settings?.style?.pageDisplayStyle === 'center-modal' ? `translate(-50%, -50%)` : ``}`};
    z-index: ${props => props.$isDisplayMode ? 'unset' : '99'};
    resize: both;
    overflow: auto;

    @media (max-width: 768px) {
        top: 50%;
        left: 50%;
        max-width: 95%;
    }

     ${props => props.$settings?.style?.backgroundImageRenderMode === 'center' && `
        width: unset;
        height: unset;
        margin: 2rem;
        padding: 1.5rem;
        border-width: 5px;
        max-height: 500px;
        max-width: 500px;
    `}
`
// Currently unused but could be useful
export const StyledDisplayModeLayout = styled.div`
    ${props => {
        switch(props.$displayMode) {
            case 'icons':
                return `
                    display: flex;
                    flex-wrap: wrap;
                    gap: 4rem;
                    align-items: center;
                `
            case 'list':
                return `
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                `
            default:
                return `
                    display: block;
                `
        }
    }}
`

export const StyledDisplayModeWrapper = styled.div`
    cursor: pointer;
    transition: transform 0.2s ease;

    // &:hover {
    //     transform: translateY(-5px);
    // }
`

export const StyledGrid = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-image: 
        linear-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.15) 1px, transparent 1px);
    background-size: 20px 20px;
    pointer-events: none;
`;

export const StyledHeaderContainer = styled.div`
  position: fixed;
  top: 1rem;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  width: 100%;

  h1 {
    font-size: 1.75rem;
    font-weight: bold;
    font-family: ${props => props.$theme?.style?.bodyFont};
    transform: translateX(50%);
  }
`;

export const StyledPortalLogo = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  text-decoration: none;
  color: inherit;
  
  &::after {
    content: 'made with portal';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 4px;
    padding: 4px 8px;
    color: purple;
    font-size: 14px;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.3s;
    font-family: 'Courier New', monospace;
  }
  
  &:hover::after {
    opacity: 1;
  }
`;