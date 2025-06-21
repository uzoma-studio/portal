import React, { useState } from 'react';
import styled from 'styled-components';
import { useSpace } from '@/context/SpaceProvider';
import { StyledMessage } from '@/styles/rootStyles';
import { handleMediaUpload } from '@/utils/helpers';

import {
    StyledForm,
    StyledLabel,
    StyledInput,
    StyledSubmitButton,
} from '../styles';

const UploadImageModal = ({ setIsModalOpen, setDragObjectToPosition }) => {
    const { space } = useSpace();

    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
          const uploadedImage = await handleMediaUpload(file, false)
          setIsModalOpen(false)
        }
    }

    return (
        <div className="mt-4">
            <StyledForm>
                <div>
                    <StyledLabel htmlFor="image" className="block mb-2">
                        Add Image
                    </StyledLabel>
                    <StyledInput
                        id="image"
                        name="image"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full"
                    />
                </div>

                {/* {previewUrl && (
                    <StyledImagePreview>
                        <img src={previewUrl} alt="Preview" />
                    </StyledImagePreview>
                )} */}

                {message.text && (
                    <StyledMessage className={message.type}>
                        {message.text}
                    </StyledMessage>
                )}

                {/* <StyledSubmitButton 
                    type="submit" 
                    className="mt-4 px-6 py-3 rounded font-medium"
                    disabled={isSubmitting || !selectedFile}
                >
                    {isSubmitting ? 'Uploading...' : 'Upload Image'}
                </StyledSubmitButton> */}
            </StyledForm>
        </div>
    );
};

export default UploadImageModal;

const StyledImagePreview = styled.div`
    margin-top: 1rem;
    text-align: center;
    
    img {
        max-width: 100%;
        max-height: 200px;
        border-radius: 0.25rem;
        border: 1px solid #ddd;
    }
`;