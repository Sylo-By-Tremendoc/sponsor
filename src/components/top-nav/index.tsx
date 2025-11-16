import { BiBell, BiMailSend, BiSearch } from "react-icons/bi";
import Typography from "../common/Typography";
import UserDropdown from "../navbar/UserDropdown";
import { useState } from "react";
import { ShowLogoutModal } from "../side-nav/navList";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <div className="w-full flex justify-between items-center px-3 py-2 bg-white rounded-xl">
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
        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <BiMailSend className="w-5 h-5 text-gray-600" />
        </button>

        <button className="p-2 rounded-full hover:bg-gray-100 transition">
          <BiBell className="w-5 h-5 text-gray-600" />
        </button>

        <UserDropdown handleLogOut={() => setShowLogoutModal(true)}>
          <div className="hidden md:flex items-center gap-2">
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <img
                src="https://randomuser.me/api/portraits/men/2.jpg"
                alt="User Avatar"
                className="object-cover"
              />
            </div>

            <div className="flex flex-col">
              <Typography
                variant={"xSmallTextSemibold"}
                className="text-charcoal-gray leading-3"
              >
                Peter
              </Typography>
              <Typography
                variant={"xSmallText"}
                className="font-medium text-[#848484]"
              >
                Lagos, NG
              </Typography>
            </div>
          </div>
        </UserDropdown>

        <button
          // onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col gap-1"
        >
          <span className="w-5 h-0.5 bg-black"></span>
          <span className="w-5 h-0.5 bg-black"></span>
          <span className="w-5 h-0.5 bg-black"></span>
        </button>
      </div>

      <ShowLogoutModal
        showLogoutModal={showLogoutModal}
        setShowLogoutModal={setShowLogoutModal}
        handleLogOut={() => {
          navigate("/");
        }}
      />
    </div>
  );
};

export default TopNav;
