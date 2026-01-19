import CustomDialog, { DialogFooter } from "@/components/common/modals/Dialog";
import { Button } from "@/components/common/Button";
import { motion } from "framer-motion";
import { HiCheck, HiSparkles } from "react-icons/hi";
import { FaGift, FaStar, FaHeart } from "react-icons/fa";

const items = Array.from({ length: 14 });

const randomBetween = (min: number, max: number) =>
  Math.random() * (max - min) + min;

const CELEBRATION_ICONS = [
  { Icon: FaGift, color: "text-primary" },
  { Icon: HiSparkles, color: "text-blue-400" },
  { Icon: FaHeart, color: "text-red-400" },
  { Icon: FaStar, color: "text-amber-400" },
];

const PlanPurchaseSuccessModal = ({
  openPlanPurchaseSuccessModal,
  onViewPlan,
}: {
  openPlanPurchaseSuccessModal: boolean;
  onViewPlan?: () => void;
}) => {
  return (
    <CustomDialog
      openModal={openPlanPurchaseSuccessModal}
      className="md:w-[420px]"
    >
      <FallingCelebration />

      <div className="flex flex-col items-center text-center px-4 py-6">
        <SuccessAnimation />

        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          Plan Purchased Successfully! 🎉
        </h2>

        <p className="text-sm text-gray-600 leading-relaxed">
          {/* Great choice! Your beneficiary has been successfully enrolled and is
          now covered under the selected plan. */}
          That worked! You just turned love into healthcare. Your beneficiary is
          covered, and future you will thank present you.
        </p>
      </div>

      <DialogFooter className="flex flex-col gap-2">
        <Button className="w-full" onClick={onViewPlan}>
          View coverage details
        </Button>
      </DialogFooter>
    </CustomDialog>
  );
};

export default PlanPurchaseSuccessModal;

const SuccessAnimation = () => {
  return (
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center mb-4 animate-pulse"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 260, damping: 20 }}
      >
        <HiCheck className="w-14 h-14 text-green-600" />
      </motion.div>
    </motion.div>
  );
};

const FallingCelebration = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((_, index) => {
        const { Icon, color } =
          CELEBRATION_ICONS[
            Math.floor(Math.random() * CELEBRATION_ICONS.length)
          ];

        return (
          <motion.div
            key={index}
            initial={{
              x: `${randomBetween(0, 100)}vw`,
              y: -40,
              opacity: 0,
              rotate: randomBetween(-30, 30),
            }}
            animate={{
              y: "110vh",
              opacity: [0, 1, 1, 0],
              rotate: randomBetween(-180, 180),
            }}
            transition={{
              duration: randomBetween(4, 7),
              delay: randomBetween(0, 1.5),
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-0"
          >
            <Icon className={`${color} w-5 h-5 opacity-80`} />
          </motion.div>
        );
      })}
    </div>
  );
};
