import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { StyledMessage } from '@/styles/rootStyles';
import { updatePage } from 'data/createContent.server';
import { useSpace } from '@/context/SpaceProvider';

const StyledDragContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1000;
    cursor: move;
`;

const DragIconToPosition = ({ 
    children,
    dragPosition,
    setDragPosition,
    size = { width: 60, height: 60 }, //default values
    containerRef,
    setDraggedIconPageId,
    pageData
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [initialOffset, setInitialOffset] = useState({ x: 0, y: 0 });
    
    const { setPages } = useSpace()

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!isDragging) return;

            const deltaX = e.clientX - dragStart.x;
            const deltaY = e.clientY - dragStart.y;

            // Convert pixel movement to percentage
            const newX = Math.max(0, Math.min(100, dragPosition.x + (deltaX / window.innerWidth) * 100));
            const newY = Math.max(0, Math.min(100, dragPosition.y + (deltaY / window.innerHeight) * 100));

            setDragPosition({ x: newX, y: newY });
            setDragStart({ x: e.clientX, y: e.clientY });
        };

        const handleMouseUp = () => {
            if (isDragging) {
                setIsDragging(false);
                handleSave()
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, dragStart, dragPosition, size]);

    const handleMouseDown = (e) => {
        // Calculate the offset between click position and icon position
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = ((e.clientX - rect.left) / rect.width) * 100;
        const offsetY = ((e.clientY - rect.top) / rect.height) * 100;
        
        setInitialOffset({ x: offsetX, y: offsetY });
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
    };

    const handleSave = async () => {
        // TODO Optimisation: If multiple icons are dragged and positioned at once then can we look into using an updateMany here instead
        // Update local state immediately
        setPages(prevPages => 
            prevPages.map(page => 
                page.id === pageData.id 
                    ? {
                        ...page,
                        themeConfig: {
                            ...page.themeConfig,
                            position: {
                                x: dragPosition.x,
                                y: dragPosition.y
                            }
                        }
                    }
                    : page
            )
        );

        try {
            const updatedPage = await updatePage(pageData.id, {
                ...pageData,
                themeConfig: {
                    ...pageData.themeConfig,
                    position: {
                        x: dragPosition.x,
                        y: dragPosition.y
                    }
                }
            });
            
            if (updatedPage?.id) {
                setMessage({ 
                    type: 'success', 
                    text: 'Page edited successfully!' 
                });
            }
        } catch (error) {
            // If save fails, revert the position
            setPages(prevPages => 
                prevPages.map(page => 
                    page.id === pageData.id ? pageData : page
                )
            );
            setMessage({ 
                type: 'error', 
                text: 'Failed to save position' 
            });
        }
        setDraggedIconPageId(null)
    }

    return (
        <StyledDragContainer 
            ref={containerRef}
            onMouseDown={handleMouseDown}
        >
            { children }
            {message.text && (
                <StyledMessage className={message.type}>
                    {message.text}
                </StyledMessage>
            )}
        </StyledDragContainer>
    );
};

export default DragIconToPosition; 