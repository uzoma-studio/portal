/**
 * Hero Section root component https://www.notion.so/uzoma-studio/Create-Root-Components-1a4327f6834d4f1f876ae0989ed63ce6?pvs=4
 * 
 * @type {Prop} image
 * @type {Prop} color
 * @type {Prop} background
 */

import React from 'react'
import styled from 'styled-components'

const StyledHeroSection = styled.section`
    background: var(--background-color);
    color: var(--body-text-color);
    font-family: var(--body-font);
`;

const StyledTitle = styled.h1`
    font-family: var(--header-font);
    color: var(--primary-color);
`;

const StyledSubtitle = styled.p`
    color: var(--body-text-color);
`;

const HeroSection = ({ theme }) => {
    return (
        <StyledHeroSection className="w-full min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-16">
            <div className="max-w-4xl mx-auto">
                <StyledTitle className="text-5xl font-bold mb-6">
                    Welcome to Your Space
                </StyledTitle>
                <StyledSubtitle className="text-xl mb-8">
                    Create and manage your content with ease
                </StyledSubtitle>
                <button 
                    className="bg-[var(--primary-color)] text-[var(--accent-color)] px-8 py-3 rounded-lg hover:opacity-90 transition-opacity"
                >
                    Get Started
                </button>
            </div>
        </StyledHeroSection>
    );
};

export default HeroSection