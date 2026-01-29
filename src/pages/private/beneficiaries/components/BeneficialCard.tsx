import { Button } from "@/components/common/Button";
import LineThrough from "@/components/common/LineThrough";
import Typography from "@/components/common/Typography";
import { motion } from "framer-motion";
import ActionsMenu from "@/components/common/ActionsMenu";
import Icons from "@/components/common/Icons";
import SkeletonLoader from "@/components/common/SkeletonLoader";
import type { BeneficiariesParams } from "@/types/beneficiary";
import { defaultImages } from "@/utils/constant";

export const BeneficialCard = ({
  beneficiary,
  onClick,
  handleAction,
}: {
  beneficiary: BeneficiariesParams;
  onClick: () => void;
  handleAction: (action: string) => void;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="cursor-pointer flex flex-col justify-between gap-5 p-5 border border-mid-grey bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative"
      onClick={onClick}
    >
      <div className="space-y-3">
        <div
          className="absolute right-4 top-3 flex justify-end"
          onClick={(e) => e.stopPropagation()}
        >
          <ActionsMenu
            items={[
              {
                icon: <Icons iconName="view" />,
                title: "View",
                action: "view",
              },
              {
                icon: <Icons iconName="edit" />,
                title: "Edit",
                action: "edit",
              },
              {
                icon: <Icons iconName="delete" />,
                title: "Delete",
                action: "delete",
                danger: true,
              },
            ]}
            onSelect={(action) => {
              handleAction(action);
            }}
          />
        </div>

        <div className="flex flex-col items-center text-center space-y-2">
          <motion.img
            src={beneficiary?.profile_picture?.url || defaultImages?.avatar}
            alt={`${beneficiary?.first_name}'s profile`}
            className="w-[107px] h-[107px] rounded-full border border-gray-200 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />

          <div>
            <Typography variant="mediumText">
              {beneficiary?.first_name} {beneficiary?.last_name}
            </Typography>
            <Typography variant="xSmallText" className="text-charcoal-gray">
              {beneficiary?.relationship}
            </Typography>
          </div>
        </div>

        <LineThrough className="w-2/3 mx-auto opacity-60" />

        <div className="flex justify-center min-w-0">
          <Typography
            as="a"
            href={`mailto:${beneficiary.email}`}
            variant="xSmallText"
            className="text-primary underline cursor-pointer truncate"
          >
            {beneficiary.email}
          </Typography>
        </div>
      </div>

      {/* Manage Button */}
      <Button
        variant="outline"
        className="w-full hover:bg-primary hover:text-white transition-all"
        onClick={onClick}
      >
        Manage {beneficiary?.first_name}
      </Button>
    </motion.div>
  );
};

export const BeneficialCardLoader = () => {
  return (
    <div className="flex flex-col justify-between gap-5 p-5 border border-mid-grey bg-white rounded-2xl shadow-sm">
      <div className="space-y-5">
        <div>
          <div className="flex justify-end">
            <SkeletonLoader className="w-6 h-6 rounded" />
          </div>
          <div className="flex flex-col items-center text-center space-y-3">
            <SkeletonLoader className="w-[107px] h-[107px] rounded-full" />

            <div className="space-y-2 w-full max-w-[120px]">
              <SkeletonLoader className="h-4 rounded" />
              <SkeletonLoader className="h-3 rounded" />
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <SkeletonLoader className="w-2/3 h-[2px] rounded" />
        </div>

        <div className="w-full flex justify-center">
          <SkeletonLoader className="w-24 h-3 rounded" />
        </div>
      </div>

      <SkeletonLoader className="w-full h-10 rounded-lg" />
    </div>
  );
};
