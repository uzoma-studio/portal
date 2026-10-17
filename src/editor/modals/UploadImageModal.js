import React, { useState } from 'react';
import { useSpace } from '@/context/SpaceProvider';
import { StyledMessage } from '@/styles/rootStyles';
import { getImageDimensions, checkFileSize, saveDraftImage } from '@/utils/helpers';
import { useSaveDraft } from '@/hooks/useSaveDraft';

import {
    StyledForm,
    StyledLabel,
    StyledInput,
    StyledSubmitButton,
} from '../styles';

const UploadImageModal = ({ setIsModalOpen, backgroundDimensions }) => {
    const { setImages, images } = useSpace();
    const { saveDraft } = useSaveDraft();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (file) {
            try {
                checkFileSize(file);
            } catch (error) {
                setMessage({ type: 'error', text: error.message });
                return;
            }

            const { width, height } = await getImageDimensions(file);
            //   const uploadedImage = await handleMediaUpload(file, false)
            const previewUrl = URL.createObjectURL(file);
            const localId = `draft-image-${crypto.randomUUID()}`;
            await saveDraftImage(localId, file);
            
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
            
            // create a preview image before uploading
            const newImage = {
                id: `preview_${images.length}_${file.lastModified}`,
                file,
                localId,
                image: {alt: `preview of image ${file.name}`, url: previewUrl},
                position: {x: 0, y: 0},
                // save size as percentage for responsiveness
                size: {width: percentWidth, height: percentHeight},
                isPreview: true,
                isEdited: true,
            };
            const updatedImages = [...images, newImage];
            setImages(updatedImages);
            saveDraft(updatedImages);
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
                        <p style={{marginTop: '.5rem', fontSize: '14px', color: '#999'}}>Max 5MB</p>
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
