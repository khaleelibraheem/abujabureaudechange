import { DollarSign, Globe } from "lucide-react";

const Logo = () => {
  return (
    <div className="group relative inline-flex flex-col justify-center">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 via-blue-500/10 to-emerald-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 scale-95 group-hover:scale-100 blur-lg" />

      {/* Main logo content */}
      <div className="relative flex flex-col">
        {/* Main heading with icons */}
        <div className="flex items-center gap-1.5">
          {/* Animated icon group */}
          <div className="relative">
            <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform duration-500" />
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 dark:text-blue-400 absolute inset-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-500" />
          </div>

          {/* Main text */}
          <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-500 dark:from-indigo-400 dark:via-blue-400 dark:to-emerald-300 bg-clip-text text-transparent">
            Abuja
          </span>
        </div>

        {/* Subheading */}
        <div className="relative">
          <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-300 uppercase tracking-wide">
            Bureau De Change
          </span>
          {/* Animated underline */}
          <div className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-600 to-emerald-500 dark:from-indigo-400 dark:to-emerald-300 group-hover:w-full transition-all duration-500 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default Logo;
