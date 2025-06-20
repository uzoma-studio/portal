import React from 'react';
import { StyledInput, StyledLabel, StyledTextArea } from '../AddPageModal'

const CreateBlogModal = ({ formData, onFormChange }) => {
    return (
        <>
            <div>
                <StyledLabel htmlFor="blogTitle" className="block mb-2">
                    Blog Title
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
                <StyledLabel htmlFor="blogDescription" className="block mb-2">
                    Blog Description
                </StyledLabel>
                <StyledTextArea
                    id="blogDescription"
                    name="blogDescription"
                    value={formData.blogDescription}
                    onChange={onFormChange}
                    className="w-full px-3 py-2 rounded"
                    rows={4}
                />
            </div>
        </>
    );
};

export default CreateBlogModal; 