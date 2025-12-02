// components/AboutSection.tsx
"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <div className="bg-[#fdfaf6] mt-5">
      {/* Section 1 */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-10 px-6 py-16">
        {/* Image */}
        <motion.img
          src="/images/abou.jpg"
          alt="Our Mission"
          className="w-full md:w-[480px] h-auto rounded-xl shadow-lg font-logo"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} // 👈 Scroll ke waqt trigger
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />

        {/* Text */}
        <motion.div
          className="max-w-lg text-center md:text-left"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-4 font-logo text-[#883900]">Why AuraWear ? </h2>
          <p className="text-gray-600">
            <q><i>
            At AuraWear, we believe fashion is more than just clothing — it’s a reflection of who you are. 
            Our mission is to craft timeless pieces that blend comfort, elegance, and individuality. 
            From carefully selected fabrics to meticulous detailing, every product is designed to empower you 
            with confidence and style.</i></q>
          </p>
        </motion.div>
      </section>

      {/* Section 2 (reverse order) */}
      <section className="flex flex-col md:flex-row-reverse items-center justify-center gap-10 px-6 py-16">
        {/* Image */}
        <motion.img
          src="/images/about.jpg"
          alt="Our Story"
          className="w-full md:w-[480px] h-auto rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />

        {/* Text */}
        <motion.div
          className="max-w-lg text-center md:text-left"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold mb-4 font-logo text-[#883900]">Our Story</h2>
          <p className="text-gray-600">
           <q><i>AuraWear was born from a simple idea — to create fashion that tells a story. 
            What started as a passion for designing unique, everyday wear soon transformed into a vision: 
            bringing together comfort, beauty, and meaning in every stitch. 
            Each collection is inspired by real people and real moments — making every outfit more than just clothing.</i></q> 
          </p>
        </motion.div>
      </section>
         {/* Section 1 */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-10 px-6 py-16">
        {/* Image */}
        <motion.img
          src="/images/about2.jpg"
          alt="Our Mission"
          className="w-full md:w-[480px] h-auto rounded-xl shadow-lg font-logo"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} // 👈 Scroll ke waqt trigger
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        />

        {/* Text */}
        <motion.div
          className="max-w-lg text-center md:text-left"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-4 font-logo text-[#883900]">AuraWear Promise</h2>
          <p className="text-gray-600">
            <q><i>
           We promise more than just style — we promise an experience. Every product we design is carefully crafted with attention to detail, ensuring not only elegance but also lasting comfort. From the stitching to the fabric, we focus on quality that speaks for itself. Our commitment goes beyond fashion trends; its about delivering pieces that make you feel confident and cared for. With AuraWear, you dont just shop — you invest in trust, authenticity, and a brand that values you at every step</i></q>
          </p>
        </motion.div>
      </section>
    </div>
  );
}
