'use client'

import React, { useState, useEffect, useContext } from 'react';
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import { useSpace } from '@/context/SpaceProvider';
import { getContent } from 'data/fetchContent.server';

const tickerAnimation = keyframes`
  0% {
    transform: translate3d(0, 0, 0);
    visibility: visible;
  }
  100% {
    transform: translate3d(-100%, 0, 0);
  }
`;

const StyledTicker = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  height: 3rem;
  padding-left: 100%;
  box-sizing: content-box;
  background-color: transparent;

    div.content {
        display: inline-block;
        height: 3rem;
        line-height: 3rem;
        white-space: nowrap;
        padding-right: 100%;
        box-sizing: content-box;
        animation: ${tickerAnimation} ${props => props.$scrollSpeed || '45s'} linear infinite;
    }
`;

const TickerItem = styled(Link)`
  display: inline-block;
  padding: 0 ${props => props.$itemSpacing || '3rem'};
  font-size: 1.25rem;
  text-transform: uppercase;
  color: ${props => props.$theme?.style?.bodyTextColor || '#000'} !important;
  text-decoration: none;
  font-family: ${props => props.$theme?.style?.bodyFont}
`;

const NewsTicker = ({ backgroundColor, scrollSpeed, itemSpacing }) => {
    const [tickerItems, setTickerItems] = useState(null)
    const { settings } = useSpace()

    useEffect(() => {
        async function fetchData() {
            const data = await getContent('newsTicker', settings.spaceId);
            setTickerItems(data?.docs[0]?.tickerItems)
        }

        fetchData();
    }, [])
    
    return (
        <StyledTicker 
            $backgroundColor={backgroundColor}
            $scrollSpeed={scrollSpeed}
            $theme={settings.theme}
        >
            <div className='content'>
                {
                    tickerItems && tickerItems.map(({text, link, id}) => 
                        <TickerItem 
                            $itemSpacing={itemSpacing} 
                            key={id} 
                            href={link ? link : '/'}
                            $theme={settings.theme}
                        >
                            {text}
                        </TickerItem>
                    )
                }
            </div>
        </StyledTicker>
    );
};

export default NewsTicker;