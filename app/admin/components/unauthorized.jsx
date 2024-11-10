// components/unauthorized.js
"use client";

import { motion } from "framer-motion";
import { ShieldOff, Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Unauthorized() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mx-auto w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6"
          >
            <ShieldOff className="w-8 h-8 text-red-600 dark:text-red-400" />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Access Denied
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              You don&apos;t have permission to access this page. Please contact
              an administrator if you believe this is a mistake.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <Button
              onClick={() => router.push("/")}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Button>
            <Button
              onClick={() => router.back()}
              variant="outline"
              className="w-full"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Go Back
            </Button>
          </motion.div>

          {/* Footer */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-sm text-gray-500 dark:text-gray-400"
          >
            Error Code: 403 Forbidden
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
