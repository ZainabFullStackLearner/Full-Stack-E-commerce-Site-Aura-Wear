import React from "react";
import { HiThumbUp } from "react-icons/hi";
import { FaPhone } from "react-icons/fa6";
import { BsRocketTakeoffFill } from "react-icons/bs";
import { MdPayment } from "react-icons/md";

const Service = () => {
  return (
    <div className="bg-neutral-200 px-4 py-8 mt-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {/* Left Vertical Card */}
        <div className="bg-white shadow-md p-6 flex flex-col items-center text-center hover:transition-transform duration-300 hover:scale-105">
          <div className="bg-[#8b4513] w-14 h-14 rounded-full flex items-center justify-center mb-4 ">
            <HiThumbUp size={28} color="white" />
          </div>
          <h2 className="font-semibold mb-2">100% Satisfaction Guaranteed</h2>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, nobis?
          </p>
        </div>

        {/* Center: Two stacked horizontal cards */}
        <div className="flex flex-col gap-4">
          {/* Top */}
          <div className="bg-white shadow-md p-6 flex items-start gap-4  hover:transition-transform duration-300 hover:scale-105">
            <div className="bg-[#8b4513] w-14 h-14 rounded-full flex items-center justify-center ">
              <FaPhone size={24} color="white" />
            </div>
            <div>
              <h2 className="font-semibold">24/7 Online Service</h2>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </p>
            </div>
          </div>

          {/* Bottom */}
          <div className="bg-white shadow-md p-6 flex items-start gap-4  hover:transition-transform duration-300 hover:scale-105">
            <div className="bg-[#8b4513] w-14 h-14 rounded-4xl flex items-center justify-center ">
              <BsRocketTakeoffFill size={24} color="white" />
            </div>
            <div>
              <h2 className="font-semibold">Fast Delivery</h2>
              <p className="text-sm text-gray-600">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </p>
            </div>
          </div>
        </div>

        {/* Right Card */}
        <div className="bg-white shadow-md p-6 flex flex-col items-center text-center  hover:transition-transform duration-300 hover:scale-105">
          <div className="bg-[#8b4513] w-14 h-14 rounded-full flex items-center justify-center mb-4 ">
            <MdPayment size={28} color="white" />
          </div>
          <h2 className="font-semibold mb-2">Payment with Secure System</h2>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis, nobis?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Service;
