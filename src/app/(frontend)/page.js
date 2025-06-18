'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/AuthProvider';
import { useRouter } from 'next/navigation';

const features = [
  {
    number: '01',
    title: <>
      Create Your <span className="italic">World</span>
    </>,
    desc: 'Design a customizable virtual environment that reflects your style.'
  },
  {
    number: '02',
    title: <>
      Add Your <span className="italic">Content</span>
    </>,
    desc: 'Place objects that visitors can click to explore posts, pages, products and other content.'
  },
  {
    number: '03',
    title: <>
      Invite Your <span className="italic">Community</span>
    </>,
    desc: 'Invite your audience to interact with you, with one another and with the world you have created.'
  },
];


const Home = () => {
  
  const { user } = useAuth()
  const router = useRouter();

  useEffect(() => {
    if(user){
      router.push('/jumping')
    }
  }, [])
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto px-4 pt-24 pb-20 text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 mb-6 font-mono tracking-tight">
            Design your digital <span className="text-purple-500">world</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-gray-700 font-normal max-w-2xl mx-auto">
            Create immersive virtual spaces to showcase your art, products, or ideas and build your community. No coding required.
          </p>
          <div className="mt-10">
            <Link
              href="/auth"
              className="inline-block px-8 py-3 rounded-lg bg-purple-500 text-white font-mono text-lg font-semibold shadow-md hover:bg-purple-600 transition"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="max-w-5xl mx-auto w-full flex flex-col md:flex-row justify-center items-start gap-10 md:gap-0 pb-24">
          {features.map((feature, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center text-center px-4">
              {/* Gradient Circle Number */}
              <div className="mb-4">
                <span className="inline-flex items-center justify-center w-16 h-16 rounded-full border-4 border-transparent bg-white" style={{
                  background: 'conic-gradient(from 180deg at 50% 50%, #a855f7 0deg, #ec4899 120deg, #6366f1 240deg, #a855f7 360deg)'
                }}>
                  <span className="w-14 h-14 flex items-center justify-center rounded-full bg-white text-lg font-mono font-bold text-gray-900 border-2 border-white">
                    {feature.number}
                  </span>
                </span>
              </div>
              <h3 className="text-xl font-mono font-bold mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-base font-normal max-w-xs">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="w-full bg-white border-t border-gray-100 py-20">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-3xl sm:text-4xl font-mono font-extrabold text-gray-900 mb-4">
              Ready to get started?
            </h2>
            <p className="mt-2 text-lg text-gray-700 mb-8">
              Join creators and communities using Portal to design their own digital worlds.
            </p>
            <Link
              href="/auth"
              className="inline-block px-8 py-3 rounded-lg bg-purple-500 text-white font-mono text-lg font-semibold shadow-md hover:bg-purple-600 transition"
            >
              Start Your Journey
            </Link>
          </div>
        </div>
    </div>
  );
}

export default Home