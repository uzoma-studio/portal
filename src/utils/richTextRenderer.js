// Rich Text Renderer: https://payloadcms.com/docs/rich-text/converting-jsx

import {RichText as RichTextConverter} from '@payloadcms/richtext-lexical/react'

const RichText = ({ data }) => {
    return (
        <RichTextConverter
            data={data}
            converters={({ defaultConverters }) => ({
                ...defaultConverters,
                // Custom converter for our Lexical ImageNode (type: 'image')
                image: ({ node }) => {
                    if (!node) return null

                    const src = node.src
                    const altText = node.altText || ''
                    const size = node.size || 'medium'

                    if (!src) return null

                    let maxWidth = '100%'
                    if (size === 'small') {
                        maxWidth = '25%'
                    } else if (size === 'medium') {
                        maxWidth = '50%'
                    } else if (size === 'large') {
                        maxWidth = '100%'
                    }

                    return (
                        <img
                            src={src}
                            alt={altText}
                            style={{ maxWidth, height: 'auto', display: 'block', margin: '0.5rem 0' }}
                        />
                    )
                },
            })}
        />
    )
}

export default RichText