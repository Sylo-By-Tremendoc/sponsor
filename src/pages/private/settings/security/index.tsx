import { Button } from "@/components/common/Button";
import Typography from "@/components/common/Typography";
import { useState } from "react";
import { FiTrash2, FiMonitor } from "react-icons/fi";
import { HiOutlineBadgeCheck, HiOutlinePencil } from "react-icons/hi";

const SecuritySettings = () => {
  const devices = [
    {
      name: "Safari on Mac OS X",
      location: "Lagos, Nigeria",
      time: "Current session",
    },
    {
      name: "Peter’s MacBookPro",
      location: "Lagos, Nigeria",
      time: "1 month ago",
    },
    {
      name: "Safari on Mac OS X",
      location: "Abuja, Nigeria",
      time: "1 month ago",
    },
    {
      name: "Peter’s MacBookPro",
      location: "Abuja, Nigeria",
      time: "1 month ago",
    },
    {
      name: "Brave on Mac OS X",
      location: "Lagos, Nigeria",
      time: "2 month ago",
    },
  ];

  const [isOn, setIsOn] = useState(true);

  return (
    <div id="myContainerId" className="space-y-7 flex-1 bg-white overflow-auto">
      <Typography variant="mediumTextSemibold">Security Settings</Typography>

      {/* Security score */}
      <div className="w-full border border-gray-200 rounded-xl py-4 px-5 flex flex-col md:flex-row items-center justify-between gap-5 bg-white">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="relative w-14 h-14">
            <svg className="w-full h-full -rotate-90">
              <circle
                cx="28"
                cy="28"
                r="26"
                className="stroke-gray-200"
                strokeWidth="4"
                fill="none"
              />
              <circle
                cx="28"
                cy="28"
                r="26"
                className="stroke-green-500"
                strokeWidth="4"
                fill="none"
                strokeDasharray="163"
                strokeDashoffset="16"
                strokeLinecap="round"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-semibold">
              90%
            </span>
          </div>

          <p className="text-gray-700 text-center md:text-start">
            Your account security is <span className="font-semibold">90%</span>
            <br />
            <span className="text-sm text-gray-500">
              Please review your account security settings regularly.
            </span>
          </p>
        </div>

        <Button size={"small"} className="text-xs">
          Review security
        </Button>
      </div>

      {/* Basics */}
      <div>
        <Typography variant={"largeTextSemibold"} className="pb-2">
          Basics
        </Typography>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-mid-grey py-4">
          <div>
            <Typography variant={"smallTextSemibold"}>Password</Typography>
            <Typography variant={"xSmallText"} className="text-charcoal-gray">
              Set a password to protect your account
            </Typography>
          </div>

          <div className="flex items-center gap-2">
            <Typography>********************</Typography>
            <div className="flex items-center gap-1">
              <HiOutlineBadgeCheck className="text-primary" />
              <Typography variant={"xSmallText"} className="text-primary">
                Very secure
              </Typography>
            </div>
          </div>

          <Button
            size={"small"}
            variant={"outline"}
            className="w-fit md:w-auto"
          >
            <HiOutlinePencil />
            Edit
          </Button>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 border-b border-mid-grey py-4">
          <div>
            <Typography variant={"smallTextSemibold"}>
              Two-step verification
            </Typography>
            <Typography variant={"xSmallText"} className="text-charcoal-gray">
              We recommend requiring a verification <br /> code in addition to
              your password
            </Typography>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsOn(!isOn)}
              className={`relative w-10 h-5 rounded-full transition-colors duration-300 ${
                isOn ? "bg-green-500" : "bg-gray-300"
              }`}
            >
              <span
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all duration-300 ${
                  isOn ? "left-[22px]" : "left-0.5"
                }`}
              ></span>
            </button>

            <Typography variant={"xSmallText"}>
              Two-step verification
            </Typography>
          </div>

          <Button
            size={"small"}
            variant={"outline"}
            className="w-fit md:w-auto"
          >
            <HiOutlinePencil />
            Edit
          </Button>
        </div>
      </div>

      {/* Devices */}
      <div>
        <h2 className="font-semibold text-lg mb-4">Browsers and devices</h2>
        <p className="text-gray-500 text-sm mb-4">
          These browsers and devices are currently signed in to your account.
        </p>

        <div className="space-y-4">
          {devices.map((device, i) => (
            <div
              key={i}
              className="flex items-center justify-between border border-mid-grey p-4 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <FiMonitor size={22} className="text-gray-500" />
                <div>
                  <Typography variant={"smallTextSemibold"}>
                    {device.name}
                  </Typography>
                  <Typography
                    variant={"xSmallText"}
                    className="text-charcoal-gray"
                  >
                    {device.location} — {device.time}
                  </Typography>
                </div>
              </div>

              <FiTrash2
                size={20}
                className="text-gray-400 hover:text-red-500 cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
