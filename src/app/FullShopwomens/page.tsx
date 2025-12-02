import React from 'react'
import { client } from "@/sanity/lib/client";
import { womens } from '@/sanity/lib/fetch';
import CardMens from "../components/All_products_card";
const FullWomensShop = async () => {
  const data = await client.fetch(womens);
  return (
    <div>
        <CardMens items={data} />
    </div>
  )
}

export default FullWomensShop