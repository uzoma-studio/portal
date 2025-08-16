import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

import { StyledGrid, StyledDisplayModeWrapper, StyledSaveButton } from './styles'

import RenderPages from '@/utils/renderPages';
import SinglePage from '@/content/singlePage'
import BackgroundContainer from '@/content/layout/BackgroundContainer'
import { useSpace } from '@/context/SpaceProvider';

import Icon from '@/content/displayModes/icon'
import Hotspot from '@/content/displayModes/hotspot'
import ImageDisplay from '@/content/displayModes/image'
import WindowDisplay from '@/content/displayModes/window'

import DragIconToPosition from '@/editor/components/DragIconToPosition'
import Toolbar from '@/editor/Toolbar'
import ModalWrapper from '@/editor/modals/ModalWrapper';
import AddPageModal from '@/editor/modals/AddPageModal';

import ImageBlock from '@/content/blocks/ImageBlock'

import { updateEntry } from '@root/data/createContent.server';
import { handleMediaUpload } from '@/utils/helpers';
import { StyledMessage } from '@/styles/rootStyles';

const Index = () => {
    const { space, pages, settings, images: spaceImages } = useSpace()

    const containerRef = useRef(null)

    const theme = settings?.theme
    const environment = theme?.style?.environment
    const showEnvironment = theme?.style?.showEnvironment
    const showFooter = theme?.style?.menu?.showFooter

    const [currentPageId, setCurrentPageId] = useState(null)
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 })
    const [draggedIconPageId, setDraggedIconPageId] = useState(null)
    
    const [isBuildMode, setIsBuildMode] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [pageCoords, setPageCoords] = useState(null)

    const [currentEditImageId, setCurrentEditImageId] = useState(null)
    const [message, setMessage] = useState({ type: '', text: '' });
    // const [showImageDialogModal, setShowImageDialogModal] = useState(false)

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
        // Save images
        const updatedImages = [...space.images]
        
        for (const image of spaceImages) {

            if (image.isEdited) {

                if (image.isPreview) {
                    const imageUpload = await handleMediaUpload(image.file);
          
                    updatedImages.push({
                        id: image.id,
                        image: imageUpload,
                        size: image.size,
                        position: image.position
                    });
                } else {
                    const idx = updatedImages.findIndex(existing => existing.id === image.id);
                    if (idx !== -1) {
                        updatedImages[idx] = {
                            ...updatedImages[idx],
                            size: image.size,
                            position: image.position
                        };
                    }
                }

                image.isEdited = false
            }
        }

        const spaceData = {
            ...space,
            images: updatedImages
        };
        
        const updatedSpace = await updateEntry('spaces', space.id, spaceData);
        
        if (updatedSpace?.id) {
            setMessage({ type: 'success', text: 'Space edited successfully!' });
        } else {
            setMessage({ type: 'error', text: 'Failed to edit space. Please try again' });
        }
        
        setTimeout(() => {
            setMessage({ type: '', text: '' });
        }, 1500);

        setIsBuildMode(false)
    }

    return (
        <>
            {/* TODO: Move background code to its own component */}
            <BackgroundContainer 
                isBuildMode={isBuildMode}
                setIsBuildMode={setIsBuildMode}
                currentEditImageId={currentEditImageId}
                setCurrentEditImageId={setCurrentEditImageId}
                openAddPageModal={openAddPageModal}
            >

                {/* Render Pages in their display modes */}
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
                {
                    spaceImages && spaceImages.map(({ id, image, position, size, linkToPage }, index) => 
                        <ImageBlock
                            key={id}
                            id={id}
                            image={image}
                            position={position}
                            size={size}
                            linkToPage={linkToPage}
                            index={index}
                            isBuildMode={isBuildMode}
                            isCurrentEditImage={currentEditImageId === id}
                        />
                    )
                }
                {/* {
                    showImageDialogModal && 
                        <div>
                            <button onClick={() => setIsMoveImage(true)}>Move</button>
                            <button onClick={() => }>Link</button>
                        </div>
                } */}
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
                {/* Render Build Mode settings */}
                { isBuildMode && 
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
                        <Toolbar />
                        <StyledSaveButton onClick={() => saveSpaceEdits()}>Save</StyledSaveButton>
                        {message.text && (
                            <StyledMessage className={message.type}>{message.text}</StyledMessage>
                        )}
                        <StyledGrid />
                    </>
                }
            </BackgroundContainer>
        </>
    )
}

export default Index