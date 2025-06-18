import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { createEntry } from '../../../data/createContent.server';
import {
    StyledForm,
    StyledLabel,
    StyledInput,
    StyledSelect,
    StyledSubmitButton,
} from './AddPageModal';
import { StyledMessage, StyledModalOverlay, StyledModalContent } from '@/styles/rootStyles';
import CloseButton from '@/components/closeButton';
import { handleMediaUpload } from '@/utils/helpers';

const CreateSpaceModal = ({ spaceData }) => {

    const router = useRouter();

    const [formData, setFormData] = useState({
        name: spaceData?.name || '',
        domain: spaceData?.domain || '',
        settings: {
            backgroundImage: spaceData?.settings?.backgroundImage || null
        }
    });
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })
    const [isDomainFieldEntered, setIsDomainFieldEntered] = useState(false)

    const buttonText = { default: 'Create', active: 'Creating'}

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'name' && !isDomainFieldEntered) {
            setFormData(prev => ({
                ...prev,
                name: value,
                domain: value.toLowerCase().replace(/\s+/g, '')
            }));
        } else {
            if (name === 'domain' && !isDomainFieldEntered) {
                setIsDomainFieldEntered(true)
                setFormData(prev => ({
                    ...prev,
                    domain: value.toLowerCase().replace(/\s+/g, '')
                }));
            } else {
                setFormData(prev => ({
                    ...prev,
                    [name]: value
                }));
            }
        }
    };

    const handleClose = () => {
        router.push('/jumping')
    }

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                settings: {
                    backgroundImage: file
                }
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ type: '', text: '' });

        try {
            let newSpaceData = { ...formData }
            newSpaceData.settings.backgroundImage = await handleMediaUpload(formData.settings.backgroundImage)

            const newSpace = await createEntry('spaces', newSpaceData);
                
            if (newSpace?.id) {
                setMessage({ 
                    type: 'success', 
                    text: 'Space created successfully!' 
                });
                setTimeout(() => {
                    handleClose();
                    router.push(`/${newSpace.domain}`)
                }, 1500);
            } else {
                setMessage({ 
                    type: 'error', 
                    text: 'Failed to create space. Please try again.' 
                });
            }
        } catch (error) {
            console.error('Error creating space:', error);
            setMessage({ 
                type: 'error', 
                text: error.message || 'An error occurred while creating the space.' 
            });
        }
    }
    
    return (
        <StyledModalOverlay>
            <StyledModalContent onClick={e => e.stopPropagation()}>
                <div className="mt-4">
                    <CloseButton closeFn={handleClose} position={{x: '95', y: '0'}} />
                    <h2 className='mb-6'>Create a new space</h2>
                    <StyledForm onSubmit={handleSubmit}>
                        <div>
                            <StyledLabel htmlFor="title" className="block mb-2">
                                Space Name
                            </StyledLabel>
                            <StyledInput
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full"
                                required
                            />
                        </div>
                        <div>
                            <StyledLabel htmlFor="domain" className="block mb-2">
                                Space Domain <span style={{color: '#ccc'}}><i><small>portal8.space/___</small></i></span>
                            </StyledLabel>
                            <StyledInput
                                type="text"
                                id="domain"
                                name="domain"
                                value={formData.domain}
                                onChange={handleInputChange}
                                className="w-full"
                                required
                            />
                        </div>

                        <div>
                            <StyledLabel htmlFor="backgroundImage" className="block mb-2">
                                Space Image
                            </StyledLabel>
                            <StyledInput
                                id="backgroundImage"
                                name="backgroundImage"
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="w-full"
                            />
                        </div>

                        {message.text && (
                            <StyledMessage className={message.type}>
                                {message.text}
                            </StyledMessage>
                        )}

                        <StyledSubmitButton 
                            type="submit" 
                            className="mt-4 px-6 py-3 rounded font-medium"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? `${buttonText.active}...` : `${buttonText.default} Space`}
                        </StyledSubmitButton>
                    </StyledForm>
                </div>
            </StyledModalContent>
        </StyledModalOverlay>
    )
}

export default CreateSpaceModal