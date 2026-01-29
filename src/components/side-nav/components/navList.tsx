import useAuth from "@/hooks/use-auth";
import { Button } from "../../common/Button";
import Icons from "../../common/Icons";
import CustomDialog, { DialogFooter } from "../../common/modals/Dialog";
import { useNavigate } from "react-router-dom";

export const getTopNavList = () => {
  const navList = [
    {
      title: "Notifications",
      path: "/notifications",
      icon: (isActive: boolean) => (
        <Icons iconName="notifications" fill={isActive ? "#03eb0b" : "white"} />
      ),
      canView: true,
    },
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: (isActive: boolean) => (
        <Icons iconName="dashboard" fill={isActive ? "#03eb0b" : "white"} />
      ),
      canView: true,
    },
    {
      title: "Beneficiaries",
      path: "/beneficiaries",
      icon: (isActive: boolean) => (
        <Icons iconName="beneficiaries" fill={isActive ? "#03eb0b" : "white"} />
      ),
      canView: true,
    },
    {
      title: "Plans",
      path: "/package-plans",
      icon: (isActive: boolean) => (
        <Icons iconName="packages" fill={isActive ? "#03eb0b" : "white"} />
      ),
      canView: true,
    },
    // {
    //   title: "Messages",
    //   path: "/messages",
    //   icon: (isActive: boolean) => (
    //     <Icons iconName="messages" fill={isActive ? "#03eb0b" : "white"} />
    //   ),
    //   canView: true,
    // },
  ];

  return navList || [];
};

export const getBottomNavList = () => {
  const navList = [
    {
      title: "Support",
      path: "/support",
      icon: (isActive: boolean) => (
        <Icons iconName="support" fill={isActive ? "#03eb0b" : "white"} />
      ),
      canView: true,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: (isActive: boolean) => (
        <Icons iconName="settings" fill={isActive ? "#03eb0b" : "white"} />
      ),
      canView: true,
    },
    {
      title: "Log Out",
      path: "/log-out",
      icon: () => <Icons iconName="logOut" fill={"white"} />,
      canView: true,
    },
  ];

  return navList || [];
};

export const ShowLogoutModal = ({
  showLogoutModal,
  setShowLogoutModal,
}: {
  showLogoutModal: boolean;
  setShowLogoutModal: (val: boolean) => void;
}) => {
  const { setAuthUser } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthUser(null);
    localStorage.clear();
    navigate("/");
    setShowLogoutModal(false);
  };

  return (
    <CustomDialog
      title={"Log out"}
      description="Are you sure you want to log out? You will need to log in again to continue."
      openModal={showLogoutModal}
      onClose={() => setShowLogoutModal(false)}
      className="md:w-100"
    >
      <DialogFooter className="pt-5">
        <Button
          variant={"outline"}
          className="w-full"
          onClick={() => setShowLogoutModal(false)}
          aria-label="Cancel logout"
        >
          Cancel
        </Button>

        <Button
          className="bg-danger text-white w-full"
          onClick={handleLogout}
          aria-label="Confirm logout"
        >
          Log out
        </Button>
      </DialogFooter>
    </CustomDialog>
  );
};
