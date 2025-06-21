import styled from 'styled-components'

export const StyledModalOverlay = styled.div`
    background: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 50;
    background-color: rgba(0, 0, 0, 0.5);
}
`

export const StyledModalContent = styled.div`
    background: white;
    position: absolute;
    ${props => props.$isCreatePageMode && `
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    `}; //In create page mode the modal should be centred on the screen
    border-radius: 0.5rem;
    padding: 1.25rem;
    min-width: 300px;
    width: ${props => !props.$isCreatePageMode ? '100%' : '60%'};
    height: ${props => !props.$isCreatePageMode ? 'unset' : '80vh'};
    max-width: 800px;
    z-index: 51;
    overflow-y: ${props => props.$isCreatePageMode && 'auto'};
    background-color: white;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
                0 4px 6px -4px rgba(0, 0, 0, 0.1);
`