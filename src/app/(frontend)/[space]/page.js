'use client'

import React from 'react'
import { SpaceProvider, useSpace } from '../../../context/SpaceProvider'
import { GlobalStyle } from '@/styles/rootStyles'
import Index from 'templates/image-map/layout'

const SpacePage = () => {
    return (
        <SpaceProvider>
            <SpacePageContent />
        </SpaceProvider>
    )
}

const SpacePageContent = () => {
    const { space, pages, settings, loadingState } = useSpace()

    if (loadingState.isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center">
                <p className="text-2xl font-display animate-pulse">
                    Loading Space...
                </p>
            </div>
        )
    }

    if (loadingState.error) {
        return (
            <p>{loadingState.error}</p>
        )
    }

    if (!space) {
        return (
            <p>No data available</p>
        )
    }
    
    return (
        <>
            <GlobalStyle $theme={settings.theme} />
            <Index />
        </>
    )
}

export default SpacePage