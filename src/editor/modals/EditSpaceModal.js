import React, { useState, useEffect, useRef } from 'react';
import {
  StyledForm,
  StyledLabel,
  StyledInput,
  StyledSelect,
  StyledSubmitButton,
  StyledNumberInput,
  StyledSettingsGrid,
  StyledSettingsSection,
  StyledColorInput,
  StyledColorLabel,
  StyledColorPreview,
} from '../styles';
import { StyledMessage } from '@/styles/rootStyles';
import { useSpace } from '@/context/SpaceProvider';
import themeSettings from '@/defaultValues/themeSettings.json'
import { updateEntry } from 'data/createContent.server';
import { handleMediaUpload } from '@/utils/helpers';
import ModalWrapper from './ModalWrapper';
import { useSaveDraft } from '@/hooks/useSaveDraft';

const fonts = [
  'Courier New',
  'Helvetica',
  'Times New Roman',
  'Arial',
  'Georgia',
  'Verdana',
];

const EditSpaceModal = ({ modalCloseFn }) => {

    const { space, settings, setSettings } = useSpace()
    
    // UseRef to keep values constant across renders
    const defaultFormData = useRef(settings?.theme?.style || themeSettings.style).current;

    const [formData, setFormData] = useState(defaultFormData);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { saveDraft } = useSaveDraft()

  useEffect(() => {
    setSettings({
        ...settings,
        theme: {
            style:  { ...formData }
        }
    });
  }, [formData, setSettings]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePageStylesChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      defaultPageStyles: {
        ...prev.menu,
        [name]: type === 'checkbox' ? checked : value,
      },
    }));
  };

  const handleCancel = () => {
    setSettings({
        ...settings,
        theme: {
            style:  { ...defaultFormData }
        }
    });
    modalCloseFn()
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });
    // Simulate save

    const spaceData = {
        ...space,
        settings: {
            ...space.settings,
            theme: {
                style: { ...formData }
            }
        }
    }
    
    try {
        const updatedSpace = await updateEntry('spaces', space.id, spaceData)

        if (updatedSpace?.id) {
            setSettings(spaceData.settings)
            saveDraft(undefined, undefined, undefined, spaceData.settings);
            setMessage({ 
                type: 'success', 
                text: 'Space edited successfully!' 
            });
            setTimeout(() => {
                modalCloseFn();
            }, 1500);
        } else {
            setMessage({ 
                type: 'error', 
                text: 'Failed to edit space. Please try again.' 
            });
        }
    } catch (error) {
        console.error('Error editing space:', error);
            setMessage({
                type: 'error',
                text: error.message || 'An error occurred while editing the space.'
        });
    }
  };

  return (
    <ModalWrapper tabName='Space Settings' modalCloseFn={modalCloseFn} isFullHeight={true}>
      <div className="mt-4">
        <StyledForm onSubmit={handleSubmit}>
          <StyledSettingsSection>
            <StyledLabel className="block mb-2">Typography</StyledLabel>
            <StyledSettingsGrid>
              <div>
                <StyledLabel htmlFor="bodyFont" className="inline-block" style={{marginRight: '.5rem'}}>Body Font</StyledLabel>
                <StyledSelect
                  name="bodyFont"
                  value={formData.bodyFont || ''}
                  onChange={handleInputChange}
                  style={{ fontFamily: formData.bodyFont || 'inherit' }}
                >
                  <option value="">Select a font</option>
                  {fonts.map(font => (
                    <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>
                  ))}
                </StyledSelect>
              </div>
              <div>
                <StyledLabel htmlFor="headerFont" className="inline-block" style={{marginRight: '.5rem'}}>Header Font</StyledLabel>
                <StyledSelect
                  name="headerFont"
                  value={formData.headerFont || ''}
                  onChange={handleInputChange}
                  style={{ fontFamily: formData.bodyFont || 'inherit' }}
                >
                  <option value="">Select a font</option>
                  {fonts.map(font => (
                    <option key={font} value={font} style={{ fontFamily: font }}>{font}</option>
                  ))}
                </StyledSelect>
              </div>
            </StyledSettingsGrid>
          </StyledSettingsSection>

          <StyledSettingsSection>
            <StyledLabel className="block mb-2">Colors</StyledLabel>
            <StyledSettingsGrid>
              <div>
                <StyledLabel>Primary Color</StyledLabel>
                <StyledColorLabel>
                  <StyledColorPreview style={{ backgroundColor: formData.primaryColor || '#9333ea' }} />
                  <StyledLabel className="block text-sm">Primary Color</StyledLabel>
                </StyledColorLabel>
                <StyledColorInput
                  type="color"
                  name="primaryColor"
                  value={formData.primaryColor || '#9333ea'}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <StyledLabel>Accent Color</StyledLabel>
                <StyledColorLabel>
                  <StyledColorPreview style={{ backgroundColor: formData.accentColor || '#9333ea' }} />
                  <StyledLabel className="block text-sm">Accent Color</StyledLabel>
                </StyledColorLabel>
                <StyledColorInput
                  type="color"
                  name="accentColor"
                  value={formData.accentColor || '#9333ea'}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <StyledLabel>Secondary Color</StyledLabel>
                <StyledColorLabel>
                  <StyledColorPreview style={{ backgroundColor: formData.secondaryColor || '#c084fc' }} />
                  <StyledLabel className="block text-sm">Secondary Color</StyledLabel>
                </StyledColorLabel>
                <StyledColorInput
                  type="color"
                  name="secondaryColor"
                  value={formData.secondaryColor || '#c084fc'}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <StyledLabel>Background Color</StyledLabel>
                <StyledColorLabel>
                  <StyledColorPreview style={{ backgroundColor: formData.backgroundColor || '#fff' }} />
                  <StyledLabel className="block text-sm">Background Color</StyledLabel>
                </StyledColorLabel>
                <StyledColorInput
                  type="color"
                  name="backgroundColor"
                  value={formData.backgroundColor || '#fff'}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <StyledLabel>Body Text Color</StyledLabel>
                <StyledColorLabel>
                  <StyledColorPreview style={{ backgroundColor: formData.bodyTextColor || '#222' }} />
                  <StyledLabel className="block text-sm">Body Text Color</StyledLabel>
                </StyledColorLabel>
                <StyledColorInput
                  type="color"
                  name="bodyTextColor"
                  value={formData.bodyTextColor || '#222'}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <StyledLabel>Header Text Color</StyledLabel>
                <StyledColorLabel>
                  <StyledColorPreview style={{ backgroundColor: formData.headerTextColor || '#222' }} />
                  <StyledLabel className="block text-sm">Header Text Color</StyledLabel>
                </StyledColorLabel>
                <StyledColorInput
                  type="color"
                  name="headerTextColor"
                  value={formData.headerTextColor || '#222'}
                  onChange={handleInputChange}
                />
              </div>
            </StyledSettingsGrid>
          </StyledSettingsSection>

          <StyledSettingsSection>
            <StyledLabel className="block mb-2">Page Defaults</StyledLabel>
            <StyledSettingsGrid>
              <div>
                <StyledLabel htmlFor="defaultPageDisplayMode" className="block">Default Page Display Mode</StyledLabel>
                <StyledSelect
                  name="defaultPageDisplayMode"
                  value={formData.defaultPageDisplayMode || 'icon'}
                  onChange={handleInputChange}
                >
                  <option value="icon">Icon</option>
                  <option value="hotspot">Hotspot</option>
                  <option value="list">List</option>
                  <option value="image">Image</option>
                  <option value="window">Window</option>
                </StyledSelect>
              </div>
              <div>
                  <StyledLabel htmlFor="pageDisplayStyle" className="block">Page Display Style</StyledLabel>
                      <p style={{fontSize: '14px'}}>Select where your pages open</p>
                  <StyledSelect
                      name="pageDisplayStyle"
                      value={formData.defaultPageStyles.pageDisplayStyle || 'pagePositionModal'}
                      onChange={handlePageStylesChange}
                  >
                      <option value="page-position-modal">At Page Position</option>
                      <option value="center-modal">At Center</option>
                  </StyledSelect>
              </div>
              <div>
                <StyledLabel>Hotspot Size</StyledLabel>
                <StyledNumberInput
                  type="number"
                  name="hotspotSize"
                  value={formData.hotspotSize || 15}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <StyledLabel>Hotspot Color</StyledLabel>
                <StyledColorLabel>
                  <StyledColorPreview style={{ backgroundColor: formData.hotspotColor || '#9333ea' }} />
                  <StyledLabel className="block text-sm">Hotspot Color</StyledLabel>
                </StyledColorLabel>
                <StyledColorInput
                  type="color"
                  name="hotspotColor"
                  value={formData.hotspotColor || '#9333ea'}
                  onChange={handleInputChange}
                />
              </div>
            </StyledSettingsGrid>
          </StyledSettingsSection>

          {message.text && (
            <StyledMessage className={message.type}>{message.text}</StyledMessage>
          )}

          <div className="flex gap-4 mt-6">
            <StyledSubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Settings'}
            </StyledSubmitButton>
            <button type="button" className="default-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </StyledForm>
      </div>
    </ModalWrapper>
  );
};

export default EditSpaceModal;