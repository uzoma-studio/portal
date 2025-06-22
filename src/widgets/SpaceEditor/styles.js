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

export const StyledTabButton = styled.button`
    color: var(--body-text-color);
    
    &.active {
        color: var(--primary-color);
        
        &:after {
            content: '';
            position: absolute;
            bottom: -1px;
            left: 0;
            width: 100%;
            height: 2px;
            background: var(--primary-color);
        }
    }
`;

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const StyledLabel = styled.label`
    color: var(--body-text-color);
    font-weight: 500;
`;

export const StyledInput = styled.input`
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    font-family: var(--body-font);
    
    &:focus {
        outline: none;
        border-color: var(--primary-color);
    }
`;

export const StyledToggle = styled.div`
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    font-family: var(--body-font);
    
    &:focus {
        outline: none;
        border-color: var(--primary-color);
    }
`;

export const StyledSelect = styled.select`
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    font-family: var(--body-font);
    
    &:focus {
        outline: none;
        border-color: var(--primary-color);
    }
`;

export const StyledTextArea = styled.textarea`
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    font-family: var(--body-font);
    min-height: 150px;
    resize: vertical;
    
    &:focus {
        outline: none;
        border-color: var(--primary-color);
    }
`;

export const StyledSubmitButton = styled.button`
    background: var(--primary-color);
    color: var(--accent-color);
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    font-weight: 500;
    transition: opacity 0.2s ease;
    
    &:hover:not(:disabled) {
        opacity: 0.9;
    }
    
    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`;

export const StyledNumberInput = styled.input`
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    font-family: var(--body-font);
    width: 100%;
    
    &:focus {
        outline: none;
        border-color: var(--primary-color);
    }
`;

export const StyledSettingsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
`;

export const StyledSettingsSection = styled.div`
    margin-top: 1rem;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
`;

export const StyledColorInput = styled.input`
    padding: 0.25rem;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
    font-family: var(--body-font);
    width: 100%;
    height: 2.5rem;
    
    &::-webkit-color-swatch-wrapper {
        padding: 0;
    }
    
    &::-webkit-color-swatch {
        border: none;
        border-radius: 0.25rem;
    }
    
    &:focus {
        outline: none;
        border-color: var(--primary-color);
    }
`;

export const StyledColorLabel = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
`;

export const StyledColorPreview = styled.div`
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 0.25rem;
    border: 1px solid #ddd;
`;

export const StyledDragContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1000;
    cursor: move;
`;

export const StyledIconList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1rem;
`;

export const StyledIconButton = styled.button`
  border-radius: 0.5rem;
  padding: 0.5rem;
  cursor: pointer;
  transition: box-shadow 0.2s, border-color 0.2s, transform 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover, &:focus {
    border-color: var(--accent-color, #0070f3);
    box-shadow: 0 2px 8px rgba(0,0,0,0.12);
    outline: none;
    transform: scale(1.05);
  }
`;