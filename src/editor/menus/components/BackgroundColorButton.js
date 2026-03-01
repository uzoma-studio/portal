import React, { useState } from 'react'
import { useSpace } from '@/context/SpaceProvider'
import { useSaveDraft } from '@/hooks/useSaveDraft'
import { StyledToolbarButton } from '../../styles'
import MenuButtonContainer from './MenuButtonContainer'
import styled from 'styled-components'

const BackgroundColorButton = () => {
  const { space, setSpace, setSettings } = useSpace()
  const { saveDraft } = useSaveDraft()

  const themeStyle = space?.settings?.theme?.style || {}
  const [backgroundColor, setBackgroundColor] = useState(themeStyle.backgroundColor || '#ffffff')

  const handleBackgroundColorChange = (event) => {
    const newColor = event.target.value
    setBackgroundColor(newColor)
    const updatedSpace = {
      ...space,
      settings: {
        ...space?.settings,
        theme: {
          ...space?.settings?.theme,
          style: {
            ...space?.settings?.theme?.style,
            backgroundColor: newColor,
          },
        },
      },
    }

    setSpace(updatedSpace);
    setSettings(updatedSpace.settings)
    saveDraft(undefined, undefined, undefined, updatedSpace)
  }

  return (
    <MenuButtonContainer tooltipText="Background color" tooltipPosition="left">
        <StyledColorInputButton
            type="color"
            aria-label="Change background color"
            value={backgroundColor}
            onChange={handleBackgroundColorChange}
            $backgroundColor={backgroundColor}
        />
    </MenuButtonContainer>
  )
}

export default BackgroundColorButton

const StyledColorInputButton = styled.input`
  display: block;
  -webkit-appearance: none;
  appearance: none;
  border: 2px solid var(--primary-color);
  box-shadow: none;
  background-color: ${props => props.$backgroundColor || '#ffffff'};
  width: 56px;
  height: 56px;
  padding: 0;
  border-radius: 50%;
  cursor: pointer;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
    border-radius: 50%;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 50%;
  }

  &::-moz-color-swatch {
    border: none;
    border-radius: 50%;
  }

  &:hover,
  &:focus {
    transform: translateY(-2px) scale(1.03);
  }
`
