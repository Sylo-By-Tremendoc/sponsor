import Typography from "@/components/common/Typography";
import { useState } from "react";
import { IoChevronDownOutline } from "react-icons/io5";

const NotificationItem = ({
  label,
  description,
  defaultOn = true,
}: {
  label: string;
  description: string;
  defaultOn?: boolean;
}) => {
  const [isOn, setIsOn] = useState(defaultOn);

  return (
    <div className="grid grid-cols-2 gap-5 items-center justify-between">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => setIsOn(!isOn)}
          className={`relative w-10 h-5 rounded-full transition-colors duration-300 shrink-0 ${
            isOn ? "bg-primary" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
              isOn ? "left-[22px]" : "left-0.5"
            }`}
          ></span>
        </button>

        <div>
          <Typography variant={"smallTextSemibold"}>{label}</Typography>
          <Typography variant={"xSmallText"} className="text-charcoal-gray">
            {description}
          </Typography>
        </div>
      </div>

      <div className="flex justify-end">
        <button className="flex items-center border px-3 py-1.5 rounded-full text-xs hover:bg-gray-50">
          Suggested <IoChevronDownOutline className="ml-1 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default NotificationItem;
