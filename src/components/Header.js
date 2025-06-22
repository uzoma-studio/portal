import React, { useState } from 'react'
import styled from 'styled-components'
import { useSpace } from '@/context/SpaceProvider'
import AuthButton from '../widgets/Authentication/AuthButton'
import UserProfile from '../widgets/Authentication/UserProfile'
import { useAuth } from '@/context/AuthProvider'
import JoinSpaceButton from '../widgets/Spaces/JoinSpaceButton'
import PagesSidebar from './PagesSidebar'
import Link from 'next/link';
import EditSpaceModal from '@/widgets/SpaceEditor/modals/EditSpaceModal'

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
    color: var(--header-text-color);
    font-family: var(--header-font);
`

const StyledGearIcon = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  fill: currentColor;
  transition: transform 0.2s ease-in-out;
  cursor: pointer;
  
  &:hover {
    transform: rotate(90deg);
  }
`;

/**
 * Header component
 * 
 * @param {string} background - Background color or image
 * @param {string} height - Height of the header
 * @param {boolean} [showPagesNav=false] - Flag to show/hide pages navigation
 * @param {object} [pages=false] - Pages to be passed to the Navbar component
 * @returns {JSX.Element} Header component
 */
const Header = ({ background, height, pages, isBuildMode, setIsBuildMode }) => {
    const isSpace = typeof window !== 'undefined' && window.location.pathname !== '/jumping';

    const spaceContext = useSpace();
    const space = spaceContext?.space
    const settings = spaceContext?.settings
    const isCurrentUserSpaceOwner = spaceContext?.isCurrentUserSpaceOwner

    const { user } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [showEditSpaceModal, setShowEditSpaceModal] = useState(false)

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
                        <h1 className="uppercase text-2xl m-0 font-bold">
                            {space.name}
                        </h1>
                        <div className="flex items-center gap-4 z-10">
                            {isCurrentUserSpaceOwner && 
                                <div>
                                    <span className="mr-2 text-sm">Build Mode</span>
                                    <input
                                        type="checkbox"
                                        checked={isBuildMode}
                                        onChange={() => setIsBuildMode(!isBuildMode)}
                                        className="toggle-checkbox"
                                    />
                                </div>
                            }
                            {user ? <UserProfile /> : <AuthButton />}
                            {space?.id && <JoinSpaceButton spaceId={space.id} theme={theme} />}
                            {isCurrentUserSpaceOwner && 
                                <StyledGearIcon viewBox="0 0 24 24" onClick={() => setShowEditSpaceModal(!showEditSpaceModal)}>
                                    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12A3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5a3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97c0-.33-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.22-.08-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98c0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65z"/>
                                </StyledGearIcon>
                            }
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
            { showEditSpaceModal && <EditSpaceModal modalCloseFn={() => setShowEditSpaceModal(false)} />}
        </>
    )
}

export default Header