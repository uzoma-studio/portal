import { useState, useEffect, useRef, useContext } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import Image from 'next/image';
import { useSpace } from '@/context/SpaceProvider';

const ChatWrapper = styled.div`
    margin: 2rem ${props => props.$sideMargins ? props.$sideMargins : 'auto'};
    border: 2px solid ${props => props.$theme?.style?.primaryColor || '#222'};
    border-radius: 20px;
    padding: 3rem;
    font-family: ${props => props.$theme?.style?.bodyFont};

    .chat-box {
        border: 2px solid ${props => props.$theme?.style?.primaryColor || '#222'};
        border-radius: 20px;
        display: inline;
        height: fit-content;
        margin: .5rem 0;
        width: fit-content;
        animation: slidein 1s linear;
        animation-fill-mode: backwards;
        position: relative;
        padding: .75rem;

        &.multimedia {
            width: 75%;
        }

        .multimedia-container {
            display: flex;
        }

        img {
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            max-width: 100%;
        }

        .chat-box-text {
            padding: 1rem;

            a {
                text-decoration: underline;
            }

            span {
                color: ${props => props.$theme?.style?.primaryColor || '#222'};
            }
        }
    }

    .bot-messages {
        display: flex;
        flex-direction: column;
        max-width: 60%;
    }

    .reply-options {
        width: 100%;
        text-align: right;
    }

    .reply-option {
        animation: display-replies 0.25s linear;
        animation-fill-mode: backwards;
        margin: .5rem 0;
    }

    .avatar {
        border-radius: 50%;
    }

    button {
        background-color: ${props => props.$theme?.style?.primaryColor || '#222'};
        color: ${props => props.$theme?.style?.accentColor || '#fff'};
        padding: .5rem;
        border-radius: 10px;
        border: 2px solid #999;

        &:hover {
            background-color: ${props => props.$theme?.style?.accentColor || '#fff'};
            color: ${props => props.$theme?.style?.primaryColor || '#222'};
            border-color: ${props => props.$theme?.style?.primaryColor || '#222'};
        }
    }

    .exit-btn {
        position: fixed;
        margin-top: 3rem;
        bottom: 5px;
        left: 50%;
        transform: translateX(-50%);

        button {
            height: 50px;
            font-size: 1.5rem;
        }
    }

    @keyframes slidein {
        0%   { opacity: 0; left: -20px; display: block }
        100% { opacity: 1; left: 0px; }
    }

    @keyframes display-replies {
        0%   { opacity: 0; }
        100% { opacity: 1; }
    }

    @media only screen and (max-width: 768px) {
        .bot-messages {
            max-width: 100%;
        }

        .chat {
            margin: unset;
            padding: 20px;
            max-height: 85vh;
        }

        .exit-btn {
            left: 12.5%;
        }
    }
`;

export default function Chatbot ({ data, sideMargins }) {
    const [chat, setChat] = useState({})
    const { settings } = useSpace()

    useEffect(() => {
        setChat(data[0])
        return () => {}
    }, [])

    const [nodesToShowIds, setNodesToShowIds] = useState(["intro"])
    const bottomRef = useRef(null);

    useEffect(() => {
        // 👇️ scroll to bottom every time messages change
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }, [nodesToShowIds]);

    const getCurrentNode = (id) => {   
        return chat.nodes.find(message => message.id === id)
    }

    const createMessageNode = (id) => {
        const node = getCurrentNode(id)
        return node.messages.map((message, index) => 
            <div key={index} 
                className='chat-box chat-box-text' 
                style={{ animationDelay: `${index+1}s` }} 
            >
                <span dangerouslySetInnerHTML={{ __html: message }}></span> 
            </div>
        )
    }

    const initiateButtonAction = (id) => {
        setNodesToShowIds([...nodesToShowIds, id])
    }

    const getReplyOptions = (id, index) => {
        const node = getCurrentNode(id)
        const animationDelay = node.messages.length + 1 //the time in s that the reply option buttons should wait before display
        // calculated as length of the messages array + 1 (length of each animation set in chat.css)
        return node.replies.map(({ id, text }) => 
            // Adding index to prevent duplicate ids in case the same reply option is selected by the user
            <p key={`${id}-${index}`} className='reply-option' style={{ animationDelay: `${animationDelay}s` }}>
                <button onClick={() => initiateButtonAction(id)}>{text}</button>
            </p>
        )
    }

    return (
        <ChatWrapper
            $theme={settings.theme}
            $sideMargins={sideMargins}
        >
            <div className='chat' id='chat'>
                {
                    Object.keys(chat).length > 0 && nodesToShowIds.map(
                        (nodeId, index) =>
                            <div key={`${nodeId}-${index}`}> {/* see note on index in getReplyOptions */}
                                { chat.avatar && <Image src={chat.avatar.url} width={75} height={75} alt="chat avatar" className='avatar'/> }
                                <div className='bot-messages' ref={bottomRef}>
                                    { createMessageNode(nodeId) }
                                </div>
                                <div className='reply-options'> { getReplyOptions(nodeId, index) }</div>
                            </div>
                    )
                }
            </div>
        </ChatWrapper>
    )
}