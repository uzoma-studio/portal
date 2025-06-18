import React, { useState } from 'react'
import styled from 'styled-components'
import { useSpace } from '@/context/SpaceProvider'
import AuthButton from '../widgets/Authentication/AuthButton'
import UserProfile from '../widgets/Authentication/UserProfile'
import { useAuth } from '@/context/AuthProvider'
import JoinSpaceButton from '../widgets/Spaces/JoinSpaceButton'
import PagesSidebar from './PagesSidebar'
import Link from 'next/link';

const StyledHamburger = styled.button`
    span {
        background-color: var(--body-text-color);
        transition: all 0.3s ease-in-out;
    }

    &:hover span {
        background-color: var(--menu-hover-color);
    }
`

const StyledHeader = styled.div`
    background: var(--menu-background);
    color: var(--body-text-color);
    font-family: var(--header-font);
`

/**
 * Header component
 * 
 * @param {string} background - Background color or image
 * @param {string} height - Height of the header
 * @param {boolean} [showPagesNav=false] - Flag to show/hide pages navigation
 * @param {object} [pages=false] - Pages to be passed to the Navbar component
 * @returns {JSX.Element} Header component
 */
const Header = ({ background, height, pages, showPagesNav }) => {
    const isSpace = typeof window !== 'undefined' && window.location.pathname !== '/jumping';

    const spaceContext = useSpace();
    const space = spaceContext?.space
    const settings = spaceContext?.settings

    const { user } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const theme = isSpace && settings?.theme ? settings.theme : {};

    return (
        <>
            <StyledHeader
                $background={background}
                $theme={theme}
                className="w-full z-50 flex items-center justify-between px-10 py-4"
                style={{ height: theme?.style?.menu?.defaultHeight || '3.5rem' }}
            >
                {isSpace ? (
                    <>
                        <StyledHamburger 
                            onClick={() => setIsSidebarOpen(true)}
                            $theme={theme}
                            className="bg-transparent border-none cursor-pointer p-2 flex flex-col justify-between w-8 h-7 z-10"
                        >
                            <span className="block w-full h-0.5" />
                            <span className="block w-full h-0.5" />
                            <span className="block w-full h-0.5" />
                        </StyledHamburger>
                        <p className="uppercase text-2xl m-0">
                            {space.name}
                        </p>
                        <div className="flex items-center gap-4 z-10">
                            {user ? <UserProfile /> : <AuthButton />}
                            {space?.id && <JoinSpaceButton spaceId={space.id} theme={theme} />}
                        </div>
                    </>
                ) : (
                    <StyledHeader className="w-full z-50 flex items-center justify-between px-10 py-4">
                        <div>{` `}</div>
                        <div>{` `}</div>
                        <div className="flex items-center gap-4 z-10">
                            {
                                user ? 
                                    <>
                                        <Link href="/create" className="default-button font-mono p-2">
                                            Create Space +
                                        </Link>
                                        <UserProfile />
                                    </>
                                    :
                                    <AuthButton />
                            }
                        </div>
                    </StyledHeader>
                )}
            </StyledHeader>
            <PagesSidebar 
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
                pages={pages}
                theme={theme}
            />
        </>
    )
}

export default Header