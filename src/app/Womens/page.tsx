import React from "react";
import FullWomensShop from "../FullShopwomens/page";
import Breadcrumb from "../components/Breadcrumb";
import Womenscatalog from "../components/WomenCatalog";
const WomensShop = () => {
  return (
    <div>
      {/* Enhanced Breadcrumb Section */}
      <Breadcrumb
        items={[
          { label: " Home", href: "/" },
          { label: "Women's", href: "/Womens" },
          { label: "SHOP ALL", href: "/Womens" }
        ]}
      />
          {/* Subtle decorative element */}
        
       
      
      <Womenscatalog />
      <FullWomensShop />
    </div>
  );
};

export default WomensShop;
