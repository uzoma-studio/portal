import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useSpace } from '@/context/SpaceProvider';
import { StyledMessage } from '@/styles/rootStyles';

import {
    StyledForm,
    StyledLabel,
    StyledInput,
    StyledSubmitButton,
} from '../styles';

const AddTextModal = ({ setIsModalOpen, backgroundDimensions }) => {
    const { setTexts, texts } = useSpace();
    const [content, setContent] = useState('');
    const [fontSize, setFontSize] = useState(16);
    const [fontColor, setFontColor] = useState('#000000');
    const [message, setMessage] = useState({ type: '', text: '' });
    const textInputRef = useRef(null);
    const [textHeight, setTextHeight] = useState('auto');

    // Calculate text height based on content
    useEffect(() => {
        if (textInputRef.current) {
            const scrollHeight = textInputRef.current.scrollHeight;
            setTextHeight(scrollHeight);
        }
    }, [content, fontSize]);

    const handleTextChange = (e) => {
        setContent(e.target.value);
    };

    const handleAddText = () => {
        if (!content.trim()) {
            setMessage({ type: 'error', text: 'Please enter some text' });
            return;
        }

        // Calculate center position (in percentages)
        const centerX = 50 - (300 / (backgroundDimensions.width || 1200)) * 50; // Assuming ~300px default width
        const centerY = 50 - (textHeight / (backgroundDimensions.height || 800)) * 50;

        // Create a new text element
        const newText = {
            id: `text_${Date.now()}`,
            content: content,
            fontSize: parseInt(fontSize),
            fontColor: fontColor,
            position: { x: centerX, y: centerY },
            size: { 
                width: (300 / (backgroundDimensions.width || 1200)) * 100,
                height: (textHeight / (backgroundDimensions.height || 800)) * 100
            },
            isPreview: true
        };

        setTexts(prev => [...prev, newText]);
        setMessage({ type: 'success', text: 'Text added successfully!' });
        
        // Reset form
        setContent('');
        setFontSize(16);
        setFontColor('#000000');
        
        setTimeout(() => setIsModalOpen(false), 500);
    };

    return (
        <StyledInlineTextContainer>
            {/* Inline Text Input */}
            <StyledTextInputWrapper>
                <StyledTextPreview
                    ref={textInputRef}
                    value={content}
                    onChange={handleTextChange}
                    placeholder="Type your text here..."
                    $fontSize={fontSize}
                    $fontColor={fontColor}
                    spellCheck="false"
                />
            </StyledTextInputWrapper>

            {/* Configuration Modal Below */}
            <StyledConfigPanel>
                <StyledForm>
                    <StyledConfigRow>
                        <div>
                            <StyledLabel htmlFor="fontSize" className="block mb-2">
                                Font Size (px)
                            </StyledLabel>
                            <StyledInput
                                id="fontSize"
                                type="number"
                                min="8"
                                max="72"
                                value={fontSize}
                                onChange={(e) => setFontSize(e.target.value)}
                                className="w-full"
                            />
                        </div>

                        <div>
                            <StyledLabel htmlFor="fontColor" className="block mb-2">
                                Text Color
                            </StyledLabel>
                            <StyledColorInput
                                id="fontColor"
                                type="color"
                                value={fontColor}
                                onChange={(e) => setFontColor(e.target.value)}
                            />
                        </div>
                    </StyledConfigRow>

                    {message.text && (
                        <StyledMessage className={message.type}>
                            {message.text}
                        </StyledMessage>
                    )}

                    <StyledButtonRow>
                        <StyledSubmitButton 
                            type="button"
                            onClick={handleAddText}
                            className="px-4 py-2 rounded font-medium"
                        >
                            Add Text
                        </StyledSubmitButton>
                        <StyledCancelButton 
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 rounded font-medium"
                        >
                            Cancel
                        </StyledCancelButton>
                    </StyledButtonRow>
                </StyledForm>
            </StyledConfigPanel>
        </StyledInlineTextContainer>
    );
};

export default AddTextModal;

const StyledInlineTextContainer = styled.div`
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2000;
    width: auto;
    max-width: 500px;
`;

const StyledTextInputWrapper = styled.div`
    background: white;
    border: 2px solid #4a90e2;
    border-radius: 6px;
    padding: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    margin-bottom: 8px;
`;

const StyledTextPreview = styled.textarea`
    width: 100%;
    min-height: 60px;
    max-height: 300px;
    resize: none;
    border: none;
    outline: none;
    font-family: inherit;
    font-size: ${props => `${props.$fontSize}px`};
    color: ${props => props.$fontColor};
    padding: 8px;
    line-height: 1.4;
    
    &::placeholder {
        color: #999;
        font-size: 14px;
    }
`;

const StyledConfigPanel = styled.div`
    background: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const StyledConfigRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    margin-bottom: 12px;
`;

const StyledColorInput = styled.input`
    width: 100%;
    height: 40px;
    cursor: pointer;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 4px;

    &:hover {
        border-color: #999;
    }
`;

const StyledButtonRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px;
`;

const StyledCancelButton = styled.button`
    background: #f0f0f0;
    color: #333;
    border: 1px solid #ddd;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
        background: #e0e0e0;
        border-color: #999;
    }
`;

