import Icons from "@/components/common/Icons";

export const getSubNavList = () => {
  const navList = [
    {
      title: "Security",
      tab: "security",
      icon: (isActive: boolean) => (
        <Icons iconName="lock" fill={isActive ? "#03eb0b" : "white"} />
      ),
      canView: true,
    },
    {
      title: "Notification",
      tab: "notification",
      icon: (isActive: boolean) => (
        <Icons iconName="notificationSettings" fill={isActive ? "#03eb0b" : "white"} />
      ),
      canView: true,
    },
  ];

  return navList || [];
};
