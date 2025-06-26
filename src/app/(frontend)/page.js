'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const features = [
  {
    number: '01',
    title: 'Create Your World',
    desc: 'Design a customizable virtual environment that reflects your style.'
  },
  {
    number: '02',
    title: 'Add Your Content',
    desc: 'Place objects that visitors can click to explore posts, pages, products and other content.'
  },
  {
    number: '03',
    title: 'Invite Your Community',
    desc: 'Invite your audience to interact with you, with one another and with the world you have created.'
  },
];

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col text-indigo-900">
      {/* Hero Section */}
      <header className="w-full flex-1 flex flex-col justify-center items-start px-4 max-w-7xl mx-auto pt-44 pb-44">
        <div className="flex items-center absolute top-4">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Portal Logo" width={48} height={48} className="mr-3" />
            <span className="text-2xl font-mono font-normal tracking-wide">Portal</span>
          </Link>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mt-10 mb-6 leading-tight text-indigo-900">
          Design a webspace<br />that feels like you
        </h1>
        <p className="text-lg sm:text-xl font-normal text-gray-800 mb-10 max-w-xl text-left">
          Portal allows artists, designers and creators build interactive digital spaces that capture their creative essence
        </p>
        <div className="flex gap-4 mb-8">
          <Link href="/#cta" className="px-8 py-3 rounded-lg bg-purple-500 text-white font-mono text-lg font-semibold shadow-md hover:bg-purple-600 transition text-left">
            Get Started
          </Link>
          <Link href="/jumping" className="px-8 py-3 rounded-lg bg-purple-500 text-white font-mono text-lg font-semibold shadow-md hover:bg-purple-600 transition text-left">
            Explore
          </Link>
        </div>
      </header>

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

      {/* Sign Up Form Embed Section (Blank) */}
      <section className="w-full py-20 flex flex-col items-start justify-center max-w-4xl mx-auto mt-10 mb-10" id="cta">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-14 text-center text-indigo-900 w-full">Sound Exciting?</h2>
        <p className="text-lg sm:text-xl font-normal text-gray-800 mb-10 w-full text-center">
          Sign up and be ready to jump into the Portal when we launch
        </p>
        <iframe 
          src="https://tally.so/embed/3Xyd6Y?hideTitle=1&transparentBackground=1&dynamicHeight=1"
          loading="lazy"
          width="100%"
          height="579"
          frameBorder="0"
          marginHeight="0" 
          marginWidth="0"
          title="Portal Sign Up"
        ></iframe>
      </section>

      {/* Footer Section */}
      <footer className="w-full py-8 flex flex-col items-center border-t border-gray-800 mt-auto">
        <span className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Portal. All rights reserved.</span>
      </footer>
    </div>
  );
}

export default Home