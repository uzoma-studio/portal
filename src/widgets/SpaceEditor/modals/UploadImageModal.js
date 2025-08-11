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

const UploadImageModal = ({ setIsModalOpen, updateSpacePreviewImages, setDragObjectToPosition }) => {
    const { space } = useSpace();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (file) {
        //   const uploadedImage = await handleMediaUpload(file, false)
          const previewUrl = URL.createObjectURL(file);
          const imageData = {
            file,
            previewUrl
          }
          updateSpacePreviewImages(imageData);
          setIsModalOpen(false)
        //   Remember to revoke: URL.revokeObjectURL(prevUrl)
        }
    }

    return (
        <>
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
                </StyledForm>
            </div>

            {message.text && (
                <StyledMessage className={message.type}>
                    {message.text}
                </StyledMessage>
            )}

            <div className=''>

            </div>
        </>

        /* <StyledSubmitButton 
            type="submit" 
            className="mt-4 px-6 py-3 rounded font-medium"
            disabled={isSubmitting || !selectedFile}
        >
            {isSubmitting ? 'Uploading...' : 'Upload Image'}
        </StyledSubmitButton> */
    );
};

export default UploadImageModal;