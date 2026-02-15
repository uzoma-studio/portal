import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { MdEdit, MdDelete, MdLink } from 'react-icons/md'
import { useSpace } from '@/context/SpaceProvider'
import ModalWrapper from '@/editor/modals/ModalWrapper'
import AddTextModal from '@/editor/modals/AddTextModal'
import LinkModal from '@/editor/modals/LinkModal'

const ElementControl = ({ 
    selectedImageId, 
    selectedTextId,
    elementPosition,
    backgroundDimensions,
    setCurrentPageId,
    setCurrentEditImageId,
    setCurrentEditTextId,
    setMessage,
}) => {
    const { pages, images: spaceImages, setImages, texts: spaceTexts, setTexts } = useSpace()
    const [position, setPosition] = useState({ top: 0, left: 0 })
    const [showLinkModal, setShowLinkModal] = useState(false)
    const [showTextModal, setShowTextModal] = useState(false)
    const hasSelection = selectedImageId || selectedTextId
    const isText = !!selectedTextId
    const linkedPageId = isText 
        ? spaceTexts.find(t => t.id === selectedTextId)?.linkToPage?.id
        : spaceImages.find(img => img.id === selectedImageId)?.linkToPage?.id

    useEffect(() => {
        if (elementPosition && backgroundDimensions) {
            // Position above the element
            const top = elementPosition.top - 60
            const left = elementPosition.left + (elementPosition.width / 2) - 75 // Center the controls

            setPosition({
                top: Math.max(10, top), // Don't go above viewport
                left: Math.max(10, left)
            })
        }
    }, [elementPosition, backgroundDimensions])

    const handleEdit = () => {
        if (isText) {
            setShowTextModal(true)
        }
    }

    const handleLinkChange = (pageId) => {
        if (selectedImageId) {
            // Link image to page
            const imageIndex = spaceImages.findIndex(img => img.id === selectedImageId);
            if (imageIndex !== -1) {
                const updatedImages = [...spaceImages];
                updatedImages[imageIndex].linkToPage = pageId ? { id: pageId } : null;
                updatedImages[imageIndex].isEdited = true;
                setImages(updatedImages);
            }
        } else if (selectedTextId) {
            // Link text to page
            const textIndex = spaceTexts.findIndex(text => text.id === selectedTextId);
            if (textIndex !== -1) {
                const updatedTexts = [...spaceTexts];
                updatedTexts[textIndex].linkToPage = pageId ? { id: pageId } : null;
                updatedTexts[textIndex].isEdited = true;
                setTexts(updatedTexts);
            }
        }
    }

    const handleDelete = () => {
        if (selectedImageId) {
            // Delete image logic
            const updatedImages = spaceImages.filter(img => img.id !== selectedImageId);
            setImages(updatedImages);
            setCurrentEditImageId(null);
            setMessage({ type: 'success', text: 'Image deleted' });
            setTimeout(() => setMessage({ type: '', text: '' }), 1500);
        } else if (selectedTextId) {
            // Delete text logic
            const updatedTexts = spaceTexts.filter(text => text.id !== selectedTextId);
            setTexts(updatedTexts);
            setCurrentEditTextId(null);
            setMessage({ type: 'success', text: 'Text deleted' });
            setTimeout(() => setMessage({ type: '', text: '' }), 1500);
        }
    }

    if (!hasSelection) return null

    return (
        <>
            <StyledElementControlContainer $top={position.top} $left={position.left} onClick={(e) => e.stopPropagation()}>
                <IconButton 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleEdit();
                    }}
                    title="Edit"
                    aria-label="Edit element"
                >
                    <MdEdit />
                </IconButton>
                <IconButton 
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete();
                    }}
                    title="Delete"
                    aria-label="Delete element"
                    $danger
                >
                    <MdDelete />
                </IconButton>
                <IconButton 
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowLinkModal(!showLinkModal);
                    }}
                    title={isText ? "Link text" : "Link image"}
                    aria-label="Link element"
                    $active={showLinkModal}
                >
                    <MdLink />
                </IconButton>
            </StyledElementControlContainer>

            {showLinkModal && (
                <LinkModal
                    elementPosition={elementPosition}
                    selectedImageId={selectedImageId}
                    selectedTextId={selectedTextId}
                    onClose={() => setShowLinkModal(false)}
                    setCurrentPageId={setCurrentPageId}
                    onLinkChange={handleLinkChange}
                    linkedPageId={linkedPageId}
                />
            )}

            {showTextModal && (
                <ModalWrapper tabName={selectedTextId ? 'Edit Text' : 'Add Text'} modalCloseFn={() => setShowTextModal(false)}>
                    <AddTextModal
                        setIsModalOpen={setShowTextModal}
                        backgroundDimensions={backgroundDimensions}
                        textToEdit={selectedTextId ? spaceTexts.find(t => t.id === selectedTextId) : null}
                    />
                </ModalWrapper>
            )}
        </>
    )
}

const StyledElementControlContainer = styled.div`
    position: fixed;
    top: ${props => `${props.$top}px`};
    left: ${props => `${props.$left}px`};
    display: flex;
    gap: 8px;
    z-index: 1500;
    pointer-events: auto;
    animation: slideIn 0.2s ease-out;

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: scale(0.9);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
`

const IconButton = styled.button`
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: ${props => props.$danger ? '#ef4444' : props.$active ? '#2e7d32' : '#4a90e2'};
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    transition: all 0.2s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    pointer-events: auto;

    &:hover {
        transform: scale(1.1);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        background: ${props => props.$danger ? '#dc2626' : props.$active ? '#1b5e20' : '#357abd'};
    }

    &:active {
        transform: scale(0.95);
    }
`

export default ElementControl