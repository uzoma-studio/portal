import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

import { StyledBackgroundContainer, StyledGrid, StyledDisplayModeWrapper } from '../styles'

import RenderPages from '@/utils/renderPages';
import SinglePage from './single'
import { useSpace } from '@/context/SpaceProvider';

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Environment from './environment'

import Icon from '../../displayModes/icon'
import DragIconToPosition from '@/widgets/SpaceEditor/components/DragIconToPosition'

import BuildMode from '@/widgets/SpaceEditor'

const Index = () => {
    const { pages, settings } = useSpace()
    const containerRef = useRef(null)
    
    const config = settings.theme
    const backgroundImage = settings.backgroundImage
    const imageRenderMode = config.style?.backgroundImageRenderMode || 'center'
    const environment = config.style?.environment || 'park'

    const [currentPageId, setCurrentPageId] = useState(null)
    const [isPositioning, setIsPositioning] = useState(false)
    const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 })
    const [draggedIconPageId, setDraggedIconPageId] = useState(null)
    
    const [isBuildMode, setIsBuildMode] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [pageCoords, setPageCoords] = useState(null)

    const currentPage = pages.find(p => p.id === currentPageId)

    const getDisplayMode = (pageData) => {
        const displayModes = {
            icon: <Icon page={pageData} pageConfig={{
                ...pageData.themeConfig,
                position: isPositioning && draggedIconPageId === pageData.id ? dragPosition : pageData.themeConfig.position
            }}/>
        }

        //use the display mode set in the page config
        return displayModes[pageData.themeConfig.displayMode]
    }

    const clickTimeout = useRef(null);
    
    const openAddPageModal = (currentTarget, clientX, clientY) => {
        
        if(isBuildMode){
            
            setIsModalOpen(true)
            
            // Calculate the coordinates of the to-be-created page display mode
            const rect = currentTarget.getBoundingClientRect();
            
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;
            setPageCoords({ x: xPercent, y: yPercent})
        }
    }

    const handleClick = (e) => {
        // Always clear any previous timer before setting a new one
        clearTimeout(clickTimeout.current);
        // Start a timer for single click
        const currentTarget = e.currentTarget
        const clientX = e.clientX
        const clientY = e.clientY

        clickTimeout.current = setTimeout(() => {
            openAddPageModal(currentTarget, clientX, clientY);
        }, 250);
    };
      
    const handleDoubleClick = () => {
        // If double click, prevent single click action
        clearTimeout(clickTimeout.current);
        setIsBuildMode(!isBuildMode)
    };

    return (
        <>
            <Environment environment={environment} />
            <Header />
            <StyledBackgroundContainer $settings={config} ref={containerRef}>
                { backgroundImage && config.style.backgroundMode === 'image' ?
                    imageRenderMode === 'background' ? (
                        <Image 
                            src={settings.backgroundImage.url}
                            layout="fill"
                            objectFit="cover"
                            quality={100}
                            alt={settings.backgroundImage?.alt}
                            onClick={(e) => handleClick(e)}
                            onDoubleClick={() => handleDoubleClick()}
                        />
                    ) : (
                        <div className="fixed inset-0 flex items-center justify-center">
                            <Image 
                                src={settings.backgroundImage.url}
                                width={1200}
                                height={800}
                                style={{
                                    objectFit: 'contain',
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)'
                                }}
                                className="md:w-[70%] lg:w-[60%] xl:w-[50%]"
                                quality={100}
                                alt={settings.backgroundImage?.alt}
                                onClick={(e) => handleClick(e)}
                                onDoubleClick={handleDoubleClick}
                            />
                        </div>
                    )
                    :
                    <div className='background' />
                }
                {
                    config && pages.map((pageData) =>
                        <StyledDisplayModeWrapper 
                            key={pageData.id} 
                            onClick={() => {
                                if (!isPositioning) {
                                    setCurrentPageId(pageData.id);
                                } else {
                                    setDraggedIconPageId(pageData.id)
                                    setDragPosition(pageData.themeConfig.position || { x: 0, y: 0 });
                                    setIsPositioning(true);
                                }
                            }}
                        >
                            { isPositioning && draggedIconPageId === pageData.id ? 
                                <DragIconToPosition
                                    containerRef={containerRef}
                                    showGrid={true}
                                    pageData={pageData}
                                    setIsPositioning={setIsPositioning}
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
                    currentPage && 
                        <RenderPages>
                            <SinglePage
                                pageData={currentPage}
                                pageConfig={currentPage.themeConfig}
                                pageDisplayStyle='center-modal'
                                showPage={currentPage}
                                setShowPage={setCurrentPageId}
                            />
                        </RenderPages>
                }
                { isBuildMode && 
                    <>
                        { isModalOpen && 
                                <BuildMode 
                                    isCreatePageMode={true}
                                    isModalOpen={isModalOpen}
                                    setIsModalOpen={setIsModalOpen} 
                                    pageCoords={pageCoords} 
                                />
                        }
                        <StyledGrid />
                    </>
                }
                <Footer />
            </StyledBackgroundContainer>
        </>
    )
}

export default Index