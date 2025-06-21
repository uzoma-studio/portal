import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { isUserSpaceMember, joinSpace } from '@/utils/spaces'
import { useAuth } from '@/context/AuthProvider'
import { useSpace } from '@/context/SpaceProvider'

const StyledButton = styled.button`
    background: ${props => props.$theme?.style?.primaryColor || '#ecf0f1'};
    color: ${props => props.$theme?.style?.bodyTextColor || 'inherit'};
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: opacity 0.2s;

    &:hover {
        opacity: 0.9;
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
`

const StyledSuccessMessage = styled.div`
    position: fixed;
    top: 1rem;
    right: 1rem;
    background: #28a745;
    color: white;
    padding: 0.75rem 1.5rem;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    animation: slideIn 0.3s ease-out;

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`

const JoinSpaceButton = ({ spaceId, theme }) => {
    const { user } = useAuth()
    const { isCurrentUserSpaceOwner } = useSpace()
    const [isMember, setIsMember] = useState(false)
    const [isChecking, setIsChecking] = useState(true)
    const [isJoining, setIsJoining] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)

    useEffect(() => {
        const checkMembership = async () => {
            if (!user || !spaceId) {
                setIsMember(false)
                setIsChecking(false)
                return
            }

            try {
                const membershipStatus = await isUserSpaceMember(spaceId)

                setIsMember(membershipStatus)
            } catch (error) {
                console.error('Error checking space membership:', error)
                setIsMember(false)
            } finally {
                setIsChecking(false)
            }
        }

        checkMembership()
    }, [user, spaceId])

    const handleJoinSpace = async () => {
        if (isJoining) return

        setIsJoining(true)
        try {
            await joinSpace(spaceId)
            setIsMember(true)
            setShowSuccess(true)
            // Hide success message after 3 seconds
            setTimeout(() => setShowSuccess(false), 3000)
        } catch (error) {
            console.error('Error joining space:', error)
        } finally {
            setIsJoining(false)
        }
    }
    
    if (!user || isChecking || isMember || isCurrentUserSpaceOwner) {
        return null
    }

    return (
        <>
            <StyledButton
                className="join-space-btn"
                onClick={handleJoinSpace}
                disabled={isJoining}
                $theme={theme}
            >
                {isJoining ? 'Joining...' : 'Join Space'}
            </StyledButton>
            {showSuccess && (
                <StyledSuccessMessage>
                    Successfully joined the space!
                </StyledSuccessMessage>
            )}
        </>
    )
}

export default JoinSpaceButton 