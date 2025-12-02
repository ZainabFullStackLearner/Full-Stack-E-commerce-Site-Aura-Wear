import { discountQuery, query } from "@/sanity/lib/fetch"
import { client } from '@/sanity/lib/client'
import Card from "../components/Card"
import { BsArrowRight } from "react-icons/bs";
import Link from "next/link";
import DiscountCard from "../components/Discount";
export default async function  Womens () {
const womensData = await client.fetch(query)
const discount = await client.fetch(discountQuery)
return(
 <main className="space-y-8">
      <section>
        <h1 className='text-2xl text-black font-logo md:text-5xl px-4 lg:pl-56 text-centre text-wrap mb-14'>THE BEST DRESS FOR BEST WOMAN</h1>
        <Card item={womensData.slice(2, 6)} />
        <button className="bg-[#8B4513] text-white font-sans px-6 py-3 flex ml-4 hover:bg-amber-800 hover:translate-x-3  transition-all">SEE MORE &nbsp; <BsArrowRight/></button>
      </section>
      <section>
      <h1 className='text-2xl text-black font-logo md:text-5xl px-4 lg:pl-56 text-centre text-wrap mb-14'>BEST OUTFIT FOR YOUR HAPPINESS</h1>
         <DiscountCard items={discount.slice(0, 4)} />
       <Link href="/Sale"> <button className="bg-[#8B4513] text-white font-sans px-6 py-3 flex ml-4 hover:bg-amber-800 hover:translate-x-3  transition-all mb-16">SEE MORE &nbsp; <BsArrowRight/></button></Link>
      </section>
      
      </main>
)

}