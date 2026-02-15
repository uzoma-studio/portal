import { createGlobalStyle } from 'styled-components'
import styled from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    :root {
        /* Theme Colors */
        --primary-color: ${props => props.$theme?.style?.primaryColor || '#222222'};
        --accent-color: ${props => props.$theme?.style?.accentColor || '#ffffff'};
        --body-text-color: ${props => props.$theme?.style?.bodyTextColor || '#222222'};
        --header-text-color: ${props => props.$theme?.style?.headerTextColor || '#222222'};
        --background-color: '#ffffff';
        --menu-background: ${props => props.$theme?.style?.menu?.backgroundColor || '#cccccc'};
        --menu-hover-color: ${props => props.$theme?.style?.menu?.hoverColor || '#666666'};
        
        /* Typography */
        --header-font: ${props => props.$theme?.style?.headerFont || 'monospace'};
        --body-font: ${props => props.$theme?.style?.bodyFont || 'system-ui'};
        
        /* Spacing */
        --menu-height: ${props => props.$theme?.style?.menu?.defaultHeight || '3.5rem'};
    }

    /* Base Styles */
    body {
        font-family: var(--body-font);
        color: var(--body-text-color);
        margin: 0;
        padding: 0;
    }

    /* Typography */
    h1, h2, h3, h4, h5, h6 {
        font-family: var(--header-font);
        color: var(--body-text-color);
        margin: 0;
    }

    /* Links */
    a {
        color: var(--primary-color);
        text-decoration: none;
        transition: color 0.2s ease;

        &:hover {
            color: var(--menu-hover-color);
        }
    }

    /* Buttons */
    button {
        font-family: var(--body-font);
        
        &.primary {
            background: var(--primary-color);
            color: var(--accent-color);
            border: 2px solid var(--accent-color);
            border-radius: 5px;
            padding: 0.5rem 1rem;
            cursor: pointer;
            transition: all 0.2s ease;

            &:hover {
                background: var(--accent-color);
                color: var(--primary-color);
                border-color: var(--primary-color);
            }
        }
    }

    /* Form Elements */
    input, textarea, select {
        font-family: var(--body-font);
        border: 2px solid var(--primary-color);
        border-radius: 5px;
        padding: 0.5rem;
        color: var(--body-text-color);
        
        &:focus {
            outline: none;
            border-color: var(--menu-hover-color);
        }
    }

    /* Scrollbar */
    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-track {
        background: var(--background-color);
    }

    ::-webkit-scrollbar-thumb {
        background: var(--primary-color);
        border-radius: 4px;
    }

    ::-webkit-scrollbar-thumb:hover {
        background: var(--menu-hover-color);
    }
`

export const StyledMessage = styled.div`
    padding: 0.75rem;
    border-radius: 0.25rem;
    margin-bottom: 1rem;
    font-size: 0.875rem;
    
    &.success {
        background-color: #dcfce7;
        color: #166534;
        border: 1px solid #86efac;
    }
    
    &.error {
        background-color: #fee2e2;
        color: #991b1b;
        border: 1px solid #fca5a5;
    }

    &.warning {
        background-color: #fef3c7;
        color: #92400e;
        border: 1px solid #fcd34d;
    }

    &.info {
        background-color: #dbeafe;
        color: #1e40af;
        border: 1px solid #93c5fd;
    }
`;