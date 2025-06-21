import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { createEntry, updatePage } from '../../../../data/createContent.server'
import { useSpace } from '@/context/SpaceProvider';
import { generateSlug } from '@/utils/helpers';
import RichTextEditor from '../RichTextEditor'
import themeSettings from '../../../../themeSettings.json';
import { StyledMessage } from '@/styles/rootStyles';

import CreateBlogSection from '../components/CreateBlogSection';
import CreateStaticPageSection from '../components/CreateStaticPageSection'
import CreateChatbotSection from '../components/CreateChatbotSection'
import defaultBotNodes from '../components/defaultBotNodes.json';

import { handleServerResponse } from '@/utils/helpers';

import {
    StyledForm,
    StyledLabel,
    StyledInput,
    StyledSelect,
    StyledSubmitButton,
    StyledNumberInput,
    StyledSettingsGrid,
    StyledSettingsSection,
    StyledColorInput,
    StyledColorLabel,
    StyledColorPreview,
    StyledToggle
} from '../styles';

const AddPageModal = ({ setIsModalOpen, isCreatePageMode, pageData, pageCoords }) => {
    const { space, settings, setPages } = useSpace()

    const [pageBodyField, setPageBodyField] = useState(null)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState({ type: '', text: '' })
    const [showSettings, setShowSettings] = useState(false)

    const buttonText = isCreatePageMode ? { default: 'Create', active: 'Creating'} : { default: 'Edit', active: 'Editing'}

    const [formData, setFormData] = useState({
        title: pageData?.title || '',
        contentType: pageData?.contentType || '',
        body: pageData?.body || null,
        space,
        updates: pageData?.updates || null,
        blogTitle: pageData?.title || '',
        blogDescription: pageData?.update?.description || '',
        chatbot: pageData?.chatbot || null,
        botNodes: pageData?.chatbot?.nodes || JSON.stringify(defaultBotNodes, null, 2),
        // avatar: pageData?.chatbot?.avatar || null,
        themeConfig: {
            position: pageData?.themeConfig?.position || {
                x: Math.floor(pageCoords?.x) || 50,
                y: Math.floor(pageCoords?.y) || 50
            },
            size: pageData?.themeConfig?.size || {
                width: 600,
                height: 500
            },
            displayMode: pageData?.themeConfig?.displayMode || settings?.theme?.style?.defaultPageDisplayMode,
            hotspotName: pageData?.themeConfig?.hotspotName || '',
            style: {
                ...themeSettings.style.defaultPageStyles,
                ...pageData?.themeConfig?.style,
                backgroundImage: pageData?.themeConfig?.style?.backgroundImage || null
            }
        }
    });

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            body: pageBodyField
        }));
    }, [pageBodyField]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleThemeConfigChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            themeConfig: {
                ...prev.themeConfig,
                // set up to handle nested {position: {x: '', y: ''} and direct {displayMode: "icon"} fields
                [section]: field ? {
                    ...prev.themeConfig[section],
                    [field]: value
                } : value
            }
        }));
    };

    const handleClose = () => {
        setIsModalOpen(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ type: '', text: '' });
        
        if(isCreatePageMode){
            try {
                const slug = generateSlug(formData.title);
                let pageData = {
                    ...formData,
                    slug
                };

                // If content type is blog, create an update first
                if (formData.contentType === 'blog') {
                    const update = await createEntry('updates', {
                        title: formData.title,
                        description: formData.blogDescription,
                    });

                    if (!update) {
                        throw new Error('Failed to create blog');
                    }

                    // Link the page to the update
                    pageData.updates = update.id;

                } else if (formData.contentType === 'chatbot') {
                    const chatbot = await createEntry('chatbot', {
                        spaceId: String(formData.space.id),
                        name: formData.title,
                        nodes: formData.botNodes,
                        // avatar: formData.avatar
                    })

                    if (!chatbot) {
                        throw new Error('Failed to create chatbot');
                    }

                    pageData.chatbot = chatbot.id
                }

                const createdPage = await createEntry('pages', pageData);

                const { type, message } = handleServerResponse(createdPage, 'Page', 'created')
                
                if (type === 'success') {
                    setPages(prevPages => [...prevPages, createdPage]);

                    setMessage({ type, text: message });
                        setTimeout(() => {
                            handleClose();
                    }, 1500);
                } else {
                    setMessage({ type, text: message });
                }
            } catch (error) {
                console.error('Error creating page:', error);
                setMessage({ 
                    type: 'error', 
                    text: error.message || 'An error occurred while creating the page.' 
                });
            } 
        } else {
            try {
                const updatedPage = await updatePage(pageData.id, formData);

                const { type, message } = handleServerResponse(updatedPage, 'Page', 'edited')
                
                if (type === 'success') {
                    setPages(prevPages => 
                        prevPages.map(page => 
                          page.id === updatedPage.id ? updatedPage : page
                        )
                    );

                    setMessage({ 
                        type, 
                        text: message
                    });
                    setTimeout(() => {
                        handleClose();
                    }, 1500);
                } else {
                    setMessage({ 
                        type, 
                        text: message
                    });
                }
            } catch (error) {
                console.error('Error editing page:', error);
                setMessage({ 
                    type: 'error', 
                    text: error.message || 'An error occurred while editing the page.' 
                });
            } 
        }
        
        setIsSubmitting(false);
    };

    return (
       <div className="mt-4">
            <StyledForm onSubmit={handleSubmit}>         

                { isCreatePageMode && (
                    <div>
                        <StyledLabel htmlFor="contentType" className="block mb-2">
                            Content Type
                        </StyledLabel>
                        <StyledSelect
                            id="contentType"
                            name="contentType"
                            value={formData.contentType}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 rounded"
                        >
                            <option value="">Select a content type</option>
                            <option value="page">Page</option>
                            <option value="blog">Blog</option>
                            <option value="files">Files</option>
                            <option value="chatbot">Chatbot</option>
                            <option value="chat-messages">Chat</option>
                            <option value="products">Shop</option>
                        </StyledSelect>
                    </div>
                )}

                { formData.contentType === 'blog' && (
                    <CreateBlogSection
                        formData={formData}
                        onFormChange={handleInputChange}
                    />
                )}

                { (formData.contentType === 'page' || formData.contentType === 'chat-messages') &&
                    <>
                        <CreateStaticPageSection
                            formData={formData}
                            onFormChange={handleInputChange}
                        />

                    <div>
                        <StyledLabel htmlFor="body" className="block mb-2">
                            Page Content
                        </StyledLabel>
                        <RichTextEditor 
                            name="body" 
                            setPageBodyField={setPageBodyField} 
                            initialContent={pageData?.body}
                        />
                    </div>
                    </>
                }

                { formData.contentType === 'chatbot' && (
                    <CreateChatbotSection
                        formData={formData}
                        onFormChange={handleInputChange}
                    />
                )}

                
                <StyledSettingsSection>
                    <StyledToggle
                        style={{ background: 'rgba(184, 186, 188, 0.1)', cursor: 'pointer', borderColor: '#ddd', textAlign: 'left' }}
                        onClick={() => setShowSettings(!showSettings)}
                    >
                        <StyledLabel>
                            Page Settings <span className='text-sm'>{`[`}Advanced{`]`}</span> {!showSettings ? `>` : `v`}
                        </StyledLabel>
                    </StyledToggle>
                    
                    { showSettings &&
                        <>
                            <div className="mt-4 mb-4">
                                <StyledLabel className="block mb-2">
                                    Display Mode
                                </StyledLabel>
                                <StyledSelect
                                    value={formData.themeConfig.displayMode}
                                    onChange={(e) => handleThemeConfigChange('displayMode', null, e.target.value)}
                                    className="w-full"
                                >
                                    <option value="icon">Icon</option>
                                    <option value="hotspot">Hotspot</option>
                                    <option value="list">List</option>
                                    <option value="island">Island</option>
                                    <option value="windows">Window</option>
                                </StyledSelect>
                            </div>

                            <div className="mb-4">
                                <StyledLabel className="block mb-2">
                                    Page Position
                                </StyledLabel>
                                <StyledSettingsGrid>
                                    <div>
                                        <StyledLabel className="block text-sm mb-1">
                                            X Position (0-100)
                                        </StyledLabel>
                                        <StyledNumberInput
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={formData.themeConfig.position.x || 0}
                                            onChange={(e) => handleThemeConfigChange('position', 'x', parseInt(e.target.value) || 0)}
                                        />
                                    </div>
                                    <div>
                                        <StyledLabel className="block text-sm mb-1">
                                            Y Position (0-100)
                                        </StyledLabel>
                                        <StyledNumberInput
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={formData.themeConfig.position.y || 0}
                                            onChange={(e) => handleThemeConfigChange('position', 'y', parseInt(e.target.value) || 0)}
                                        />
                                    </div>
                                </StyledSettingsGrid>
                            </div>

                            <div className="mb-4">
                                <StyledLabel className="block mb-2">
                                    Page Size
                                </StyledLabel>
                                <StyledSettingsGrid>
                                    <div>
                                        <StyledLabel className="block text-sm mb-1">
                                            Width (px)
                                        </StyledLabel>
                                        <StyledNumberInput
                                            type="number"
                                            min="100"
                                            value={formData.themeConfig.size.width || 600}
                                            onChange={(e) => handleThemeConfigChange('size', 'width', parseInt(e.target.value) || 600)}
                                        />
                                    </div>
                                    <div>
                                        <StyledLabel className="block text-sm mb-1">
                                            Height (px)
                                        </StyledLabel>
                                        <StyledNumberInput
                                            type="number"
                                            min="100"
                                            value={formData.themeConfig.size.height || 500}
                                            onChange={(e) => handleThemeConfigChange('size', 'height', parseInt(e.target.value) || 500)}
                                        />
                                    </div>
                                </StyledSettingsGrid>
                            </div>

                            <div className="mb-4">
                                <StyledLabel className="block mb-2">
                                    Page Colors
                                </StyledLabel>
                                <StyledSettingsGrid>
                                    <div>
                                        <StyledColorLabel>
                                            <StyledColorPreview style={{ backgroundColor: formData.themeConfig.style.backgroundColor }} />
                                            <StyledLabel className="block text-sm">
                                                Background Color
                                            </StyledLabel>
                                        </StyledColorLabel>
                                        <StyledColorInput
                                            type="color"
                                            value={formData.themeConfig.style.backgroundColor}
                                            onChange={(e) => handleThemeConfigChange('style', 'backgroundColor', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <StyledColorLabel>
                                            <StyledColorPreview style={{ backgroundColor: formData.themeConfig.style.textColor }} />
                                            <StyledLabel className="block text-sm">
                                                Text Color
                                            </StyledLabel>
                                        </StyledColorLabel>
                                        <StyledColorInput
                                            type="color"
                                            value={formData.themeConfig.style.textColor}
                                            onChange={(e) => handleThemeConfigChange('style', 'textColor', e.target.value)}
                                        />
                                    </div>
                                </StyledSettingsGrid>
                            </div>

                            {formData.themeConfig.displayMode === 'hotspot' && (
                                <div className="mb-4">
                                    <StyledLabel className="block mb-2">
                                        Hotspot Name
                                    </StyledLabel>
                                    <StyledInput
                                        type="text"
                                        value={formData.themeConfig.hotspotName}
                                        onChange={(e) => handleThemeConfigChange('hotspotName', null, e.target.value)}
                                        className="w-full"
                                        placeholder="Enter hotspot name"
                                    />
                                </div>
                            )}
                        </>
                    }
                </StyledSettingsSection>

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
                    {isSubmitting ? `${buttonText.active}...` : `${buttonText.default} Page`}
                </StyledSubmitButton>
            </StyledForm>
        </div>
    );
};

export default AddPageModal;