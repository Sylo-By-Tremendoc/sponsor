import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import logoImg from "../../assets/images/logo.png";
import { cn } from "../../utils/class-name";
import Typography from "../common/Typography";
import { getBottomNavList, getTopNavList, ShowLogoutModal } from "./navList";
import { checkActive } from "../../utils/check-active-route";
import { useState } from "react";

const SideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const topNavList = getTopNavList();
  const bottomNavList = getBottomNavList();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <div className="hidden md:flex flex-col justify-between gap-2 bg-white w-52 h-full min-h-screen overflow-x-hidden overflow-y-scroll">
      <Link to="/" className="px-5">
        <img src={logoImg} alt="Logo" />
      </Link>

      <nav className="flex-1 overflow-y-auto">
        <ul className="flex flex-col py-4 space-y-1">
          {topNavList
            .filter((item) => item.canView)
            .map((item) => {
              const isActive = checkActive(location.pathname, item.path);
              return (
                <li key={item.title}>
                  <NavLink
                    to={item.path}
                    className={cn(
                      "group flex items-center gap-3 px-5 py-3 transition-all duration-300 ease-out transform",
                      isActive
                        ? "bg-primary font-semibold shadow-sm"
                        : "text-gray-600"
                    )}
                  >
                    <div
                      className={cn(
                        "transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-2.5",
                        isActive && "translate-x-2.5"
                      )}
                    >
                      {item.icon(isActive)}
                    </div>

                    <Typography
                      variant="smallText"
                      className={cn(
                        "text-sm text-gray-700 group-hover:text-primary group-hover:translate-x-2.5 font-medium transition-transform duration-300",
                        isActive && "translate-x-2.5 group-hover:text-gray-700"
                      )}
                    >
                      {item.title}
                    </Typography>
                  </NavLink>
                </li>
              );
            })}
        </ul>
      </nav>

      <nav>
        <ul className="flex flex-col space-y-1">
          {bottomNavList
            .filter((item) => item.canView)
            .map((item) => {
              const isActive = checkActive(location.pathname, item.path);

              // Handle logout separately
              if (item.title === "Log Out") {
                return (
                  <li key={item.title}>
                    <button
                      onClick={() => setShowLogoutModal(true)}
                      className={cn(
                        "group flex items-center gap-3 px-5 py-3 transition-all duration-300 ease-out transform text-danger hover:text-red-600 hover:bg-red-50 w-full cursor-pointer"
                      )}
                    >
                      <div className="transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-2.5">
                        {item.icon(false)}
                      </div>
                      <Typography
                        variant="smallText"
                        className="text-sm font-medium transition-transform duration-300 group-hover:translate-x-2.5"
                      >
                        {item.title}
                      </Typography>
                    </button>
                  </li>
                );
              }

              // Default link items
              return (
                <li key={item.title}>
                  <NavLink
                    to={item.path}
                    className={cn(
                      "group flex items-center gap-3 px-5 py-3 transition-all duration-300 ease-out transform",
                      isActive
                        ? "bg-primary font-semibold shadow-sm"
                        : "text-gray-600"
                    )}
                  >
                    <div
                      className={cn(
                        "transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-2.5",
                        isActive && "translate-x-2.5"
                      )}
                    >
                      {item.icon(isActive)}
                    </div>

                    <Typography
                      variant="smallText"
                      className={cn(
                        "text-sm text-gray-700 group-hover:text-primary group-hover:translate-x-2.5 font-medium transition-transform duration-300",
                        isActive && "translate-x-2.5 group-hover:text-gray-700"
                      )}
                    >
                      {item.title}
                    </Typography>
                  </NavLink>
                </li>
              );
            })}
        </ul>
      </nav>

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

export default SideNav;
