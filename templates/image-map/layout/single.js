import React, { useRef, useEffect } from 'react'
import { SpaceContext } from '@/context/SpaceProvider'
import Image from 'next/image'

import RenderSinglePageContent from '@/utils/renderSinglePageContent'

import { StyledPage } from '../styles'

const SinglePage = ({ pageData, pageConfig, spaceTheme, showPage, setShowPage, isDisplayMode=false }) => {
    const pageRef = useRef(null)

    // TODO: If this is a blog page (Updates), show description

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pageRef.current && !pageRef.current.contains(event.target)) {
                setShowPage(false)
            }
        }

        if (showPage) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [showPage])

    const calculatePagePosition = (pagePosition) => {
        const x = pagePosition.x
        const y = pagePosition.y < 40 ? pagePosition.y + 10 : pagePosition.y - 10
        return { x, y}
    }

    return (
        <>
            <StyledPage 
                ref={pageRef}
                $settings={pageConfig}
                $spaceTheme={spaceTheme}
                $isDisplayMode={isDisplayMode}
            >
                <RenderSinglePageContent pageData={pageData} setCurrentPage={setShowPage} isDisplayMode={isDisplayMode} />
            </StyledPage>
        </>
    )
}

export default SinglePage