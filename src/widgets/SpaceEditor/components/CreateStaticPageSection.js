import React from 'react';
import { StyledInput, StyledLabel, StyledTextArea } from '../styles'

const CreateStaticPageSection = ({ formData, onFormChange }) => {
    return (
        <>
            <div>
                <StyledLabel htmlFor="title" className="block mb-2">
                    Page Title
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
        </>
    );
};

export default CreateStaticPageSection; 