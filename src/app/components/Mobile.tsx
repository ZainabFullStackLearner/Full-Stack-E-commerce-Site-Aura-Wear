'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useUser, SignInButton, UserButton } from '@clerk/nextjs'

import Drop from './Drop'
import { CgClose, CgMenu } from 'react-icons/cg'
import { FiShoppingCart, FiUser } from 'react-icons/fi'

const Mobile = () => {
  const [mobileOpen, setIsOpen] = useState(false)
  const { isSignedIn, user } = useUser()

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileOpen])

  return (
    <header className="md:hidden z-50 relative shadow-sm">
      {/* Top bar with toggle button */}
      <div className="px-4 py-3 flex justify-end">
        <button
          onClick={() => setIsOpen(!mobileOpen)}
          aria-label="Toggle Menu"
          className="text-gray-700 p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {mobileOpen ? <CgClose size={24} /> : <CgMenu size={24} />}
        </button>
      </div>

      {/* Mobile Fullscreen Menu */}
      <div className={`
        fixed top-0 left-0 w-full h-screen bg-white  z-40 
        transition-all duration-300 ease-in-out flex flex-col
        ${mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `}>
        
        {/* Close button header */}
        <div className="flex justify-end px-6 py-4">
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close Menu"
            className="text-gray-500 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <CgClose size={24} />
          </button>
        </div>

        {/* Navigation Items - Centered and aligned */}
        <nav className="flex-grow flex flex-col items-center justify-center gap-1 px-6">
          <Link 
            href="/" 
            onClick={() => setIsOpen(false)}
            className="w-full max-w-xs py-4 text-center text-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all"
          >
            Home
          </Link>
          
          <Link 
            href="/About" 
            onClick={() => setIsOpen(false)}
            className="w-full max-w-xs py-4 text-center text-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all"
          >
            About
          </Link>
          
          <div className="">
            <Drop />
          </div>
          
          <Link 
            href="/Sale" 
            onClick={() => setIsOpen(false)}
            className="w-full max-w-xs py-4 text-center text-lg font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all animate-caret-blink"
          >
            Sale
          </Link>

          {/* Auth Section */}
          <div className="w-full max-w-xs py-4">
            {isSignedIn ? (
              <div className="flex items-center justify-center gap-3 p-3">
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: "w-8 h-8"
                    }
                  }}
                />
                <span className="text-sm font-medium text-gray-700">
                  {user.firstName || user.emailAddresses[0]?.emailAddress}
                </span>
              </div>
            ) : (
              <SignInButton mode="modal">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-4 text-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all"
                >
                  <FiUser size={18} />
                  Sign In
                </button>
              </SignInButton>
            )}
          </div>

          {/* Cart */}
          <Link 
            href="/cart" 
            onClick={() => setIsOpen(false)}
            className="w-full max-w-xs flex items-center justify-center gap-2 py-4 text-lg font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-all"
          >
            <div className="relative">
              <FiShoppingCart size={18} />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </div>
            Cart
          </Link>
        </nav>
      </div>

      {/* Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-10 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  )
}

export default Mobile