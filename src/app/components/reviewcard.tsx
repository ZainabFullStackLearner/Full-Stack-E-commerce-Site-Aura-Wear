'use client'
import { motion } from 'framer-motion'
import { FaStar } from 'react-icons/fa'

const reviews = [
  { name: 'Ayesha Khan', stars: 5, review: 'The product quality is amazing! Highly recommended.' },
  { name: 'Ali Raza', stars: 4, review: 'Great service and packaging. Will buy again.' },
  { name: 'Fatima Noor', stars: 5, review: 'Loved the fabric and fast delivery!' },
  { name: 'Usman Tariq', stars: 3, review: 'Good overall but sizing was a bit off.' },
  { name: 'Zainab Baloch', stars: 5, review: 'Beautiful design and very comfortable to wear.' },
  { name: 'Hamza Ali', stars: 4, review: 'Nice experience. Prices are fair too.' },
]

// Custom auto-scrolling horizontal slider component
const ReviewCards = () => {
  const duplicatedReviews = [...reviews, ...reviews]

  return (
    <section className="py-16 bg-gray-50 overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 font-logo">
        What Our Customers Say
      </h2>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-6"
          animate={{
            x: ['0%', '-100%'],
            transition: {
              ease: 'linear',
              duration: 20,
              repeat: Infinity,
            },
          }}
        >
          {duplicatedReviews.map((item, index) => (
            <div
              key={index}
              className="min-w-[300px] max-w-sm bg-white p-6 rounded-xl shadow-md"
            >
              <div className="flex items-center mb-2 text-yellow-500">
                {Array.from({ length: item.stars }, (_, i) => (
                  <FaStar key={i} className="mr-1" />
                ))}
              </div>
              <p className="text-gray-700 text-sm mb-4"><q>&quot;{item.review}&quot;</q></p>
              <p className="text-gray-900 font-semibold text-sm">{item.name}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ReviewCards
