import { cn } from "@/utils/class-name";
import React, { useEffect, useState } from "react";
import {
  FadeLoader,
  BounceLoader,
  PulseLoader,
  HashLoader,
  BeatLoader,
} from "react-spinners";
import { motion } from "framer-motion";
import { HiCheck } from "react-icons/hi";

const loaderMap: Record<string, any> = {
  fade: FadeLoader,
  bounce: BounceLoader,
  pulse: PulseLoader,
  hash: HashLoader,
  beat: BeatLoader,
};

type SpinnerProps = {
  type?: keyof typeof loaderMap;
  size?: number;
  color?: string | string[];
  loading?: boolean;
  isSuccess?: boolean;
  className?: string;
  style?: React.CSSProperties;
  onSuccess?: () => void;
};

const FullScreenLoader = ({
  type = "fade",
  size = 60,
  color = "#fff",
  loading = true,
  isSuccess = false,
  className = "",
  style = {},
  onSuccess,
}: SpinnerProps) => {
  const Loader = loaderMap[type];
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!loading && isSuccess) {
      const showTimeout = setTimeout(() => {
        setShowSuccess(true);

        const callbackTimeout = setTimeout(() => {
          onSuccess?.();
        }, 800);

        return () => clearTimeout(callbackTimeout);
      }, 200);

      return () => clearTimeout(showTimeout);
    }

    setShowSuccess(false);
  }, [loading, isSuccess]);

  // If neither loading nor success, don't render
  if (!loading && !showSuccess) return null;

  return (
    <div
      className={cn(
        "fixed top-0 bottom-0 inset-0 w-screen h-screen z-50 flex items-center justify-center bg-black/20 backdrop-blur-[1px]",
        className
      )}
      style={style}
    >
      {!showSuccess ? (
        <Loader size={size} color={color} loading={loading} />
      ) : (
        <motion.div
          className="bg-green-500 p-3 rounded-full flex items-center justify-center"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 15 }}
        >
          <HiCheck size={40} className="text-white font-black" />
        </motion.div>
      )}
    </div>
  );
};

export default FullScreenLoader;
