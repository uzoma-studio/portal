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
                ${props.$settings?.style?.backgroundColor || '#fff'})`
            : props.$settings?.style?.backgroundColor || '#fff'
        };
    }

    .hotspot {
        position: absolute;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 1;
        
        .hotspot-icon {
            background: ${props => props.$settings?.style?.hotspotColor};
            width: ${props => props.$settings?.style?.hotspotSize}px;
            height: ${props => props.$settings?.style?.hotspotSize}px;
            border-radius: 100%;
            z-index: -1;
            animation: pulse 1.5s infinite ease-in-out;

            &:hover {
                width: ${props => `${Number(props.$settings?.style?.hotspotSize) + 2.5}px`};
                height: ${props => `${Number(props.$settings?.style?.hotspotSize) + 2.5}px`};
                transition: ease-in .2s;
                animation-play-state: paused;
            }
        }

        .hotspot-tooltip {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: .25em;
            opacity: 0;
            transition: opacity 0.3s;

            .tooltip-arrow {
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-bottom: 6px solid ${props => props.$settings?.style?.hotspotColor};
            }

            .tooltip-text {
                font-family: ${props => props.$settings?.style?.bodyFont};
                background: ${props => props.$settings?.style?.hotspotColor};
                color: ${props => props.$settings?.style?.bodyTextColor};
                padding: 2.5px;
                border-radius: 5px;
            }
        }

        &:hover .hotspot-tooltip {
            opacity: 1;
        }
    }

    .page-icon {

        .icon-tooltip {
            position: absolute;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 0.5em;
            opacity: 0;
            transition: opacity 0.3s;
            pointer-events: none;

            .tooltip-arrow {
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                border-bottom: 6px solid ${props => props.$settings?.style?.hotspotColor || '#9333ea'};
            }

            .tooltip-text {
                font-family: ${props => props.$settings?.style?.bodyFont};
                background: ${props => props.$settings?.style?.hotspotColor || '#9333ea'};
                color: #fff;
                padding: 4px 8px;
                border-radius: 4px;
                white-space: nowrap;
                font-size: 0.875rem;
            }
        }

        &:hover .icon-tooltip {
            opacity: 1;
        }
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.5);
            opacity: 0.6;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
`

export const StyledPage = styled.div`
    position: absolute;
    top: ${props => `${props.$settings?.style?.displayStyle === 'center-modal' ? '50%' : `${props.$settings?.position?.y}%`}`};
    left: ${props => `${props.$settings?.style?.displayStyle === 'center-modal' ? '50%' : `${props.$settings?.position?.x}%`}`};
    width: ${props => `${props.$settings?.size?.width}px`};
    height: ${props => `${props.$settings?.size?.height}px`};
    background-color: ${props => props.$settings?.style?.backgroundColor};
    color: ${props => props.$settings?.style?.textColor};
    border-color: ${props => props.$settings?.style?.borderColor};
    border-width: ${props => props.$settings?.style?.borderWidth};
    padding: 20px;
    box-shadow: 4px 4px 6px rgba(0, 0, 0, 0.5);
    overflow: scroll;
    transform: ${props => `${props.$settings?.style?.displayStyle === 'center-modal' ? `translate(-50%, -50%)` : ``}`};
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
        linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px);
    background-size: 20px 20px;
    pointer-events: none;
`;