'use client'
import React from 'react'
import { FaAnglesDown } from 'react-icons/fa6';
const Scroll = () => {
  return (
    <div className='absolute inset-0 flex flex-col items-center justify-center px-4 md:pl-16 lg:pl-20 top-[39%] md:top-[54%]'><button
  onClick={() => {
    window.scrollBy({
      top: 1200, // jitna niche scroll karna hai (px)
      behavior: "smooth", // smooth animation
    });
  }}
>
  <h4 className="text-white text-center md:text-left lg:text-left text-nowrap flex">
    scroll down &nbsp; <span className="pt-1"><FaAnglesDown/></span>
  </h4>
</button>
</div>
  )
}

export default Scroll