import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

import { StyledBackgroundContainer, StyledGrid, StyledDisplayModeWrapper, StyledImagePreview } from '../styles'

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

const Index = () => {
    const { pages, settings, isCurrentUserSpaceOwner } = useSpace()
    
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

    const [previewImageUrls, setPreviewImageUrls] = useState([])

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

    const handleClick = (e) => {

        if(isBuildMode){
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

    const updatePreviewImageUrls = (url) => {
        setPreviewImageUrls([...previewImageUrls, url])
    }
    
    return (
        <>
            { showEnvironment && <Environment environment={environment} /> }
            <Header isBuildMode={isBuildMode} setIsBuildMode={setIsBuildMode} />
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

                {/* Render Pages */}
                {
                    theme && pages.map((pageData) =>
                        <StyledDisplayModeWrapper 
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
                    )
                }
                { 
                    previewImageUrls && previewImageUrls.map((url) =>  
                        <StyledImagePreview>
                            <img src={url} alt='preview image' /> 
                        </StyledImagePreview>
                        /* TODO: Add proper image alt */ 
                )}
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
                        <StyledGrid />
                    </>
                }
                {
                    isCurrentUserSpaceOwner && 
                        <Toolbar updatePreviewImageUrls={updatePreviewImageUrls}/>
                }
            </StyledBackgroundContainer>
            {showFooter && <Footer /> }
        </>
    )
}

export default Index