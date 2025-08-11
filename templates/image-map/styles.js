import styled from 'styled-components'

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
    position: fixed;
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

export const StyledImagePreview = styled.div`
    position: relative;
    display: inline-block;
    cursor: move; /* shows it's draggable */
    border: 2px dashed #4a90e2; /* highlight the image boundaries */
    border-radius: 6px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    transition: border-color 0.2s ease;

    &:hover {
        border-color: #1e70bf;
    }

    &::after {
        content: '';
        position: absolute;
        right: -5px;
        bottom: -5px;
        width: 10px;
        height: 10px;
        background: #4a90e2;
        cursor: se-resize;
        box-shadow: 0 0 3px rgba(0,0,0,0.3);
    }
`;