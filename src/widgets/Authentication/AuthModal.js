// AuthModal.jsx
import { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import styled from 'styled-components';
import CloseButton from '../../components/closeButton';
import { useSpace } from '@/context/SpaceProvider';

const AuthModal = ({ isOpen, onClose }) => {
    const [formType, setFormType] = useState('login');
    const [isPortalJumpingPage, setIsPortalJumpingPage] = useState(false) 
    const spaceContext = useSpace()
    const settings = spaceContext?.settings

    useEffect(() => {
      if(window.location.pathname.includes('jumping')){
        setIsPortalJumpingPage(true)
      } 
    }, [])

    if (!isOpen) return null;

    return (
        <StyledModalOverlay onClick={onClose} $isOpen={isOpen} $settings={settings}>
            <div
                className="modal-content"
                onClick={e => e.stopPropagation()}
            >
                <div className="modal-header">
                    <CloseButton closeFn={onClose} position={{x: '90', y: '5'}} />
                </div>

                {/* Toggle buttons to switch forms */}
                <div className="modal-tabs">
                    <button
                        onClick={() => setFormType('login')}
                        className={formType === 'login' ? 'active' : ''}
                    >
                        Login
                    </button>
                  {/* Temporary: Only show Sign Up tab if not Portal Jumping page */}
                  {
                    !isPortalJumpingPage &&
                      <button
                          onClick={() => setFormType('signup')}
                          className={formType === 'signup' ? 'active' : ''}
                      >
                          Sign Up
                      </button>
                  }
                </div>

                {/* Render the appropriate form */}
                <div className="modal-body">
                    {formType === 'login' ? <LoginForm onClose={onClose} /> 
                                            : <SignupForm onClose={onClose} />}
                </div>
            </div>
        </StyledModalOverlay>
    );
};

export default AuthModal;

const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  z-index: 999;

  .modal-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
    border-radius: 8px;
    padding: 20px;
    min-width: 300px;
    width: 35%;
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
    z-index: 1000;
  }

  .modal-tabs {
    display: flex;
    justify-content: flex-start;
    margin: 1rem 0;

    button {
      margin-right: 1rem;
      color: var(--body-text-color);

      &:hover, &.active {
        text-decoration: underline;
      }
    }
  }

  .modal-body {
    form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      input {
        border: 2px solid #222;
        border-radius: 5px;
        padding: 2%;
        width: 100%;
        color: var(--body-text-color);
        background: inherit;
      }

      input, button {
        margin: .5rem 0;
      }

      button {
        padding: .5rem;
        background: #222;
        color: var(--accent-color);
        border: 2px solid var(--accent-color);
        border-radius: 5px;

        &:hover {
          border: 2px solid #222;
          color: #222;
          background: #fff;
        }
      }
    }
  }
`;