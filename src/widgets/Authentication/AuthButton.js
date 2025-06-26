import { useState, useEffect } from 'react';
import AuthModal from './AuthModal';
import { useAuth } from '@/context/AuthProvider';
import styled from 'styled-components';
import UserProfile from './UserProfile'

// TODO: Add global button styles
const StyledButton = styled.button`
    text-align: center;
    display: block;
    margin: 0 1%;
    background-color: #222;
    color: #fff;
    border-radius: 5px;
    width: 6rem;
    padding: .35rem;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);

    &:hover {
        background-color: #fff;
        border: 2px solid #222;
        color: #222;
    }
`

const AuthButton = () => {
    const { loading } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <StyledButton onClick={() => setIsModalOpen(true)}>Log In</StyledButton>
            <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
  );
};

export default AuthButton;