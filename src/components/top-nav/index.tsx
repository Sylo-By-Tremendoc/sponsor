import { BiBell, BiMailSend, BiSearch } from "react-icons/bi";
import Typography from "../common/Typography";
import UserDropdown from "../navbar/components/UserDropdown";
import { useState } from "react";
import { ShowLogoutModal } from "../side-nav/components/navList";
import MobileSideNav from "../side-nav/mobile-side-nav";
import useAuth from "@/hooks/use-auth";
import { getInitials } from "@/utils/get-initials";
import { getSponsorCountry } from "@/utils/constant";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const { authUser } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const location = getSponsorCountry(authUser?.user?.country!);

  return (
    <div className="w-full flex justify-between items-center p-3 bg-white rounded-xl">
      {/* Search bar */}
      <div className="flex-1 max-w-xl flex items-center gap-2">
        <BiSearch className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search anything..."
          className="flex-1 bg-transparent outline-none text-gray-700 placeholder:text-gray-400 text-xs"
        />
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Icons */}
        <button
          className="p-2 rounded-full hover:bg-gray-100 transition"
          onClick={() => navigate("/messages")}
        >
          <BiMailSend className="w-5 h-5 text-gray-600" />
        </button>

        <button
          className="p-2 rounded-full hover:bg-gray-100 transition"
          onClick={() => navigate("/notifications")}
        >
          <BiBell className="w-5 h-5 text-gray-600" />
        </button>

        <UserDropdown handleLogOut={() => setShowLogoutModal(true)}>
          <div className="hidden md:flex items-center gap-2">
            <button className="outline-none border-none bg-transparent w-fit shrink-0 block">
              {authUser?.user?.profilePicture && (
                <img
                  src={authUser?.user?.profilePicture}
                  alt={authUser?.user?.first_name}
                  className="rounded-full size-9 shrink-0 object-cover object-center"
                />
              )}

              {!authUser?.user?.profilePicture && (
                <div className="text-sm rounded-full bg-primary text-white  uppercase font-bold size-8 shrink-0 flex items-center justify-center cursor-pointer">
                  {getInitials(
                    authUser?.user?.first_name!,
                    authUser?.user?.last_name!
                  )}
                </div>
              )}
            </button>
            <div className="flex flex-col">
              <Typography
                variant={"xSmallTextSemibold"}
                className="text-charcoal-gray leading-3"
              >
                {authUser?.user?.first_name}
              </Typography>
              <Typography
                variant={"xSmallText"}
                className="font-medium text-[#848484]"
              >
                {location?.label}
              </Typography>
            </div>
          </div>
        </UserDropdown>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1"
        >
          <span className="w-5 h-0.5 bg-black"></span>
          <span className="w-5 h-0.5 bg-black"></span>
          <span className="w-5 h-0.5 bg-black"></span>
        </button>
      </div>

      <MobileSideNav
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setShowLogoutModal={setShowLogoutModal}
      />

      <ShowLogoutModal
        showLogoutModal={showLogoutModal}
        setShowLogoutModal={setShowLogoutModal}
      />
    </div>
  );
};

export default TopNav;
