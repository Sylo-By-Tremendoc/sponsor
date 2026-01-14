import Typography from "@/components/common/Typography";
import { getSubNavList } from "./components/SubNavList";
import { cn } from "@/utils/class-name";
import { useSearchParams } from "react-router-dom";
import SecuritySettings from "./security";
import NotificationSettings from "./notification";
import { useEffect } from "react";
import Container from "@/components/common/Container";

const Settings = () => {
  const subNavList = getSubNavList();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = searchParams.get("tab") || "security";

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  useEffect(() => {
    const element = document.getElementById("myContainerId");
    if (element) {
      element.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [searchParams, activeTab]);

  return (
    <Container className="space-y-4 h-full">
      <Typography variant="largeTextBold">Account Security Settings</Typography>

      <div className="flex flex-col md:flex-row bg-white rounded-2xl h-[96%] overflow-hidden">
        {/* Tabs */}
        <nav className="overflow-y-auto py- md:w-52">
          <ul className="flex flex-row md:flex-col md:py-4 gap-1 border-b md:border-none">
            {subNavList
              .filter((item) => item.canView)
              .map((item) => {
                const isActive = activeTab === item.tab;

                return (
                  <button
                    key={item.title}
                    onClick={() => handleTabChange(item.tab)}
                    className={cn(
                      "group flex items-center gap-2 px-5 py-3 transition-all duration-300 ease-out transform w-full text-left",
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
                      variant="xSmallText"
                      className={cn(
                        "text-gray-700 group-hover:text-primary group-hover:translate-x-2.5 font-medium transition-transform duration-300",
                        isActive && "translate-x-2.5 group-hover:text-gray-700"
                      )}
                    >
                      {item.title}
                    </Typography>
                  </button>
                );
              })}
          </ul>
        </nav>

        {/* Content area */}
        <div
          id="myContainerId"
          className="flex-1 border-l border-mid-grey p-4 overflow-y-auto"
        >
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "notification" && <NotificationSettings />}
        </div>
      </div>
    </Container>
  );
};

export default Settings;
