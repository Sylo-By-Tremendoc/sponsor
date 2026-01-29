import Icons from "@/components/common/Icons";
import { Drawer, DrawerContent } from "@/components/common/modals/Drawer";
import { Link } from "react-router-dom";
import DisplayNavList from "../components/DisplayNavList";

const MobileSideNav = ({
  isOpen,
  setIsOpen,
  setShowLogoutModal,
}: {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  setShowLogoutModal: (val: boolean) => void;
}) => {
  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent
        side="right"
        className="rounded-t-none"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <div className="py-5 h-full bg-white flex flex-col">
          <Link
            to="/"
            className="relative z-10  inline-flex w-fit items-center gap-2 cursor-pointer px-3"
          >
            <Icons iconName="logo" />
            <span className="text-sm font-semibold">SyloCare</span>
          </Link>

          <DisplayNavList
            isMobile={true}
            onNavClick={() => setIsOpen(false)}
            setShowLogoutModal={setShowLogoutModal}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileSideNav;
