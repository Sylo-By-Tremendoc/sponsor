import Typography from "@/components/common/Typography";
import SectionBlock from "./components/SectionBlock";
import NotificationItem from "./components/NotificationItem";
import { Button } from "@/components/common/Button";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { useEffect, useRef } from "react";

const NotificationSettings = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  return (
    <div ref={containerRef} className="space-y-4">
      <div className="border-b border-mid-grey pb-3">
        <Typography variant="largeTextBold">Notification Settings</Typography>
        <Typography variant={"smallText"} className="text-charcoal-gray mt-1">
          We may still send you important notifications about your accounts
          outside your notification settings.
        </Typography>
      </div>

      {/* EMAIL NOTIFICATIONS */}
      <SectionBlock
        title="Email Notifications"
        description="Get emails to find out what is going on when you are not online. You can turn these off."
      >
        <div className="space-y-4">
          <NotificationItem
            label="News and updates"
            description="News about product and features update."
          />

          <NotificationItem
            label="Tips and tutorials"
            description="Tips on getting more out of Tremendoc."
          />

          <NotificationItem
            label="User research"
            description="Get involved in testing program or participate in paid product user research."
          />

          <NotificationItem
            label="Reminders"
            description="These are notifications to remind you of updates you might have missed"
            defaultOn={false}
          />
        </div>
      </SectionBlock>

      {/* PUSH NOTIFICATIONS */}
      <SectionBlock
        title="Push Notifications"
        description="Get push notifications in-app to find out what's going on when you're online"
        className="border-none"
      >
        <div className="space-y-4">
          <NotificationItem
            label="Reminders"
            description="These are notifications to remind you of updates you might have missed"
            defaultOn={false}
          />

          <NotificationItem
            label="More activities about you"
            description="These are notifications you get when any user messaged you, and more."
          />
        </div>
      </SectionBlock>

      {/* ADVANCE FILTERS */}
      <div className="border border-mid-grey rounded-2xl p-4 bg-white mt-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 w-full">
          <div className="flex items-center gap-2">
            <HiOutlineViewGridAdd size={20} />
            <div>
              <Typography variant="mediumTextBold">Advance Filters</Typography>
              <Typography variant={"smallText"} className="text-charcoal-gray">
                Fine-tune the notifications you like to see – and those you
                don’t.
              </Typography>
            </div>
          </div>

          <Button variant={"outline"} size={"small"}>
            Set up filter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
