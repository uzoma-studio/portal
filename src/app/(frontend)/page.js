'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import PortalJumpingSection from './jumping/portalJumpingSection'
import AuthButton from '@/widgets/Authentication/AuthButton'
import UserProfile from '@/widgets/Authentication/UserProfile'
import AuthModal from '@/widgets/Authentication/AuthModal'
import { useAuth } from '@/context/AuthProvider'

const features = [
  {
    number: '01',
    title: 'Create Your World',
    desc: 'Design a customizable virtual environment that reflects your style.'
  },
  {
    number: '02',
    title: 'Add Your Content',
    desc: 'Place objects that visitors can interact with to explore posts, pages, products and other content.'
  },
  {
    number: '03',
    title: 'Invite Your Community',
    desc: 'Invite your audience to interact with you and with the world you have created.'
  },
];

const Home = () => {
  const { user } = useAuth()
  const [showAuthModal, setShowAuthModal] = useState(false)
  
  return (
    <div className="min-h-screen flex flex-col text-indigo-900 bg-yellow-50">
      {/* Fixed Header at Top */}
      <header className="w-full px-4 py-4 max-w-7xl mx-auto">
        <div className="flex items-center w-full">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Portal Logo" width={48} height={48} className="mr-3" />
            <span className="text-2xl font-mono font-normal tracking-wide">Portal</span>
          </Link>
          <div className="ml-auto flex items-center gap-4">
            {user && (
              <Link 
                href="/create"
                className="px-4 py-2 rounded-lg bg-purple-500 text-white font-mono text-sm font-semibold shadow-md hover:bg-purple-600 transition"
              >
                Create a Space
              </Link>
            )}
            {user ? <UserProfile /> : <AuthButton />}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full flex flex-col justify-center items-center px-4 max-w-7xl mx-auto pb-24 pt-24">
          <div className="mb-8 flex justify-center">
            <div className="w-full max-w-2xl h-80 bg-gradient-to-br from-purple-200 to-pink-200 rounded-lg flex items-center justify-center">
              <Image 
                src="/portal-hero.gif" 
                alt="Portal Hero" 
                width={640} 
                height={360}
                className="rounded-lg object-cover border border-purple-500 shadow-lg animate-fade-in"
              />
            </div>
          </div>
          <div className="w-[100%] text-center md:text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mt-10 mb-6 leading-tight text-indigo-900 text-center md:text-center">
              Design a webspace<br />that feels like you
            </h1>
            <p className="text-lg sm:text-xl font-normal text-gray-800 mb-10 w-[60%] ml-[20%] my-9 text-center md:text-center">
              Portal allows artists, designers and creators build interactive digital spaces that capture their creative essence
            </p>
            <div className="flex justify-center gap-4 mb-8">
              <Link href="/#explore" className="px-8 py-3 rounded-lg bg-purple-500 text-white font-mono text-lg font-semibold shadow-md hover:bg-purple-600 transition text-center">
                Explore
              </Link>
            </div>
          </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full max-w-6xl mx-auto px-4 py-8 flex flex-col items-start align-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-14 text-center text-indigo-900 w-full">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-start items-stretch w-full gap-12 md:gap-0">
          {features.map((feature, idx) => (
            <div key={idx} className="flex-1 flex flex-col text-center px-4">
              {/* Gradient Circle Number */}
              <div className="mb-4">
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full border-2 border-transparent" style={{
                  background: 'conic-gradient(from 180deg at 50% 50%, #a855f7 0deg, #ec4899 120deg, #6366f1 240deg, #a855f7 360deg)'
                }}>
                  <span className="w-14 h-14 flex items-center justify-center rounded-full text-lg font-mono font-bold border-2 border-black text-gray-200">
                    {feature.number}
                  </span>
                </span>
              </div>
              <h3 className="text-xl font-mono font-bold mb-2 text-center text-indigo-900">
                {feature.title}
              </h3>
              <p className="text-gray-800 text-base font-normal max-w-xs text-center">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className='my-32' id="explore">
        <PortalJumpingSection />
      </div>

      {/* Get Started Button */}
      <section className="w-full flex justify-center items-center py-12">
        {user ? (
          <Link 
            href="/create"
            className="px-10 py-4 rounded-lg bg-purple-500 text-white font-mono text-lg font-semibold shadow-md hover:bg-purple-600 transition"
          >
            Create a Space
          </Link>
        ) : (
          <button 
            onClick={() => setShowAuthModal(true)}
            className="px-10 py-4 rounded-lg bg-purple-500 text-white font-mono text-lg font-semibold shadow-md hover:bg-purple-600 transition"
          >
            Get Started
          </button>
        )}
      </section>

      { setShowAuthModal && <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />}

      {/* Footer Section */}
      <footer className="w-full py-8 flex flex-col items-center border-t border-gray-800 mt-auto">
        <span className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Portal. All rights reserved.</span>
      </footer>
    </div>
  );
}

export default Home