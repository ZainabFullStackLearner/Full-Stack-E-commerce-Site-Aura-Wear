import Link from 'next/link';
import React from 'react';
import Womens from '../Women/women';
const Catalog = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 md:px-8 mt-20  ">
        {/* LEFT SIDE */}
        <div className="flex flex-col gap-4">
          <div className="bg-[url('/images/formal-woman.jpg')] bg-center bg-cover h-[40vh] md:h-[45vh] rounded-md">
            <div className="bg-black/30 h-full w-full flex items-center justify-center">
              <Link href="/Kids">
                <h3 className="text-white font-logo text-3xl md:text-4xl text-center">FORMAL KIDS</h3>
              </Link>
            </div>
          </div>
          <div className="bg-[url('/images/formal-men.png')] bg-center bg-cover h-[40vh] md:h-[45vh] rounded-md">
            <div className="bg-black/30 h-full w-full flex items-center justify-center">
              <Link href="/Mens">
                <h3 className="text-white font-logo text-3xl md:text-4xl text-center">FORMAL MEN</h3>
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="bg-[url('/images/casual-style.png')] bg-center bg-cover h-[40vh] md:h-[92vh] rounded-md">
          <div className="bg-black/30 h-full w-full flex items-center justify-center">
            <Link href="/Womens">
              <h2 className="text-white font-logo text-3xl md:text-5xl text-center">CASUAL STYLE</h2>
            </Link>
          </div>
        </div>
      </div>
      <div className='mt-20'>
<Womens/>
</div>
<div>

</div>

    </div>
  );
};


export default Catalog;
