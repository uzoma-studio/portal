import React from 'react'
import SinglePage from '@/content/singlePage'
import RenderPages from '@/utils/renderPages'

const WindowDisplay = ({ pageData, pageConfig, spaceTheme }) => {
    
  return (
    <RenderPages>
        <SinglePage
            pageData={pageData}
            pageConfig={{
                ...pageConfig,
                size: { width: pageConfig.size.width / 3, height: pageConfig.size.height / 1.66 },
                style: {
                    ...pageConfig.style,
                    pageDisplayStyle: 'page-position-modal' //Ensure that for this display mode, the window is always shown where it has been positioned
                }
            }}
            spaceTheme={spaceTheme}
            isDisplayMode={true}
        />
    </RenderPages>
  )
}

export default WindowDisplay