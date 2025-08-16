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

export const StyledSaveButton = styled.button`
    border-radius: 5px;
    position: absolute;
    top: 4rem;
    right: 2rem;
    box-shadow: 4px 4px 0px rgba(0,0,0,1);
    background: var(--primary-color);
    color: var(--accent-color);
    padding: .5rem;
    z-index: 999;

    &:hover, &:focus {
        background: var(--accent-color);
        color: var(--primary-color);
        box-shadow: 0 6px 12px rgba(0,0,0,0.2), 0 3px 6px rgba(0,0,0,0.15);
        transform: translateY(-2px);
        outline: none;
    }

    &:active {
        background: var(--accent-color);
        color: var(--primary-color);
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        transform: translateY(1px);
    }
`

export const StyledSpaceImage = styled.div`
    position: absolute;
    object-fit: contain;
    cursor: ${props => props.$hasLink ? 'pointer' : (props.$currentEditImage ? 'move' : 'default')};
    transition: transform 0.2s ease;

    ${props => props.$hasLink && `
        &:hover {
            transform: scale(1.05);
        }
    `}
`