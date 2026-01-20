import { Link } from "react-router-dom";
import Icons from "../common/Icons";
import DisplayNavList from "./components/DisplayNavList";
import { ShowLogoutModal } from "./components/navList";
import { useState } from "react";

const SideNav = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  return (
    <div className="hidden md:flex flex-col justify-between bg-white w-52 h-screen overflow-hidden">
      <Link to="/" className="flex items-center gap-1 mx-3 my-5">
        <Icons iconName="logo" width={30} height={30} />
        <span className="text-sm font-semibold">SyloCare</span>
      </Link>

      <DisplayNavList setShowLogoutModal={setShowLogoutModal} />

      <ShowLogoutModal
        showLogoutModal={showLogoutModal}
        setShowLogoutModal={setShowLogoutModal}
      />
    </div>
  );
};

export default SideNav;
