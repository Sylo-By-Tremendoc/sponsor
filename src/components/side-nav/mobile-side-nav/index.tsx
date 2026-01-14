import Icons from "@/components/common/Icons";
import { Drawer, DrawerContent } from "@/components/common/modals/Drawer";
import Typography from "@/components/common/Typography";
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
          <Link to="/" className="flex items-center px-2 pb-5">
            <Icons iconName="logo" width={80} height={30} />
            <Typography variant={"xSmallText"} className="pt-">
              By Tremendoc
            </Typography>
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
