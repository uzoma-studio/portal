import React, { useState, useEffect } from 'react';
import { createEntry, updateEntry } from '../../../data/createContent.server';
import { useSpace } from '@/context/SpaceProvider';
import { generateSlug } from '@/utils/helpers';
import RichTextEditor from './RichTextEditor';
import { StyledMessage } from '@/styles/rootStyles';
import CloseButton from '@/components/closeButton';

// Import styled components from AddPageModal
import {
    StyledForm,
    StyledLabel,
    StyledInput,
    StyledSelect,
    StyledSubmitButton,
} from './AddPageModal';

const AddPostModal = ({ setIsModalOpen, isCreatePostMode, postData, updateId }) => {
    const { space } = useSpace();
    const [postBodyField, setPostBodyField] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [uploadedFile, setUploadedFile] = useState(null)

    const buttonText = isCreatePostMode ? { default: 'Create', active: 'Creating' } : { default: 'Edit', active: 'Editing' };
    
    const [formData, setFormData] = useState({
        title: postData?.title || '',
        update: updateId || postData?.update || null,
        coverImage: postData?.coverImage || null,
        body: postData?.body || null,
        slug: postData?.slug || '',
        date: postData?.date || new Date().toISOString().split('T')[0],
        space,
    });

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            body: postBodyField
        }));
    }, [postBodyField]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFormData(prev => ({
                ...prev,
                coverImage: file
            }));
        }
    };

    const handleClose = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ type: '', text: '' });

        if (isCreatePostMode) {
            try {
                const slug = generateSlug(formData.title);
                let newPostData = {
                    ...formData,
                    slug
                };

                // Handle cover image upload if present
                if (formData.coverImage instanceof File) {
                    const uploadFormData = new FormData();
                    uploadFormData.append('file', formData.coverImage);

                    const response = await fetch('/api/media', {
                        method: 'POST',
                        body: uploadFormData,
                    });

                    if (!response.ok) {
                        throw new Error('Failed to upload media');
                    }

                    const media = await response.json();
                    newPostData.coverImage = media.id;
                }

                const res = await createEntry('posts', newPostData);

                if (res?.id) {
                    setMessage({
                        type: 'success',
                        text: 'Post created successfully!'
                    });
                    setTimeout(() => {
                        handleClose();
                    }, 1500);
                } else {
                    setMessage({
                        type: 'error',
                        text: 'Failed to create post. Please try again.'
                    });
                }
            } catch (error) {
                console.error('Error creating post:', error);
                setMessage({
                    type: 'error',
                    text: error.message || 'An error occurred while creating the post.'
                });
            }
        } else {
            try {
                let updateData = { ...formData };

                // Handle cover image upload if present
                if (formData.coverImage instanceof File) {

                    const uploadFormData = new FormData();
                    uploadFormData.append('file', formData.coverImage);
                    uploadFormData.append(
                        '_payload',
                        JSON.stringify({
                            alt: formData.coverImage.name,
                        }),
                    )

                    const response = await fetch(`/api/media`, {
                        method: 'POST',
                        body: uploadFormData,
                    });

                    if (!response.ok) {
                        throw new Error('Failed to upload media');
                    }

                    const media = await response.json();
                    console.log(media);
                    
                    updateData.coverImage = media?.doc?.id;
                }

                const updatedPost = await updateEntry('posts', postData.id, updateData);

                if (updatedPost?.id) {
                    setMessage({
                        type: 'success',
                        text: 'Post edited successfully!'
                    });
                    setTimeout(() => {
                        handleClose();
                    }, 1500);
                } else {
                    setMessage({
                        type: 'error',
                        text: 'Failed to edit post. Please try again.'
                    });
                }
            } catch (error) {
                console.error('Error editing post:', error);
                setMessage({
                    type: 'error',
                    text: error.message || 'An error occurred while editing the post.'
                });
            }
        }

        setIsSubmitting(false);
    };

    return (
        <div className="mt-4">
            <CloseButton closeFn={handleClose} position={{x: '95', y: '0'}} />
            <h2 className='mb-6'>Add a new post</h2>
            <StyledForm onSubmit={handleSubmit}>
                <div>
                    <StyledLabel htmlFor="title" className="block mb-2">
                        Title
                    </StyledLabel>
                    <StyledInput
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="w-full"
                        required
                    />
                </div>

                <div>
                    <StyledLabel htmlFor="date" className="block mb-2">
                        Date
                    </StyledLabel>
                    <StyledInput
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="w-full"
                        required
                    />
                </div>

                <div>
                    <StyledLabel htmlFor="body" className="block mb-2">
                        Post Content
                    </StyledLabel>
                    <RichTextEditor
                        name="body"
                        setPageBodyField={setPostBodyField}
                        initialContent={postData?.body}
                    />
                </div>

                <div>
                    <StyledLabel htmlFor="coverImage" className="block mb-2">
                        Cover Image
                    </StyledLabel>
                    <StyledInput
                        id="coverImage"
                        name="coverImage"
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
                    {isSubmitting ? `${buttonText.active}...` : `${buttonText.default} Post`}
                </StyledSubmitButton>
            </StyledForm>
        </div>
    );
};

export default AddPostModal;