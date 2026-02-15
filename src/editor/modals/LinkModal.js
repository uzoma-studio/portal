import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSpace } from '@/context/SpaceProvider'
import { MdClose, MdOpenInNew } from 'react-icons/md'

const isValidUrl = (string) => {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
};

const LinkModal = ({ 
    elementPosition, 
    selectedImageId,
    selectedTextId,
    onClose,
    onLinkChange,
    linkedPageId,
    setCurrentPageId
}) => {
    const { pages, images: spaceImages, texts: spaceTexts } = useSpace()
    const selectedText = selectedTextId ? spaceTexts?.find(t => t.id === selectedTextId) : null
    
    const [activeTab, setActiveTab] = useState('page')
    const [selectedPageId, setSelectedPageId] = useState(linkedPageId || null)
    const [externalUrl, setExternalUrl] = useState(selectedText?.linkToPage && typeof selectedText.linkToPage === 'string' && selectedText.linkToPage.startsWith("http") ? selectedText.linkToPage : '')
    const [savedExternalUrl, setSavedExternalUrl] = useState('')
    const [urlError, setUrlError] = useState('')

    // Get the selected text content from selectedTextId

    const handlePageSelect = (pageId) => {
        const newPageId = selectedPageId === pageId ? null : pageId
        setSelectedPageId(newPageId)
        onLinkChange(newPageId)
    }

    const handleOpenPage = (pageId, e) => {
        e.stopPropagation();
        setCurrentPageId(pageId);
        onClose();
    }

    const handleExternalUrlChange = (e) => {
        const url = e.target.value
        setExternalUrl(url)
        if (url.trim() === '') {
            setUrlError('')
        } else if (!isValidUrl(url)) {
            setUrlError('Invalid URL format')
        } else {
            setUrlError('')
        }
    }

    const handleExternalUrlSubmit = () => {
        if (externalUrl.trim() === '') {
            setUrlError('Please enter a URL')
            return
        }
        if (!isValidUrl(externalUrl)) {
            setUrlError('Invalid URL format')
            return
        }
        // Store the external URL in a way that the system recognizes
        onLinkChange(externalUrl)
        setSavedExternalUrl(externalUrl)
        setExternalUrl('')
        setUrlError('')
    }

    if (!elementPosition || !pages?.length) return null

    return (
        <StyledModalOverlay onClick={onClose}>
            <StyledLinkModal 
                $top={elementPosition.top}
                $left={elementPosition.left + elementPosition.width + 10}
                onClick={(e) => e.stopPropagation()}
            >
                <StyledHeader>
                    <h3>Link Element</h3>
                    <StyledCloseButton onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }}>
                        <MdClose />
                    </StyledCloseButton>
                </StyledHeader>

                <StyledTabContainer>
                    <StyledTab 
                        $active={activeTab === 'page'} 
                        onClick={() => setActiveTab('page')}
                    >
                        Page Link
                    </StyledTab>
                    <StyledTab 
                        $active={activeTab === 'external'} 
                        onClick={() => setActiveTab('external')}
                    >
                        External Link
                    </StyledTab>
                </StyledTabContainer>

                {activeTab === 'page' && (
                    <>
                        <StyledPagesList>
                            {pages.map(page => (
                                <StyledPageItem
                                    key={page.id}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handlePageSelect(page.id);
                                    }}
                                    $selected={selectedPageId === page.id}
                                >
                                    <StyledCheckbox $selected={selectedPageId === page.id}>
                                        {selectedPageId === page.id && '✓'}
                                    </StyledCheckbox>
                                    <span>{page.title}</span>
                                    <StyledOpenIcon 
                                        onClick={(e) => handleOpenPage(page.id, e)}
                                        title="Open page"
                                    >
                                        <MdOpenInNew />
                                    </StyledOpenIcon>
                                </StyledPageItem>
                            ))}
                        </StyledPagesList>

                        {selectedPageId && (
                            <StyledFooter>
                                <p>Linked to: <strong>{pages.find(p => p.id === selectedPageId)?.title}</strong></p>
                            </StyledFooter>
                        )}
                    </>
                )}

                {activeTab === 'external' && (
                    <>
                        <StyledExternalLinkContainer>
                            <StyledUrlInput 
                                type="text"
                                placeholder="https://example.com"
                                value={externalUrl}
                                onChange={handleExternalUrlChange}
                                onClick={(e) => e.stopPropagation()}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.stopPropagation();
                                        handleExternalUrlSubmit();
                                    }
                                }}
                            />
                            {urlError && <StyledError>{urlError}</StyledError>}
                            <StyledUrlButton 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleExternalUrlSubmit();
                                }}
                                disabled={!externalUrl.trim() || !!urlError}
                            >
                                Add Link
                            </StyledUrlButton>
                        </StyledExternalLinkContainer>
                        {savedExternalUrl && (
                            <StyledFooter>
                                <p>Linked to: <strong>{savedExternalUrl}</strong></p>
                            </StyledFooter>
                        )}
                    </>
                )}
            </StyledLinkModal>
        </StyledModalOverlay>
    )
}

export default LinkModal

const StyledModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1600;
`

const StyledLinkModal = styled.div`
    position: fixed;
    top: ${props => `${props.$top}px`};
    left: ${props => `${props.$left}px`};
    width: 280px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    max-height: 400px;
    z-index: 1601;
    animation: slideIn 0.2s ease-out;

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-10px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
`

const StyledHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    border-bottom: 1px solid #eee;
    
    h3 {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
    }
`

const StyledTabContainer = styled.div`
    display: flex;
    border-bottom: 1px solid #eee;
    padding: 0 8px;
`

const StyledTab = styled.button`
    flex: 1;
    padding: 8px 12px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
    color: ${props => props.$active ? 'var(--primary-color, #4a90e2)' : '#999'};
    border-bottom: 2px solid ${props => props.$active ? 'var(--primary-color, #4a90e2)' : 'transparent'};
    transition: all 0.2s ease;
    
    &:hover {
        color: var(--primary-color, #4a90e2);
    }
`

const StyledCloseButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    padding: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    transition: color 0.2s ease;

    &:hover {
        color: #333;
    }
`

const StyledPagesList = styled.div`
    flex: 1;
    overflow-y: auto;
    padding: 8px;
`

const StyledPageItem = styled.div`
    display: flex;
    align-items: center;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 4px;
    transition: background-color 0.2s ease;
    background-color: ${props => props.$selected ? '#e8f0fe' : 'transparent'};
    
    &:hover {
        background-color: ${props => props.$selected ? '#e8f0fe' : '#f5f5f5'};
    }

    span {
        font-size: 14px;
        color: #333;
    }
`

const StyledCheckbox = styled.div`
    width: 18px;
    height: 18px;
    border: 2px solid ${props => props.$selected ? 'var(--primary-color, #4a90e2)' : '#ddd'};
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    background-color: ${props => props.$selected ? 'var(--primary-color, #4a90e2)' : 'white'};
    color: white;
    font-size: 12px;
    font-weight: bold;
    transition: all 0.2s ease;
`

const StyledFooter = styled.div`
    padding: 12px;
    border-top: 1px solid #eee;
    background-color: #f9f9f9;
    border-radius: 0 0 8px 8px;
    
    p {
        margin: 0;
        font-size: 12px;
        color: #666;
    }

    strong {
        color: #333;
    }
`

const StyledOpenIcon = styled.button`
    background: none;
    border: none;
    color: #007bff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.25rem 0.5rem;
    margin-left: auto;
    transition: color 0.2s ease;
    font-size: 16px;

    &:hover {
        color: #0056b3;
    }
`

const StyledExternalLinkContainer = styled.div`
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`

const StyledUrlInput = styled.input`
    width: 100%;
    padding: 8px 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 12px;
    font-family: inherit;
    color: var(--body-text-color, #333);
    background-color: var(--input-background-color, white);
    
    &:focus {
        outline: none;
        border-color: var(--primary-color, #4a90e2);
        box-shadow: 0 0 4px rgba(74, 144, 226, 0.3);
    }
    
    &::placeholder {
        color: #999;
    }
`

const StyledError = styled.p`
    margin: 0;
    padding: 0 4px;
    font-size: 11px;
    color: #ef4444;
    font-weight: 500;
`

const StyledUrlButton = styled.button`
    width: 100%;
    padding: 8px 12px;
    background: var(--primary-color, #4a90e2);
    color: var(--accent-color, white);
    border: none;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover:not(:disabled) {
        opacity: 0.9;
    }
    
    &:disabled {
        background: #ddd;
        cursor: not-allowed;
        opacity: 0.6;
    }
`
