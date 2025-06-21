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

export const StyledPage = styled.div`
    position: absolute;
    top: ${props => `${props.$settings?.style?.pageDisplayStyle === 'center-modal' ? '50%' : `${props.$settings?.position?.y}%`}`};
    left: ${props => `${props.$settings?.style?.pageDisplayStyle === 'center-modal' ? '50%' : `${props.$settings?.position?.x}%`}`};
    width: ${props => `${props.$settings?.size?.width}px`};
    height: ${props => `${props.$settings?.size?.height}px`};
    background-color: ${props => props.$settings?.style?.backgroundColor};
    color: ${props => props.$settings?.style?.textColor};
    border-color: ${props => props.$spaceTheme?.style?.menu?.backgroundColor};
    border-width: ${props => props.$settings?.style?.borderWidth};
    padding: 20px;
    box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.5);
    overflow: scroll;
    transform: ${props => `${props.$settings?.style?.pageDisplayStyle === 'center-modal' ? `translate(-50%, -50%)` : ``}`};
    z-index: 99;

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