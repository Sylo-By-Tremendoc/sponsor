import { Outlet } from "react-router-dom";
import SideNav from "../../components/side-nav";
import TopNav from "../../components/top-nav";
import { Wrapper } from "@/components/common/Wrapper";
const PrivateLayout = () => {
  return (
    <div className="flex overflow-hidden relative">
      <SideNav />

      <div className="flex-1 flex flex-col gap-3 overflow-hidden px-4 md:px-6 pt-3 bg-[#F7F7F7] h-screen">
        <TopNav />
        <Wrapper className="flex-1 w-full h-full overflow-auto relative pt-2 pb-10">
          <Outlet />
        </Wrapper>
      </div>
    </div>
  );
};

export default PrivateLayout;
