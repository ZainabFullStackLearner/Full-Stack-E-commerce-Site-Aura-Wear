
import React from 'react'
import Image from 'next/image';
import card from "../../../public/images/Rectangle 3.png"
import Link from 'next/link';
import Scroll from './scroll';


const Hero = () => {
  return (
    <div>
  <div className="bg-[url('/images/Frame%201361.png')] bg-cover bg-center h-[90vh] w-full ">
    <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center gap-5  md:items-start lg:items-start px-4 md:pl-16 lg:pl-20">
                    
      <p className="text-white text-base  text-center md:text-left lg:text-left">
        Made in Pakistan, Dedicated to Pakistan
      </p>
      
      <h1 className="text-white text-4xl md:text-6xl font-logo text-center md:text-left lg:text-left text-wrap lg:w-2xl">
        DISCOVER THE ART OF DRESSING UP
      </h1>
     
   
  </div>
 <aside className="hidden md:block top-1/2 absolute lg:left-[65%] md:left-[50%] transform -translate-y-1/2 z-50 md:top-2/3">
  <div className="flex flex-row-reverse bg-white w-[18rem] md:w-[21rem] shadow-md">
    <div className="flex flex-col gap-2 md:gap-5 lg:gap-6 p-4">
      <h2 className="font-logo font-bold">MID LENGTH TOP</h2>
      <p className="text-gray-500">Only on 1499 PKR!</p>
      <Link href="/" className="underline decoration-gray-400 text-sm font-sans text-gray-700 md:pt-7">
        SHOP NOW
      </Link>
    </div>
    <Image src={card} alt="dress" className="w-1/2 object-cover" />
  </div>
</aside>


    </div>
    
   <Scroll />
    </div>

  )
}

export default Hero
