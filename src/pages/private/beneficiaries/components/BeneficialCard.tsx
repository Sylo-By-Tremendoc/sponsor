import { Button } from "@/components/common/Button";
import LineThrough from "@/components/common/LineThrough";
import Typography from "@/components/common/Typography";
import { HiDotsHorizontal } from "react-icons/hi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const BeneficialCard = ({
  name,
  email,
  firstName,
  relationship,
  profilePicture,
  onClick,
}: {
  name: string;
  firstName: string;
  relationship: string;
  email: string;
  profilePicture: string;
  onClick: () => void;
}) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="flex flex-col justify-between gap-5 p-5 border border-mid-grey bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 relative"
    >
      <div className="space-y-3">
        <div className="absolute right-4 top-3 flex justify-end">
          <button className="p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
            <HiDotsHorizontal className="text-gray-500" size={18} />
          </button>
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
            <Typography variant="mediumTextBold">{name}</Typography>
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

export default BeneficialCard;
