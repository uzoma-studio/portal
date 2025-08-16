import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Rnd } from 'react-rnd';

import { StyledBackgroundContainer, StyledGrid, StyledDisplayModeWrapper, StyledImagePreview, StyledSaveButton, StyledSpaceImage } from '../styles'

import RenderPages from '@/utils/renderPages';
import SinglePage from './single'
import { useSpace } from '@/context/SpaceProvider';

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Environment from './environment'

import Icon from '../../displayModes/icon'
import Hotspot from '../../displayModes/hotspot'
import ImageDisplay from '../../displayModes/image'
import WindowDisplay from '../../displayModes/window'
import DragIconToPosition from '@/widgets/SpaceEditor/components/DragIconToPosition'

import Toolbar from '@/widgets/SpaceEditor/Toolbar'
import ModalWrapper from '@/widgets/SpaceEditor/modals/ModalWrapper';
import AddPageModal from '@/widgets/SpaceEditor/modals/AddPageModal';

import { updateEntry } from '../../../data/createContent.server';
import { handleMediaUpload } from '@/utils/helpers';
import { StyledMessage } from '@/styles/rootStyles';

const Index = () => {
    const { space, pages, settings, isCurrentUserSpaceOwner, images: spaceImages } = useSpace()

    const containerRef = useRef(null)
    
    const backgroundImage = settings?.backgroundImage

    const theme = settings?.theme
    const imageRenderMode = theme?.style?.backgroundImageRenderMode
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

    const clickTimeout = useRef(null);
    
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

    const handleClick = async (e) => {

        if(isBuildMode){

            // Exit image edit mode when background is clicked
            if(currentEditImageId) {
                setCurrentEditImageId(null)
                return
            }

            // Always clear any previous timer before setting a new one
            clearTimeout(clickTimeout.current);
            // Start a timer for single click
            const currentTarget = e.currentTarget
            const clientX = e.clientX
            const clientY = e.clientY

            clickTimeout.current = setTimeout(() => {
                openAddPageModal(currentTarget, clientX, clientY);
            }, 250);
        }

        
    };
      
    const handleDoubleClick = () => {
        // If double click, prevent single click action
        clearTimeout(clickTimeout.current);
        setIsBuildMode(!isBuildMode)
    };

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
            { showEnvironment && <Environment environment={environment} /> }
            <Header isBuildMode={isBuildMode} setIsBuildMode={setIsBuildMode} />
            {/* TODO: Move background code to its own component */}
            <StyledBackgroundContainer $settings={theme}>
                { backgroundImage && theme.style.backgroundMode === 'image' ?
                    imageRenderMode === 'background' ? (
                        <Image 
                            src={backgroundImage.url}
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                            style={{cursor: isBuildMode ? 'crosshair' : 'auto'}}
                            alt={backgroundImage?.alt}
                            onClick={(e) => isCurrentUserSpaceOwner && handleClick(e)}
                            onDoubleClick={() => isCurrentUserSpaceOwner && handleDoubleClick()}
                        />
                    ) : (
                        <div className="fixed inset-0 flex items-center justify-center">
                            <Image 
                                src={backgroundImage.url}
                                width={1200}
                                height={800}
                                style={{
                                    objectFit: 'contain',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    cursor: isBuildMode ? 'crosshair' : 'auto'
                                }}
                                className="md:w-[70%] lg:w-[60%] xl:w-[50%]"
                                quality={100}
                                alt={backgroundImage?.alt}
                                onClick={(e) => isCurrentUserSpaceOwner && handleClick(e)}
                                onDoubleClick={() => isCurrentUserSpaceOwner && handleDoubleClick()}
                            />
                        </div>
                    )
                    :
                    <div className='background'
                        style={{cursor: isBuildMode ? 'crosshair' : 'auto'}}
                        onClick={(e) => isCurrentUserSpaceOwner && handleClick(e)}
                        onDoubleClick={() => isCurrentUserSpaceOwner && handleDoubleClick()}
                    />
                }

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
                    spaceImages && spaceImages.map(({ id, image, position, size, linkToPage }, index) => {
                        return <Rnd
                                    key={id}
                                    default={{
                                        x: position.x,
                                        y: position.y,
                                        width: size.width,
                                        height: size.height,
                                    }}
                                    maxWidth={size.width}
                                    maxHeight={size.height}
                                    onClick={() => { isBuildMode && setCurrentEditImageId(id) }}
                                    onResizeStop={(e, direction, ref, delta) => {
                                        // Save the new size dimensions of the preview image
                                        const image = spaceImages[index]
                                        image.size.width = Number(ref.style.width.split('px')[0])
                                        image.size.height = Number(ref.style.height.split('px')[0])
                                        image.isEdited = true
                                    }}
                                    onDragStop={(e, direction) => {
                                        const image = spaceImages[index]
                                        image.position.x = direction.x
                                        image.position.y = direction.y
                                        image.isEdited = true
                                    }}
                                    disableDragging={!isBuildMode || !isCurrentUserSpaceOwner}
                                    enableResizing={isBuildMode && isCurrentUserSpaceOwner}
                                    className={isBuildMode && currentEditImageId === id ? 'active-edit-image' : ''}
                                >
                                    <StyledSpaceImage
                                        $zIndex={index+1}
                                        $hasLink={!!linkToPage}
                                        $currentEditImage={currentEditImageId === id}
                                        onClick={() => {linkToPage && setCurrentPageId(linkToPage.id)}}
                                        onDragStart={(e) => e.preventDefault()}
                                    >
                                        <Image
                                            src={image.url} 
                                            alt={image.alt || `space image ${image.filename}`}
                                            width={size.width}
                                            height={size.height}
                                            draggable={false}
                                        />
                                    </StyledSpaceImage>
                                </Rnd>
                    })
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
            </StyledBackgroundContainer>
            {showFooter && <Footer /> }
        </>
    )
}

export default Index