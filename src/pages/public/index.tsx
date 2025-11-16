import { Wrapper } from "@/components/common/Wrapper";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <Wrapper>
      <Outlet />
    </Wrapper>
  );
};

export default PublicLayout;
