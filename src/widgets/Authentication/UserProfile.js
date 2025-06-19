import React, { useState, useEffect } from 'react'
import { useAuth } from '@/context/AuthProvider';
import styled from 'styled-components';
import { logoutUser } from '@/utils/auth';
import { useSpace } from '@/context/SpaceProvider';

const StyledProfile = styled.div`
    position: relative;
    cursor: pointer;
`

const StyledAvatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${props => props.$theme?.style?.menu?.avatarBackground || '#ddd'};
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${props => props.$theme?.style?.menu?.avatarColor || '#333'};
    font-weight: bold;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`

const StyledModal = styled.div`
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 0.5rem;
    background: white;
    border-radius: 4px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    padding: 1rem;
    min-width: 250px;
    z-index: 1000;
`

const StyledModalItem = styled.div`
    padding: 0.5rem 0;
    border-bottom: 1px solid #eee;
    
    &:last-child {
        border-bottom: none;
    }

    &.logout {
        cursor: pointer;
        color: #ff4444;
        
        &:hover {
            text-decoration: underline;
        }
    }
`

const StyledSpaceList = styled.div`
    margin-top: 0.5rem;
    max-height: 200px;
    overflow-y: auto;
`

const StyledSpaceItem = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 0;
    font-size: 0.9rem;

    .space-name {
        flex: 1;
    }

    .role-tag {
        background: ${props => props.$role === 'owner' ? '#dc3545' : '#6c757d'};
        color: white;
        padding: 0.2rem 0.5rem;
        border-radius: 3px;
        font-size: 0.8rem;
        margin-left: 0.5rem;
    }
`

const UserProfile = () => {
    const { user, setUser } = useAuth();
    const [showModal, setShowModal] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [userSpaces, setUserSpaces] = useState([]);
    const spaceContext = useSpace();
    const setIsCurrentUserSpaceOwner = spaceContext?.isCurrentUserSpaceOwner

    useEffect(() => {
        const fetchUserSpaces = async () => {
            if (!user?.spaces) return;

            try {
                const response = await fetch('/api/spaces/user-spaces', {
                    credentials: 'include',
                });
                if (response.ok) {
                    const data = await response.json();
                    setUserSpaces(data.spaces);
                }
            } catch (error) {
                console.error('Error fetching user spaces:', error);
            }
        };

        if (showModal) {
            fetchUserSpaces();
        }
    }, [showModal, user?.spaces]);

    const handleLogout = async () => {
        if (isLoggingOut) return;
        
        setIsLoggingOut(true);
        const success = await logoutUser();
        if (success) {
            setUser(null)
            setIsCurrentUserSpaceOwner && setIsCurrentUserSpaceOwner(false)
            setShowModal(false);
        }
        setIsLoggingOut(false);
    };

    const getInitials = (username) => {
        return username
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2)
    }

    return (
        <StyledProfile>
            <StyledAvatar 
                onClick={() => setShowModal(!showModal)}
                $theme={user?.theme}
            >
                {user?.avatar ? (
                    <img src={user.avatar} alt={user.username} />
                ) : (
                    getInitials(user.username)
                )}
            </StyledAvatar>
            {showModal && (
                <StyledModal>
                    <StyledModalItem>
                        <strong>Username:</strong> {user.username}
                    </StyledModalItem>
                    <StyledModalItem>
                        <strong>Email:</strong> {user.email}
                    </StyledModalItem>
                    {userSpaces.length > 0 && (
                        <StyledModalItem>
                            <strong>My Spaces:</strong>
                            <StyledSpaceList>
                                {userSpaces.map(space => (
                                    <StyledSpaceItem key={space.id} $role={space.role}>
                                        <span className="space-name">{space.name}</span>
                                        {(space.role === 'admin' || space.role === 'owner') && (
                                            <span className="role-tag">
                                                {space.role === 'owner' ? 'Owner' : 'Admin'}
                                            </span>
                                        )}
                                    </StyledSpaceItem>
                                ))}
                            </StyledSpaceList>
                        </StyledModalItem>
                    )}
                    <StyledModalItem 
                        className={`logout ${isLoggingOut ? 'loading' : ''}`} 
                        onClick={handleLogout}
                    >
                        {isLoggingOut ? 'Logging out...' : 'Logout'}
                    </StyledModalItem>
                </StyledModal>
            )}
        </StyledProfile>
    )
}

export default UserProfile