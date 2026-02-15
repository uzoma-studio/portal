import React, { useState, useRef } from 'react'

import { StyledGrid, StyledDisplayModeWrapper } from './styles'
import { StyledMessage } from '@/styles/rootStyles';

import RenderPages from '@/utils/renderPages';
import SinglePage from '@/content/singlePage'
import BackgroundContainer from '@/content/layout/BackgroundContainer'

import { useSpace } from '@/context/SpaceProvider';

import Icon from '@/content/displayModes/icon'
import Hotspot from '@/content/displayModes/hotspot'
import ImageDisplay from '@/content/displayModes/image'
import WindowDisplay from '@/content/displayModes/window'

import DragIconToPosition from '@/editor/components/DragIconToPosition'
import Toolbar from '@/editor/menus/Toolbar'
import ActionControls from '@/editor/menus/ActionControls'
import ElementControl from '@/editor/menus/ElementControl'
import ModalWrapper from '@/editor/modals/ModalWrapper';
import AddPageModal from '@/editor/modals/AddPageModal';
import EditSpaceModal from '@/editor/modals/EditSpaceModal'


import RenderSpaceImages from '@/content/renderers/RenderSpaceImages'
import RenderSpaceTexts from '@/content/renderers/RenderSpaceTexts'

import AuthButton from '@/widgets/Authentication/AuthButton';

import { updateEntry } from '@root/data/createContent.server';
import { handleMediaUpload } from '@/utils/helpers';

const Index = () => {
    const { space, pages, settings, isCurrentUserSpaceOwner, images: spaceImages, setImages, texts: spaceTexts, setTexts } = useSpace()

    const containerRef = useRef(null)

    const theme = settings?.theme
    const environment = theme?.style?.environment
    const showEnvironment = theme?.style?.showEnvironment
    const showFooter = theme?.style?.menu?.showFooter

    const [currentPageId, setCurrentPageId] = useState(null)
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 })
    const [draggedIconPageId, setDraggedIconPageId] = useState(null)
    
    const [isBuildMode, setIsBuildMode] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [pageCoords, setPageCoords] = useState(null)
    const [showEditSpaceModal, setShowEditSpaceModal] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const [currentEditImageId, setCurrentEditImageId] = useState(null)
    const [currentEditTextId, setCurrentEditTextId] = useState(null)
    const [message, setMessage] = useState({ type: '', text: '' });
    const [selectedElementPosition, setSelectedElementPosition] = useState(null)
    // const [showImageDialogModal, setShowImageDialogModal] = useState(false)

    const [backgroundDimensions, setBackgroundDimensions] = useState({ width: 0, height: 0 });

    const currentPage = pages.find(p => p.id === currentPageId)

    const getDisplayMode = (pageData) => {
        const getDisplayModePosition = isBuildMode && draggedIconPageId === pageData.id ? dragPosition : pageData.themeConfig.position
        const pageConfig = {
            ...pageData.themeConfig,
            position: getDisplayModePosition
        }
        
        const displayModes = {
            icon: <Icon pageData={pageData} pageConfig={pageConfig} />,
            hotspot: <Hotspot pageData={pageData} pageConfig={pageConfig} spaceTheme={theme} />,
            image: <ImageDisplay pageData={pageData} pageConfig={pageConfig} />,
            window: <WindowDisplay pageData={pageData} pageConfig={pageConfig} spaceTheme={theme} />
        }

        //use the display mode set in the page theme
        return displayModes[pageData.themeConfig.displayMode]
    }
    
    const openAddPageModal = (currentTarget, clientX, clientY) => {
        
        setIsModalOpen(true)
            
        // Calculate the coordinates of the to-be-created page display
        const rect = currentTarget.getBoundingClientRect();
        
        const x = clientX - rect.left;
        const y = clientY - rect.top;
        
        const xPercent = (x / rect.width) * 100;
        const yPercent = (y / rect.height) * 100;
        setPageCoords({ x: xPercent, y: yPercent})
    }

    const saveSpaceEdits = async () => {
        setIsSaving(true);
        try {
            // Start with existing non-preview images
            const updatedImages = spaceImages.filter(img => !img.isPreview);
            
            // Process edited images
            for (const image of spaceImages) {
                if (image.isEdited) {
                    if (image.isPreview) {
                        try {
                            const imageUpload = await handleMediaUpload(image.file);
                            
                            if (imageUpload) {
                                updatedImages.push({
                                    image: imageUpload,
                                    size: image.size,
                                    position: image.position,
                                    linkToPage: image.linkToPage
                                });
                            } else {
                                setMessage({ type: 'error', text: `Failed to upload ${image.file.name}` });
                                return;
                            }
                        } catch (error) {
                            console.error('Error uploading image:', error);
                            setMessage({ type: 'error', text: `Error uploading ${image.file.name}: ${error.message}` });
                            return;
                        }
                    } else {
                        // Update existing image properties
                        const idx = updatedImages.findIndex(existing => existing.id === image.id);
                        if (idx !== -1) {
                            updatedImages[idx] = {
                                ...updatedImages[idx],
                                size: image.size,
                                position: image.position,
                                linkToPage: image.linkToPage
                            };
                        }
                    }
                }
            }

            // Process edited texts
            const updatedTexts = spaceTexts.map(text => {
                if (text.isEdited) {
                    return {
                        ...text,
                        isEdited: false
                    };
                }
                return text;
            });

            const spaceData = {
                ...space,
                images: updatedImages,
                texts: updatedTexts
            };
            
            const updatedSpace = await updateEntry('spaces', space.id, spaceData);
            
            if (updatedSpace?.id) {
                setMessage({ type: 'success', text: 'Space edited successfully!' });
            } else {
                setMessage({ type: 'error', text: 'Failed to edit space. Please try again' });
            }
            
            setIsSaving(false);
            setTimeout(() => {
                setMessage({ type: '', text: '' });
            }, 1500);

            setIsBuildMode(false);
        } catch (error) {
            setIsSaving(false);
            console.error('Error in saveSpaceEdits:', error);
            setMessage({ type: 'error', text: `Error saving space: ${error.message}` });
        }
    }

    return (
        <BackgroundContainer 
            isBuildMode={isBuildMode}
            setIsBuildMode={setIsBuildMode}
            currentEditImageId={currentEditImageId}
            setCurrentEditImageId={setCurrentEditImageId}
            currentEditTextId={currentEditTextId}
            setCurrentEditTextId={setCurrentEditTextId}
            openAddPageModal={openAddPageModal}
            backgroundDimensions={backgroundDimensions}
            setBackgroundDimensions={setBackgroundDimensions}
        >

            {
                isCurrentUserSpaceOwner ?
                    <ActionControls 
                        isBuildMode={isBuildMode} 
                        setIsBuildMode={setIsBuildMode} 
                        setShowEditSpaceModal={setShowEditSpaceModal}
                        saveSpaceEdits={saveSpaceEdits}
                        isSaving={isSaving}
                    />
                    :
                    // TODO: Only show button when space is not in publish mode - reference mmm.page
                    <div className='absolute' style={{top: '1rem', right: '2rem'}}>
                        <AuthButton />
                    </div>
            }


            {/* Render Pages in their display modes TODO: Move to RenderPages component */}
            {
                theme && pages.map((pageData) => {
                    if(pageData.themeConfig.displayMode === 'none'){
                        return 
                    } else {
                        return <StyledDisplayModeWrapper 
                            key={pageData.id} 
                            onClick={() => {
                                if (!isBuildMode) {
                                    setCurrentPageId(pageData.id);
                                } else {
                                    // TODO: Currently need to click first to be able to then drag but drag should be possible once I click the icon/hotspot etc
                                    setDraggedIconPageId(pageData.id)
                                    setDragPosition(pageData.themeConfig.position || { x: 0, y: 0 });
                                }
                            }}
                            style={{cursor: isBuildMode ? 'move' : 'pointer'}}
                        >
                            { isBuildMode && draggedIconPageId === pageData.id ? 
                                <DragIconToPosition
                                    containerRef={containerRef}
                                    showGrid={true}
                                    pageData={pageData}
                                    dragPosition={dragPosition}
                                    setDragPosition={setDragPosition}
                                    setDraggedIconPageId={setDraggedIconPageId}
                                >
                                    {getDisplayMode(pageData)}
                                </DragIconToPosition>
                                :
                                getDisplayMode(pageData)
                            }
                        </StyledDisplayModeWrapper>
                    }
                })
            }
            {/* Render Images */}
            <RenderSpaceImages 
                isBuildMode={isBuildMode}
                setCurrentEditImageId={setCurrentEditImageId}
                currentEditImageId={currentEditImageId}
                backgroundDimensions={backgroundDimensions}
                setSelectedElementPosition={setSelectedElementPosition}
                setCurrentPageId={setCurrentPageId}
            />
            {/* Render Text */}
            <RenderSpaceTexts 
                isBuildMode={isBuildMode}
                setCurrentEditTextId={setCurrentEditTextId}
                currentEditTextId={currentEditTextId}
                backgroundDimensions={backgroundDimensions}
                setSelectedElementPosition={setSelectedElementPosition}
                setCurrentPageId={setCurrentPageId}
            />

            {/* Render Currently Opened Page */}
            {
                currentPage && 
                    <RenderPages>
                        <SinglePage
                            pageData={currentPage}
                            pageConfig={currentPage.themeConfig}
                            spaceTheme={theme}
                            showPage={currentPage}
                            setShowPage={setCurrentPageId}
                        />
                    </RenderPages>
            }

            {/* Render Build Mode */}
            { isBuildMode && isCurrentUserSpaceOwner &&
                <>
                    { isModalOpen && 
                        <ModalWrapper tabName={'Add Page'} modalCloseFn={() => setIsModalOpen(false)}>
                            <AddPageModal
                                setIsModalOpen={setIsModalOpen} 
                                isCreatePageMode={true}  
                                pageCoords={pageCoords}
                            />
                        </ModalWrapper>
                    }
                    <ElementControl
                        selectedImageId={currentEditImageId}
                        selectedTextId={currentEditTextId}
                        elementPosition={selectedElementPosition}
                        backgroundDimensions={backgroundDimensions}
                        setCurrentPageId={setCurrentPageId}
                        setCurrentEditImageId={setCurrentEditImageId}
                        setCurrentEditTextId={setCurrentEditTextId}
                        setMessage={setMessage}
                    />

                    <Toolbar backgroundDimensions={backgroundDimensions} />
                    {message.text && (
                        <StyledMessage className={message.type}>{message.text}</StyledMessage>
                    )}
                    { showEditSpaceModal && <EditSpaceModal modalCloseFn={() => setShowEditSpaceModal(false)} />}
                    <StyledGrid />
                </>
            }
        </BackgroundContainer>
    )
}

export default Index