"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MessageCircle, PhoneCall, Mail } from "lucide-react";
import Link from "next/link";

const contactMethods = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team",
    action: "Start Chat",
    href: "#chat",
  },
  {
    icon: PhoneCall,
    title: "Phone Support",
    description: "Call us 24/7",
    action: "Call Now",
    href: "tel:+1234567890",
  },
  {
    icon: Mail,
    title: "Email",
    description: "Get email support",
    action: "Send Email",
    href: "mailto:support@example.com",
  },
];

export default function FAQContact() {
  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Can&apos;t find what you&apos;re looking for? Choose how you&apos;d like to connect
            with us.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-full p-8 bg-white dark:bg-gray-900 rounded-2xl text-center">
                  <div className="inline-flex p-3 rounded-xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 mb-4">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {method.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {method.description}
                  </p>
                  <Button asChild>
                    <Link href={method.href}>{method.action}</Link>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
