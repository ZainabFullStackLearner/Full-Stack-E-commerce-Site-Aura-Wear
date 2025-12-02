'use client'

import React, { useState, useEffect } from 'react'
import { RiArrowDropDownFill } from 'react-icons/ri'
import Link from 'next/link'

const Drop = () => {
  const [isOpen, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div
      className={`relative ${isMobile ? 'w-full' : 'flex'}`}
      onMouseEnter={() => !isMobile && setOpen(true)}
      onMouseLeave={() => !isMobile && setOpen(false)}
    >
     <button
  onClick={() => isMobile && setOpen(!isOpen)}
  className="flex"
>
  Catalog<RiArrowDropDownFill size={24} />
  
</button>


      {isOpen && (
        <ul className={`${isMobile ? 'mt-2 text-center text-black  absolute  bg-white right-6 shadow rounded w-40 ' : 'absolute top-full left-0 bg-white shadow rounded w-40 z-10 text-black'}`}>

          <li className="hover:bg-gray-100 px-4 py-2">
            <Link href="/Mens">Mens</Link>
          </li>
          <li className="hover:bg-gray-100 px-4 py-2">
            <Link href="/Womens">Womens</Link>
          </li>
          <li className="hover:bg-gray-100 px-4 py-2">
            <Link href="/Kids">Kids</Link>
          </li>
        </ul>
      )}
    </div>
  )
}

export default Drop
