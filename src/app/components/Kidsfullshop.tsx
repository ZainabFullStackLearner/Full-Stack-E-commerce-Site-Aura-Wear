import React from "react";
import CardMens from "./All_products_card";
import { kids } from "@/sanity/lib/fetch";
import { client } from "@/sanity/lib/client";

const FullKidsShop = async () => {
  const shopFull = await client.fetch(kids);

  return (
    <div>
      <CardMens items={shopFull} />
    </div>
  );
};

export default FullKidsShop;
