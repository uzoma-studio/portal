'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getSpaces } from '../../../../data/fetchContent.server'
import Image from 'next/image'
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
        return <div className="fixed inset-0 flex items-center justify-center bg-white">
                    <p className="text-2xl font-mono text-indigo-900 animate-pulse">
                        Loading Spaces...
                    </p>
                </div>
    }

    console.log(spaces);
    

    return (
        <div className="min-h-screen flex flex-col text-indigo-900 bg-yellow-50">
          {/* Hero/Header Section */}
          <header className="w-full flex flex-col justify-center items-start px-4 max-w-7xl mx-auto">
            <Header />
            <div className="flex items-center mb-12">
              <Link href="/" className="flex items-center">
                <Image src="/logo.png" alt="Portal Logo" width={48} height={48} className="mr-3" />
              </Link>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold -mt-8 leading-tight text-indigo-900 w-full text-center">
              Portal Jumping
            </h1>
            <p className="text-lg sm:text-xl font-normal text-gray-800 mb-10 w-full text-center">
              Jump between different creative spaces built by the Portal community.
            </p>
          </header>

          {/* Spaces Grid Section */}
          <section className="w-full max-w-7xl mx-auto px-4 py-8 flex flex-col items-start">
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-12 w-full">
              {spaces.map((space) => {
                // Get background image URL if available
                const bgImageUrl = space.settings?.backgroundImage?.url
                // Get theme colors if available
                const primary = space.settings?.theme?.style?.primaryColor || '#a855f7';
                const secondary = space.settings?.theme?.style?.secondaryColor || '#6366f1';
                // Compose style
                const circleStyle = bgImageUrl
                  ? { backgroundImage: `url(${bgImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                  : { background: `linear-gradient(135deg, ${primary}, ${secondary})` };
                return (
                  <Link 
                    key={space.id} 
                    href={`/${space.domain}`}
                    className="flex flex-col items-center no-underline text-inherit transition-transform duration-200 hover:-translate-y-1 group"
                  >
                    <div
                      className="w-[220px] h-[220px] rounded-full mb-6 overflow-hidden flex items-center justify-center shadow-lg border-4 border-white group-hover:scale-105 transition-transform"
                      style={circleStyle}
                    >
                      <span className="text-white text-4xl font-mono font-bold bg-black/40 px-4 py-2 rounded-full">
                        {space.name?.charAt(0) || 'S'}
                      </span>
                    </div>
                    <h2 className="text-xl text-center m-0 text-indigo-900 font-mono font-semibold">
                      {space.name}
                    </h2>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* Footer Section */}
          <footer className="w-full py-8 flex flex-col items-center border-t border-gray-200 mt-auto">
            <span className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Portal. All rights reserved.</span>
          </footer>
        </div>
    )
}

export default Page