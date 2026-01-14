import { Link } from "react-router-dom";
import Typography from "../common/Typography";
import Icons from "../common/Icons";
import DisplayNavList from "./components/DisplayNavList";
import { ShowLogoutModal } from "./components/navList";
import { useState } from "react";

const SideNav = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  return (
    <div className="hidden md:flex flex-col justify-between bg-white w-52 h-screen overflow-hidden">
      <Link to="/" className="flex items-center mx-2 my-5">
        <Icons iconName="logo" width={80} height={50} />
        <Typography variant={"xSmallText"} className="pt-">
          By Tremendoc
        </Typography>
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
