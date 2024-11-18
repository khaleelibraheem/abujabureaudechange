import React from "react";
import { DollarSign, Globe } from "lucide-react";

const Logo = () => {
  return (
    <div className="group inline-flex items-center gap-3 rounded-lg transition-all duration-300">
      {/* Icon container */}
      <div className="relative w-8 h-8 flex items-center justify-center">
        <Globe className="absolute w-6 h-6 text-gray-900 dark:text-gray-100 transform transition-all duration-300 group-hover:scale-90 group-hover:opacity-0" />
        <DollarSign className="absolute w-6 h-6 text-blue-500 transform transition-all duration-300 scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100" />
      </div>

      {/* Text container */}
      <div className="flex flex-col items-start">
        <span className="text-lg font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
          Abuja
        </span>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
          Bureau De Change
        </span>
      </div>
    </div>
  );
};

export default Logo;
