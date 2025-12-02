import React from 'react'
import Categories from '../components/categories'
import FullMensshop from '../ShopMens/page'
import Breadcrumb from '../components/Breadcrumb'

const Mens = () => {
  return (
    <div>
      {/* Enhanced Breadcrumb Section */}
      <Breadcrumb
        items={[
          { label: " Home", href: "/" },
          { label: "Men's", href: "/Mens" },
          { label: "SHOP ALL"}
        ]}
      />
   

      <Categories />
      <FullMensshop />
    </div>
  )
}

export default Mens