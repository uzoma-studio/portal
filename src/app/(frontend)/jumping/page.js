'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getSpaces } from '../../../../data/fetchContent.server'
import Header from '@/components/Header'

const Page = () => {
    const [spaces, setSpaces] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchSpaces = async () => {
            try {
                const response = await getSpaces()
                setSpaces(response.docs)
            } catch (error) {
                console.error('Error fetching spaces:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchSpaces()
    }, [])

    if (loading) {
        return <div className="fixed inset-0 flex items-center justify-center">
                    <p className="text-2xl font-display animate-pulse">
                        Loading Spaces...
                    </p>
                </div>
    }

    return (
        <>
            <Header />
            <div className="min-h-screen p-8">

                <h2 className="text-center text-3xl font-semibold text-gray-800 mb-8 bg-[#ccc] ">
                    Portal Jumping
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {spaces.map((space) => (
                        <Link 
                            key={space.id} 
                            href={`/${space.domain}`}
                            className="flex flex-col items-center no-underline text-inherit transition-transform duration-200 hover:-translate-y-1"
                        >
                            <div className="w-[150px] h-[150px] rounded-full bg-gray-200 mb-4 overflow-hidden flex items-center justify-center shadow-md">
                                <span>Space</span>
                            </div>
                            <h2 className="text-xl text-center m-0 text-gray-900">
                                {space.name}
                            </h2>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default Page