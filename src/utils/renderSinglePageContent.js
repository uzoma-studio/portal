import React, { useState } from 'react'
import ContentType from '@/content/contentTypes/contentType'
import RichText from './richTextRenderer'
import CloseButton from '@/uiComponents/closeButton'
import ModalWrapper from '@/editor/modals/ModalWrapper'
import AddPageModal from '@/editor/modals/AddPageModal'
import { useSpace } from '@/context/SpaceProvider'

/**
 * RenderSinglePageContent component
 * 
 * This component renders the content of a single page. It displays the page title
 * if provided, any child components passed as children, and a specific content type 
 * component based on the contentType property in pageData.
 * 
 * @param {Object} props - The props object
 * @param {React.ReactNode} props.children - The child components to be rendered within this component
 * @param {Object} props.pageData - The data for the current page
 * @param {string} [props.pageData.title] - The title of the page (optional)
 * @param {string} [props.pageData.contentType] - The type of content to be rendered (optional)
 * 
 * @returns {JSX.Element} The rendered page content
 */

const RenderSinglePageContent = ({ children, pageData, setCurrentPage, isDisplayMode }) => {
  const { title, contentType } = pageData
  // Used to track whether a page is an index page or a sub-page
  const [ isPageIndex, setIsPageIndex ] = useState(true)

  // Used to control whether the page builder opens for creating or editing page
  const [ isModalOpen, setIsModalOpen ] = useState(false)

  const { isCurrentUserSpaceOwner } = useSpace()

  return (
    <div>
        {title && isPageIndex && <h1 className='mb-8'>{pageData.title}</h1> }

        <div>
          {
            isCurrentUserSpaceOwner && !isDisplayMode &&
              <button 
                // Button positioned to the left of close button
                className='text-button' style={{position: 'absolute', top: '2%', left: '85%'}}
                onClick={() => setIsModalOpen(true)}
              >
                Edit
              </button>
          }
          {/* Display a close button if a close function has been provided */}
          { setCurrentPage && <CloseButton closeFn={() => setCurrentPage(null)} position={{x: 95, y: 0}} /> }
        </div>

        { isModalOpen && 
          <ModalWrapper tabName='Edit Page' modalCloseFn={() => setIsModalOpen(false)} isCreatePageMode={false}>
            <AddPageModal isCreatePageMode={false} setIsModalOpen={setIsModalOpen} pageData={pageData} />
          </ModalWrapper>
        }
        
        {isPageIndex && (
          <>
            {children}
            <div className='content'>
              <RichText data={pageData.body} />
            </div>
          </>
        )}
        
        { contentType && contentType !== 'page' && <ContentType pageData={pageData} contentTypeId={pageData[contentType]?.id} setIsPageIndex={setIsPageIndex} />}
    </div>
  )
}

export default RenderSinglePageContent