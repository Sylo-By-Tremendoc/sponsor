import { Button } from "../common/Button";
import Icons from "../common/Icons";
import CustomDialog, { DialogFooter } from "../common/modals/Dialog";

export const getTopNavList = () => {
  const navList = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: (isActive: boolean) => (
        <Icons iconName="dashboard" fill={isActive ? "#335F32" : "white"} />
      ),
      canView: true,
    },
    {
      title: "Beneficiaries",
      path: "/beneficiaries",
      icon: (isActive: boolean) => (
        <Icons iconName="beneficiaries" fill={isActive ? "#335F32" : "white"} />
      ),
      canView: true,
    },
    {
      title: "Package/Plans",
      path: "/package-plans",
      icon: (isActive: boolean) => (
        <Icons iconName="packages" fill={isActive ? "#335F32" : "white"} />
      ),
      canView: true,
    },
    {
      title: "Notifications",
      path: "/notifications",
      icon: (isActive: boolean) => (
        <Icons iconName="notifications" fill={isActive ? "#335F32" : "white"} />
      ),
      canView: true,
    },
  ];

  return navList || [];
};

export const getBottomNavList = () => {
  const navList = [
    {
      title: "Support",
      path: "/support",
      icon: (isActive: boolean) => (
        <Icons iconName="support" fill={isActive ? "#335F32" : "white"} />
      ),
      canView: true,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: (isActive: boolean) => (
        <Icons iconName="settings" fill={isActive ? "#335F32" : "white"} />
      ),
      canView: true,
    },
    {
      title: "Log Out",
      path: "/log-out",
      icon: (isActive: boolean) => (
        <Icons iconName="logOut" fill={isActive ? "#335F32" : "white"} />
      ),
      canView: true,
    },
  ];

  return navList || [];
};

export const ShowLogoutModal = ({
  showLogoutModal,
  setShowLogoutModal,
  handleLogOut,
}: {
  showLogoutModal: boolean;
  setShowLogoutModal: (val: boolean) => void;
  handleLogOut: () => void;
}) => {
  return (
    <CustomDialog
      title={"Log out"}
      description="Are you sure you want to log out? You will need to sign in again to continue."
      openModal={showLogoutModal}
      onClose={() => setShowLogoutModal(false)}
      className="w-100"
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
          onClick={() => {
            handleLogOut();
            setShowLogoutModal(false);
          }}
          aria-label="Confirm logout"
        >
          Log out
        </Button>
      </DialogFooter>
    </CustomDialog>
  );
};
