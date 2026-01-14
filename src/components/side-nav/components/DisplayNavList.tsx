import Typography from "@/components/common/Typography";
import { checkActive } from "@/utils/check-active-route";
import { cn } from "@/utils/class-name";
import { NavLink, useLocation } from "react-router-dom";
import { getBottomNavList, getTopNavList } from "./navList";

const DisplayNavList = ({
  isMobile,
  onNavClick,
  setShowLogoutModal,
}: {
  isMobile?: boolean;
  onNavClick?: () => void;
  setShowLogoutModal: (val: boolean) => void;
}) => {
  const location = useLocation();
  const topNavList = getTopNavList();
  const bottomNavList = getBottomNavList();

  return (
    <div className="flex-1 flex flex-col justify-between gap-10 overflow-y-auto pt-">
      <nav>
        <ul className="flex flex-col py-4 space-y-1">
          {topNavList
            .filter((item) => item.canView)
            .map((item) => {
              const isActive = checkActive(location.pathname, item.path);
              return (
                <li key={item.title}>
                  <NavLink
                    to={item.path}
                    onClick={() => {
                      if (isMobile) setTimeout(() => onNavClick?.(), 100);
                    }}
                    className={cn(
                      "group flex items-center gap-2 px-4 py-3 transition-all duration-300 ease-out transform",
                      isActive
                        ? "bg-primary font-semibold shadow-sm"
                        : "text-gray-600"
                    )}
                  >
                    <div
                      className={cn(
                        "transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-2.5",
                        isActive && "translate-x-2"
                      )}
                    >
                      {item.icon(isActive)}
                    </div>

                    <Typography
                      variant="xSmallText"
                      className={cn(
                        "text-gray-700 group-hover:text-primary group-hover:translate-x-2.5 font-medium transition-transform duration-300",
                        isActive && "translate-x-2 group-hover:text-gray-700"
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
                      onClick={() => {
                        setShowLogoutModal(true);
                        if (isMobile) setTimeout(() => onNavClick?.(), 100);
                      }}
                      className={cn(
                        "group flex items-center gap-2 px-4 py-3 transition-all duration-300 ease-out transform text-danger hover:text-red-600 hover:bg-red-50 w-full cursor-pointer"
                      )}
                    >
                      <div className="transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-2.5">
                        {item.icon(false)}
                      </div>
                      <Typography
                        variant="xSmallText"
                        className="font-medium transition-transform duration-300 group-hover:translate-x-2.5"
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
                    onClick={() => {
                      if (isMobile) setTimeout(() => onNavClick?.(), 100);
                    }}
                    className={cn(
                      "group flex items-center gap-2 px-4 py-3 transition-all duration-300 ease-out transform",
                      isActive
                        ? "bg-primary font-semibold shadow-sm"
                        : "text-gray-600"
                    )}
                  >
                    <div
                      className={cn(
                        "transition-transform duration-300 group-hover:scale-110 group-hover:translate-x-2.5",
                        isActive && "translate-x-2"
                      )}
                    >
                      {item.icon(isActive)}
                    </div>

                    <Typography
                      variant="xSmallText"
                      className={cn(
                        "text-gray-700 group-hover:text-primary group-hover:translate-x-2.5 font-medium transition-transform duration-300",
                        isActive && "translate-x-2 group-hover:text-gray-700"
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
    </div>
  );
};

export default DisplayNavList;
