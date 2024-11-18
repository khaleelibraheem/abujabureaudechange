// components/VirtualCard/VirtualCard.jsx
import { motion } from "framer-motion";
import { Eye, EyeOff, Copy, Check, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

const CardAction = ({
  icon: Icon,
  label,
  onClick,
  variant = "outline",
  disabled = false,
  showLabel = true,
}) => (
  <Button
    variant={variant}
    size={showLabel ? "sm" : "icon"}
    onClick={onClick}
    disabled={disabled}
    className={showLabel ? "sm:w-auto" : "w-9 h-9 p-0"}
    title={label}
  >
    <Icon className={`h-4 w-4 ${showLabel ? "mr-2 sm:mr-2" : ""}`} />
    <span className={showLabel ? "hidden sm:inline" : "sr-only"}>{label}</span>
  </Button>
);

const VirtualCard = ({
  cardDetails,
  showCardDetails,
  gradient,
  user,
  bankName,
  isLocked = false,
  onToggleDetails,
  onCopy,
  onLock,
  copied,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative w-full group">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-3xl blur-2xl opacity-20 pointer-events-none" />
      <div
        className={`relative w-full aspect-[1.586/1] ${gradient} ${
          isLocked ? "opacity-75" : ""
        } rounded-3xl p-4 sm:p-8 text-white shadow-xl transition-all duration-300`}
      >
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-3xl backdrop-blur-sm">
            <Lock className="w-12 h-12" />
          </div>
        )}

        <div className="absolute top-4 sm:top-8 right-4 sm:right-8 text-sm sm:text-base font-semibold tracking-wide text-white/90">
          {bankName}
        </div>

        <div className="flex justify-between items-start mb-4 sm:mb-8">
          <div className="w-8 h-6 sm:w-12 sm:h-10 bg-yellow-300/80 rounded-lg flex items-center justify-center">
            <div className="w-6 h-4 sm:w-8 sm:h-6 bg-yellow-400/90 rounded" />
          </div>
        </div>

        <div className="mb-4 sm:mb-8">
          <div className="text-lg sm:text-2xl font-mono tracking-wider">
            {showCardDetails ? cardDetails?.number : "•••• •••• •••• ••••"}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between">
          <div className="flex justify-between w-full sm:w-2/3 mb-4 sm:mb-0">
            <div>
              <div className="text-xs text-white/60 mb-1">CARD HOLDER</div>
              <div className="text-sm sm:text-base font-medium tracking-wide">
                {user?.fullName?.toUpperCase() || "CARD HOLDER"}
              </div>
            </div>
            <div className="text-right sm:hidden">
              <div className="text-xs text-white/60 mb-1">EXPIRES</div>
              <div className="text-sm font-medium">
                {showCardDetails ? cardDetails?.expiry : "••/••"}
              </div>
            </div>
          </div>

          <div className="flex justify-between sm:justify-end w-full sm:w-1/3">
            <div className="hidden sm:block text-right">
              <div className="text-xs text-white/60 mb-1">EXPIRES</div>
              <div className="text-sm sm:text-base font-medium">
                {showCardDetails ? cardDetails?.expiry : "••/••"}
              </div>
            </div>
            <div className="text-right sm:absolute sm:right-8 sm:bottom-8">
              <div className="text-xs text-white/60 mb-1">CVV</div>
              <div className="text-sm sm:text-base font-medium">
                {showCardDetails ? cardDetails?.cvv : "•••"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Card Actions - Icons only on mobile, full buttons on desktop */}
    <div className="flex justify-center gap-2 sm:gap-4 mt-6 flex-wrap">
      <CardAction
        icon={showCardDetails ? EyeOff : Eye}
        label={showCardDetails ? "Hide Details" : "Show Details"}
        onClick={onToggleDetails}
        disabled={isLocked}
      />
      <CardAction
        icon={copied ? Check : Copy}
        label={copied ? "Copied" : "Copy Number"}
        onClick={onCopy}
        disabled={isLocked}
      />
      <CardAction
        icon={Lock}
        label={isLocked ? "Unlock Card" : "Lock Card"}
        onClick={onLock}
        variant={isLocked ? "destructive" : "outline"}
      />
    </div>
  </motion.div>
);

export default VirtualCard;
