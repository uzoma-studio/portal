'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

// TODO:  Set authorisation so that only space owner can use these functions

export const createEntry = async (entryType, data) => {

    try {
        const entry = await payload.create({
            collection: entryType, // required
            data, 
        }) 
        return entry
    } catch (error) {
        console.error('Error creating page:', error)
        return null
    }
}

// TODO: Replace updatePage use across codebase with updateEntry
export const updatePage = async (pageId, pageData) => {    
    try {
        const page = await payload.update({
            collection: 'pages',
            where: {
                id: {
                    equals: pageId
                }
            },
            data: pageData,
        })
        return page.docs[0]
    } catch (error) {
        console.error('Error updating page:', error)
        return null
    }
}

export const updateEntry = async (entryType, entryId, entryData) => {    
    try {
        const entry = await payload.update({
            collection: entryType,
            where: {
                id: {
                    equals: entryId
                }
            },
            data: entryData,
        })
        return entry.docs[0]
    } catch (error) {
        console.error(`Error updating ${entryType}:`, error)
        return null
    }
}