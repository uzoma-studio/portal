'use client';

import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components'
import { useSpace } from '@/context/SpaceProvider';

import AuthButton from '@/widgets/Authentication/AuthButton'
import { useAuth } from '../context/AuthProvider';
import UserProfile from '../widgets/Authentication/UserProfile';

const ChatWrapper = styled.div`
    font-family: ${props => props.$theme?.style?.bodyFont};

    .chat-container {
        .input-box-container {
            display: flex;
            position: absolute;
            bottom: 5%;
            width: 100%;
    
            input.chat-input {
                border: 2px solid ${props => props.$theme?.style?.primaryColor || '#222'};
                border-radius: 5px;
                padding: 2%;
                width: 70%;
            }
    
            .chat-button {
                text-align: center;
                display: block;
                width: 7.5%;
                margin: 0 1%;
                border-radius: 5px;
            }
        }
    }
`

const Chat = ({ data }) => {
    const [messages, setMessages] = useState(data);
    const [message, setMessage] = useState('');
    const [buttonText, setButtonText] = useState('Send')
    const { user } = useAuth()
    const { settings, space } = useSpace()

    const username = user ? user.username : 'Guest'

    const bottomRef = useRef(null);

    useEffect(() => {
        // Scroll to the bottom when messages update
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        if (!message.trim()) return;

        setButtonText('Sending...');

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user: username, message, space }),
            });

            const newMessage = await res.json();
            setMessages((prev) => [...prev, newMessage]);
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setButtonText('Send');
        }
    };

    return (
        <ChatWrapper $theme={settings.theme}>
            <div className='chat-container'>
                {
                    data.length > 0 ?
                        <ul style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {messages.map((msg) => (
                                <li key={msg.id}>
                                    <strong>{msg.user}:</strong> {msg.message}
                                </li>
                            ))}
                            <div ref={bottomRef} />
                        </ul>
                        :
                        <p>Send the first message</p>
                }
                <div className='input-box-container'>
                    <input
                        type="text"
                        placeholder="Type your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className='chat-input'
                    />
                    <button className='chat-button default-button' onClick={sendMessage}>{user ? buttonText : `${buttonText} as Guest`}</button>
                    {user ? <UserProfile /> : <AuthButton />}
                </div>
            </div>
        </ChatWrapper>
    );
};

export default Chat;