import { Button } from "@/components/common/Button";
import LineThrough from "@/components/common/LineThrough";
import Typography from "@/components/common/Typography";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ActionsMenu from "@/components/common/ActionsMenu";
import Icons from "@/components/common/Icons";
import SkeletonLoader from "@/components/common/SkeletonLoader";

export const BeneficialCard = ({
  name,
  email,
  firstName,
  relationship,
  profilePicture,
  onClick,
  handleAction,
}: {
  name: string;
  firstName: string;
  relationship: string;
  email: string;
  profilePicture: string;
  onClick: () => void;
  handleAction: (action: string) => void;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="flex flex-col justify-between gap-5 p-5 border border-mid-grey bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative"
    >
      <div className="space-y-3">
        <div className="absolute right-4 top-3 flex justify-end">
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
            src={profilePicture}
            alt={`${name}'s profile`}
            className="w-[107px] h-[107px] rounded-full border border-gray-200 object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          />

          <div>
            <Typography variant="mediumText">{name}</Typography>
            <Typography variant="xSmallText" className="text-charcoal-gray">
              {relationship}
            </Typography>
          </div>
        </div>

        <LineThrough className="w-2/3 mx-auto opacity-60" />

        <div className="text-center">
          <Link
            to="#"
            className="text-xs text-primary hover:underline hover:text-primary-dark transition-colors"
          >
            {email}
          </Link>
        </div>
      </div>

      {/* Manage Button */}
      <Button
        variant="outline"
        className="w-full hover:bg-primary hover:text-white transition-all"
        onClick={onClick}
      >
        Manage {firstName}
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
