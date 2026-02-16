import React, { useState } from 'react';
import { useSpace } from '@/context/SpaceProvider';
import { StyledMessage } from '@/styles/rootStyles';
import { getImageDimensions } from '@/utils/helpers';

import {
    StyledForm,
    StyledLabel,
    StyledInput,
    StyledSubmitButton,
} from '../styles';

const UploadImageModal = ({ setIsModalOpen, backgroundDimensions }) => {
    const { space, setImages, images } = useSpace();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (file) {
            const { width, height } = await getImageDimensions(file);
            //   const uploadedImage = await handleMediaUpload(file, false)
            const previewUrl = URL.createObjectURL(file);
            
            // Calculate size as percentage, capped at 50% of background container
            let percentWidth = (width / backgroundDimensions.width) * 100;
            let percentHeight = (height / backgroundDimensions.height) * 100;
            
            // Cap at 50% of the container
            const maxPercent = 50;
            if (percentWidth > maxPercent || percentHeight > maxPercent) {
                const scaleFactor = Math.min(maxPercent / percentWidth, maxPercent / percentHeight);
                percentWidth *= scaleFactor;
                percentHeight *= scaleFactor;
            }
            
            //   create a preview image before uploading
            setImages(prev => [...prev, {
                id: `preview_${prev.length}_${file.lastModified}`,
                file,
                image: {alt: `preview of image ${file.name}`, url: previewUrl},
                position: {x: 0, y: 0},
                // save size as percentage for responsiveness
                size: {width: percentWidth, height: percentHeight},
                isPreview: true
            }])
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