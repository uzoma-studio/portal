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
import themeSettings from '../../../../themeSettings.json'
import { updateEntry } from 'data/createContent.server';
import { handleMediaUpload } from '@/utils/helpers';
import ModalWrapper from './ModalWrapper';

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
    const defaultBgImage = useRef(settings?.backgroundImage).current;

    const [formData, setFormData] = useState(defaultFormData);
    const [backgroundImage, setBackgroundImage] = useState({ file: settings?.backgroundImage || null, isSet: false })
    const [message, setMessage] = useState({ type: '', text: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleMenuChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      menu: {
        ...prev.menu,
        [name]: type === 'checkbox' ? checked : value,
      },
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
  
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setBackgroundImage({file, isSet: true})
        }
    }

  const handleCancel = () => {
    setSettings({
        ...settings,
        backgroundImage: defaultBgImage,
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

    const handleBgImage = !backgroundImage.isSet ? backgroundImage.file : await handleMediaUpload(backgroundImage.file)

    const spaceData = {
        ...space,
        settings: {
            ...space.settings,
            backgroundImage: handleBgImage,
            theme: {
                style: { ...formData }
            }
        }
    }
    
    try {
        const updatedSpace = await updateEntry('spaces', space.id, spaceData)

        if (updatedSpace?.id) {
            setSettings(spaceData.settings)
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
                text: 'Failed to create page. Please try again.' 
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
    <ModalWrapper tabName='Edit Space' modalCloseFn={modalCloseFn}>
      <div className="mt-4">
        <StyledForm onSubmit={handleSubmit}>
          <StyledSettingsSection>
              <div>
                  <StyledLabel htmlFor="backgroundImage" className="block mb-2">Space Image</StyledLabel>
                  <StyledInput
                      id="backgroundImage"
                      name="backgroundImage"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="w-full"
                  />
              </div>
          </StyledSettingsSection>
          <StyledSettingsSection>
            <StyledLabel className="block mb-2">Menu Settings</StyledLabel>
            <StyledSettingsGrid>
              <div>
                <StyledLabel>Menu Background Color</StyledLabel>
                <StyledColorLabel>
                  <StyledColorPreview style={{ backgroundColor: formData.menu?.backgroundColor || '#ccc' }} />
                  <StyledLabel htmlFor="backgroundColor" className="block text-sm">Background Color</StyledLabel>
                </StyledColorLabel>
                <StyledColorInput
                  type="color"
                  name="backgroundColor"
                  value={formData.menu?.backgroundColor || '#ccc'}
                  onChange={handleMenuChange}
                />
              </div>
              <div>
                <StyledLabel htmlFor="showNewsTicker" className="inline-block" style={{marginRight: '.5rem'}}>Show News Ticker</StyledLabel>
                <input
                  type="checkbox"
                  name="showNewsTicker"
                  checked={!!formData.menu?.showNewsTicker}
                  onChange={handleMenuChange}
                />
              </div>
              <div>
                <StyledLabel htmlFor="showFooter" className="inline-block" style={{marginRight: '.5rem'}}>Show Footer</StyledLabel>
                <input
                  type="checkbox"
                  name="showFooter"
                  checked={!!formData.menu?.showFooter}
                  onChange={handleMenuChange}
                />
              </div>
            </StyledSettingsGrid>
          </StyledSettingsSection>

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
            <StyledLabel className="block mb-2">Theme</StyledLabel>
            <StyledSettingsGrid>
              <div>
                <StyledLabel htmlFor="backgroundMode" className="block">Background Mode</StyledLabel>
                <StyledSelect
                  name="backgroundMode"
                  value={formData.backgroundMode || 'image'}
                  onChange={handleInputChange}
                >
                  <option value="image">Image</option>
                  <option value="color">Color</option>
                  <option value="gradient">Gradient</option>
                </StyledSelect>
              </div>
              <div>
                <StyledLabel htmlFor="backgroundImageRenderMode" className="block">Background Image Render Mode</StyledLabel>
                <StyledSelect
                  name="backgroundImageRenderMode"
                  value={formData.backgroundImageRenderMode || 'background'}
                  onChange={handleInputChange}
                >
                  <option value="background">Background</option>
                  <option value="center">Center</option>
                </StyledSelect>
              </div>

              <div>
                <StyledLabel htmlFor="showEnvironment" className="inline-block" style={{marginRight: '.5rem'}}>Show Environment</StyledLabel>
                <input
                  type="checkbox"
                  name="showEnvironment"
                  checked={!!formData.showEnvironment}
                  onChange={handleInputChange}
                />
              </div>

              <div>
                <StyledLabel htmlFor="environment" className="block">Environment</StyledLabel>
                <StyledSelect
                  name="environment"
                  value={formData.environment || 'icon'}
                  onChange={handleInputChange}
                >
                  <option value="park">Park</option>
                  <option value="night">Night</option>
                  <option value="beach">Beach</option>
                  <option value="ocean">Ocean</option>
                  <option value="city">City</option>
                </StyledSelect>
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
                  <option value="island">Island</option>
                  <option value="windows">Window</option>
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