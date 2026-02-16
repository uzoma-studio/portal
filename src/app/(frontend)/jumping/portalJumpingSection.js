'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { getSpaces } from '../../../../data/fetchContent.server'

const PortalJumpingSection = () => {
    const [spaces, setSpaces] = useState([])

    useEffect(() => {
        const fetchSpaces = async () => {
            try {
                const response = await getSpaces()
                setSpaces(response.docs)
            } catch (error) {
                console.error('Error fetching spaces:', error)
            }
        }

        fetchSpaces()
    }, [])

    return (
      <>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold -mt-8 leading-tight text-indigo-900 w-full text-center">
          Portal Jumping
        </h1>
        <p className="text-lg sm:text-xl font-normal text-gray-800 mb-10 w-full text-center">
          Jump between different creative spaces built by the Portal community.
        </p>
        {/* Spaces Grid Section */}
        <section className="w-full max-w-7xl mx-auto px-4 py-8 flex flex-col items-start">
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-12 w-full">
            {spaces.map((space) => {
              const circleStyle = { background: space.settings?.theme?.style?.backgroundColor };
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
      </>
    )
}

export default PortalJumpingSection