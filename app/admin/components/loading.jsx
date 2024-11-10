import React from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const LoadingScreen = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-[300px]">
          <CardContent className="pt-6 pb-4">
            <div className="flex flex-col items-center gap-4">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Loader2 className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg font-medium text-gray-900 dark:text-gray-100"
              >
                Authorizing
                <motion.span
                  animate={{
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                >
                  ...
                </motion.span>
              </motion.p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default LoadingScreen;
