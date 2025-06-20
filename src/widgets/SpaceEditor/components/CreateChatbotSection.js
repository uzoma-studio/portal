import React, { useState } from 'react';
import { StyledInput, StyledLabel, StyledTextArea } from '../AddPageModal'
import { StyledMessage } from '@/styles/rootStyles';
import defaultBotNodes from './defaultBotNodes.json';
import styled from 'styled-components';

const StyledAvatarPreview = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin: 1rem 0;
    border: 2px solid #ddd;
    
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const CreateChatbotSection = ({ formData, onFormChange }) => {
    const [jsonError, setJsonError] = useState('');
    // const [avatarPreview, setAvatarPreview] = useState(formData.avatar || '/logo.png');
    // const [avatarError, setAvatarError] = useState('');

    const handleJsonChange = (e) => {
        const { value } = e.target;
        try {
            // Try to parse the JSON to validate it
            JSON.parse(value);
            setJsonError('');
            onFormChange(e);
        } catch (error) {
            setJsonError('Invalid JSON format');
        }
    };

    // const handleAvatarChange = (e) => {
    //     const file = e.target.files[0];
    //     setAvatarError('');

    //     if (file) {
    //         // Check file size (1MB = 1024 * 1024 bytes)
    //         if (file.size > 1024 * 1024) {
    //             setAvatarError('Avatar image must be less than 1MB');
    //             return;
    //         }

    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setAvatarPreview(reader.result);
    //             onFormChange({
    //                 target: {
    //                     name: 'avatar',
    //                     value: file
    //                 }
    //             });
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    return (
        <>
            {/* <div>
                <StyledLabel htmlFor="avatar" className="block mb-2">
                    Bot Avatar
                </StyledLabel>
                <StyledAvatarPreview>
                    <img src={avatarPreview} alt="Bot avatar" />
                </StyledAvatarPreview>
                <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="w-full"
                />
                {avatarError && (
                    <StyledMessage className="error">
                        {avatarError}
                    </StyledMessage>
                )}
            </div> */}

            <div>
                <StyledLabel htmlFor="title" className="block mb-2">
                    Bot Name
                </StyledLabel>
                <StyledInput
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={onFormChange}
                    required
                    className="w-full px-3 py-2 rounded"
                />
            </div>

            <div>
                <StyledLabel htmlFor="botNodes" className="block mb-2">
                    Bot Nodes (JSON)
                </StyledLabel>
                <StyledTextArea
                    id="botNodes"
                    name="botNodes"
                    value={formData.botNodes || JSON.stringify(defaultBotNodes, null, 2)}
                    onChange={handleJsonChange}
                    className="w-full px-3 py-2 rounded font-mono"
                    rows={8}
                />
                {jsonError && (
                    <StyledMessage className="error">
                        {jsonError}
                    </StyledMessage>
                )}
            </div>
        </>
    );
};

export default CreateChatbotSection; 