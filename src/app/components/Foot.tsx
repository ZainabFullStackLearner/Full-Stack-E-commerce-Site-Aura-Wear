import React from 'react'

const Foot = () => {
  return (
    <footer className="bg-[#833d0b] w-full pt-16 md:pt-24 px-4 md:px-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between flex-wrap gap-10">
          {/* Brand Info */}
          <div className="flex-1 min-w-[250px]">
            <h2 className="font-logo text-white font-bold text-3xl md:text-4xl mb-3">AURAWEAR</h2>
            <p className="text-sm text-white">Whatsapp: +92 123 456778</p>
            <p className="text-sm text-white">Email: hello@aurawear.com</p>
            <p className="text-sm text-white">
              Address: Lorem ipsum dolor, consectetur Block 4, Pakistan 1234
            </p>
          </div>

          {/* Menu Links */}
          <div className="flex flex-1 flex-wrap gap-10 justify-between min-w-[250px]">
            <div>
              <h3 className="text-white text-lg font-semibold mb-2">Menu</h3>
              {['Sale', 'New Arrivals', 'Formal Mens', 'Formal Womens', 'Casual Mens', 'Casual Womens'].map((item) => (
                <p key={item} className="text-white text-sm font-sans hover:underline cursor-pointer">
                  {item}
                </p>
              ))}
            </div>

            {/* Help Links */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-2">Get Help</h3>
              {['FAQs', 'Customer Services', 'Return and Refund', 'Terms and Conditions', 'Shipping'].map((item) => (
                <p key={item} className="text-white text-sm font-sans hover:underline cursor-pointer">
                  {item}
                </p>
              ))}
            </div>

            {/* Account Links */}
            <div>
              <h3 className="text-white text-lg font-semibold mb-2">Account</h3>
              {['My Account', 'My Order', 'Vouchers and Discount'].map((item) => (
                <p key={item} className="text-white text-sm font-sans hover:underline cursor-pointer">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="border-t border-white/20 mt-10 pt-4 text-center">
          <p className="text-sm text-white">© {new Date().getFullYear()} All Rights Reserved by AuraWear</p>
        </div>
      </div>
    </footer>
  )
}

export default Foot
