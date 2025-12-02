// app/ShopMens/page.tsx
import React from "react";
import CardMens from "../components/All_products_card";
import { mens } from "@/sanity/lib/fetch";
import { client } from "@/sanity/lib/client";

const FullMensshop = async () => {
  const shopFull = await client.fetch(mens);

  return (
    <div>
      <CardMens items={shopFull} />
    </div>
  );
};

export default FullMensshop;
