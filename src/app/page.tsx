import Service from "./service/service";
import Catalog from "./categories/Catalog";
import Hero from "./components/Hero";
import ReviewCards from "./components/reviewcard";

export default function Home() {
  return (
    <div  >
      <div className="">
        
        <Hero/>
        <Catalog/>
        <Service/>
        
        <ReviewCards/>
       
      </div>
    
    </div>
  );
}
