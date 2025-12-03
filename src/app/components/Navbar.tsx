"use client"
import React from 'react'
import Link from 'next/link'
import Drop from './Drop'
import Mobile from './Mobile'
import { CgShoppingCart ,CgProfile} from 'react-icons/cg'
import { useCart } from '../context/Context'
import { UserButton, SignInButton, SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs'

const Navbar = () => {
    const { totalItems } = useCart();
  return (
    <div className="w-full">
      {/* Navbar Wrapper */}
      <div className="px-4 md:py-4 flex justify-between items-center absolute top-10 md:top-5 left-0 w-full bg-gradient-to-r from-[#883900]/10 via-[#d8a979]/70 to-[#f5e9dc]/50 opacity-95 backdrop-blur-md z-[100]">

        {/* Logo */}
        <Link
          href="/"
          className="text-xl md:text-2xl lg:text-3xl font-medium text-[#883900] font-logo opacity-100 z-50"
        >
          A<span className="text-white">uraWear</span>
        </Link>

        {/* Desktop Navbar */}
        <nav className="hidden md:flex gap-8 text-white cursor-pointer justify-center flex-1 items-center">
          <Link href="/">Home</Link>
          <Link href="/About">About</Link>
          <Link href="/Sale">Sale</Link>

          <Drop />

          {/* Cart Icon */}
          <Link href="/cart" className='flex items-center gap-1'>
            <CgShoppingCart size={24} />
            {totalItems > 0 && <span className='absolute ml-5 mb-5 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs'>{totalItems}</span>}
          </Link>

          {/* Auth Section */}
          <SignedIn>
            <UserButton />
          </SignedIn>

          <SignedOut>
            <div className="flex items-center gap-4">
              <SignInButton mode="modal">
                <button className="flex items-center gap-2 px-3 py-1 border rounded-lg hover:bg-white/20 transition">
                  <CgProfile size={20} />
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="px-3 py-1 border rounded-lg bg-white text-[#883900] hover:bg-gray-100 transition">
                  Sign Up
                </button>
              </SignUpButton>
            </div>
          </SignedOut>
        </nav> 

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Mobile />
        </div>
      </div>
    </div>
  )
}

export default Navbar
