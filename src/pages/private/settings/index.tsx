import Typography from "@/components/common/Typography";
import { getSubNavList } from "./components/SubNavList";
import { cn } from "@/utils/class-name";
import { useSearchParams } from "react-router-dom";
import SecuritySettings from "./security";
import NotificationSettings from "./notification";
import { useEffect } from "react";

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
    <div className="space-y-4 h-full">
      <Typography variant="largeTextBold">Account Security Settings</Typography>

      <div className="flex bg-white rounded-2xl h-[96%]">
        {/* Tabs */}
        <nav className="overflow-y-auto py-1 w-60">
          <ul className="flex flex-col py-4 space-y-1">
            {subNavList
              .filter((item) => item.canView)
              .map((item) => {
                const isActive = activeTab === item.tab;

                return (
                  <li key={item.title}>
                    <button
                      onClick={() => handleTabChange(item.tab)}
                      className={cn(
                        "group flex items-center gap-3 px-5 py-3 transition-all duration-300 ease-out transform w-full text-left",
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
                          isActive &&
                            "translate-x-2.5 group-hover:text-gray-700"
                        )}
                      >
                        {item.title}
                      </Typography>
                    </button>
                  </li>
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
    </div>
  );
};

export default Settings;
