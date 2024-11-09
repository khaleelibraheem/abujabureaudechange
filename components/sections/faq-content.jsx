"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// app/faq/page.js
const faqCategories = [
  {
    title: "Exchange Rates & Fees",
    questions: [
      {
        question: "How are your exchange rates calculated?",
        answer: "Our exchange rates are based on real-time market rates with a small spread. We update our rates every second to ensure you get the most current rates for all five supported currencies (USD, GBP, EUR, NGN, INR)."
      },
      {
        question: "What fees do you charge?",
        answer: "We charge a small spread on the exchange rate, typically ranging from 0.1% to 0.5% depending on the currency pair. There are no hidden fees or additional charges."
      },
      {
        question: "Why do exchange rates fluctuate?",
        answer: "Exchange rates change constantly due to various factors including market supply and demand, economic indicators, political events, and global financial conditions."
      }
    ]
  },
  {
    title: "Transfers & Processing",
    questions: [
      {
        question: "How long do transfers take?",
        answer: "Currency exchanges between our supported currencies are instant. Bank transfers for withdrawals typically take 1-2 business days depending on the destination bank and currency."
      },
      {
        question: "Which currencies do you support?",
        answer: "We currently support five major currencies: US Dollar (USD), British Pound (GBP), Euro (EUR), Nigerian Naira (NGN), and Indian Rupee (INR)."
      },
      {
        question: "Is there a minimum or maximum exchange amount?",
        answer: "Minimum exchange amount is equivalent to $10 USD in any currency. Maximum amounts vary by currency pair and account verification level."
      }
    ]
  },
  {
    title: "Account & Security",
    questions: [
      {
        question: "How do you protect my funds?",
        answer: "We use bank-grade encryption, two-factor authentication, and maintain segregated accounts for client funds. All transactions are monitored 24/7 for suspicious activity."
      },
      {
        question: "What documents do I need to verify my account?",
        answer: "Basic verification requires government-issued ID and proof of address. Business accounts may require additional documentation."
      },
      {
        question: "Can I hold multiple currencies in my account?",
        answer: "Yes, you can hold all five supported currencies (USD, GBP, EUR, NGN, INR) in your account simultaneously and exchange between them instantly."
      }
    ]
  }
];

export default function FAQContent() {
  return (
    <section className="py-24 bg-white dark:bg-gray-900">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto">
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="mb-12 last:mb-0"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {category.title}
              </h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${categoryIndex}-${index}`}
                    className="border border-gray-200 dark:border-gray-800 rounded-lg px-6"
                  >
                    <AccordionTrigger className="text-left text-gray-900 dark:text-white hover:no-underline">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 dark:text-gray-300">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
