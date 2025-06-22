'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import { headers } from 'next/headers'

const payload = await getPayload({ config })

export const getCurrentSpace = async (spaceName) => {
    try {
        const space = await payload.find({
            collection: 'spaces',
            where: {
                domain: {
                    equals: spaceName
                }
            }
        })

        if (space.docs.length > 0) {
            return space.docs[0]
        }
        
        return null
    } catch (error) {
        console.error('Error fetching space:', error)
        return null
    }
}

export const getSpaces = async () => {
    try {
        const spaces = await payload.find({
            collection: 'spaces',
            sort: '-createdAt'
        })
        return spaces
    } catch (error) {
        console.error('Error fetching spaces:', error)
        return { docs: [] }
    }
}

export const fetchPages = async (spaceId) => {
    const result = await payload.find({
        collection: 'pages',
        where: {
            space: {
                equals: spaceId
            }
        }
    })
    return result
}

export const getContent = async (type, limit=10) => {
    const result = await payload.find({
        collection: type,
        limit
    })
    return result
}

export const getContentByPageContentType = async (type, contentTypeId, sortFn='-createdAt', limit=10) => {
    const result = await payload.find({
        collection: type,
        sort: sortFn,
        limit,
        where: {
            id: {
                equals: contentTypeId
            }
        }
    })
    return result
}

export const getContentBySpaceId = async (type, spaceId, sortFn='-createdAt', limit=10) => {
    const result = await payload.find({
        collection: type,
        sort: sortFn,
        limit,
        where: {
            space: {
                equals: spaceId
            }
        }
    })
    return result
}

export const getPostsByUpdate = async(updateId) => {
    const results = await payload.find({
        collection: 'posts',
        where: {
            update: {
                equals: updateId,
            },
        },
        sort: '-date',
    });

    return results;
}