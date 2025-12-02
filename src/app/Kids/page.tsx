import React from 'react'

import Kids_catalog from '../components/Kids_catalog'
import FullKidsShop from '../components/Kidsfullshop'
import Breadcrumb from '../components/Breadcrumb'
const Kids = () => {
  return (
    <div>
      {/* Enhanced Breadcrumb Section */}
      <Breadcrumb
        items={[
          { label: " Home", href: "/" },
          { label: "Kids", href: "/Kids" },
          { label: "SHOP ALL" }
        ]}
      />

    <Kids_catalog />
    <FullKidsShop />
    </div>
  )
}

export default Kids