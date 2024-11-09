"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    content:
      "The exchange rates are consistently better than my bank, and the transfers are lightning fast!",
    author: "Sarah Johnson",
    role: "International Business Owner",
    location: "United Kingdom",
    rating: 5,
    image: "/avatars/avatar-1.jpg", // You'll need to add actual images
  },
  {
    content:
      "Being able to hold multiple currencies and exchange them instantly has transformed my import business.",
    author: "Rahul Patel",
    role: "Import/Export Manager",
    location: "India",
    rating: 5,
    image: "/avatars/avatar-2.jpg",
  },
  {
    content:
      "The best platform for sending money home. The NGN rates are always competitive.",
    author: "Oluwaseun Adebayo",
    role: "Healthcare Professional",
    location: "Nigeria",
    rating: 5,
    image: "/avatars/avatar-3.jpg",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900">
      <div className="container px-4 mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
            Testimonials
          </span>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            Trusted by thousands of users worldwide
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Don&apos;t just take our word for it - hear what our satisfied customers
            have to say
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative p-8 bg-gray-50 dark:bg-gray-800 rounded-2xl"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-indigo-500/20" />

              {/* Content */}
              <div className="relative z-10">
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Testimonial */}
                <blockquote className="text-gray-700 dark:text-gray-300 mb-6">
                  {testimonial.content}
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700" />
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {testimonial.author}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-full">
            <div className="flex -space-x-2">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700"
                />
              ))}
            </div>
            <span className="text-sm font-medium text-green-800 dark:text-green-400">
              Join 50k+ happy customers
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
