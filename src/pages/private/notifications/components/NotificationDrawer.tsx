import { Drawer, DrawerContent } from "@/components/common/modals/Drawer";
import type { NotificationParams } from "..";
import Typography from "@/components/common/Typography";
import { HiChevronLeft } from "react-icons/hi";

const NotificationDrawer = ({
  isOpen,
  setIsOpen,
  selectedNotification,
}: {
  selectedNotification: NotificationParams;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) => {
  if (!selectedNotification) return null;

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent
        side="right"
        className="rounded-t-none w-screen max-w-md h-screen"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {/* Header */}
        <div className="flex items-center gap-3 py-5 px-4 border-b border-mid-grey">
          <button
            className="md:hidden p-1 border border-mid-grey rounded-lg"
            onClick={() => setIsOpen(false)}
          >
            <HiChevronLeft size={24} />
          </button>
          <Typography variant="largeTextBold">Notification</Typography>
        </div>

        <div className="p-6 flex flex-col gap-4">
          <Typography variant="smallText" className="text-gray-500">
            {selectedNotification.time}
          </Typography>

          <Typography variant="mediumText" className="text-gray-800">
            {selectedNotification.notification}
          </Typography>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default NotificationDrawer;
