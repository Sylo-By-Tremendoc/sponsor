import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../common/DropdownMenu";
import { BsEye } from "react-icons/bs";
import { HiOutlineLogout } from "react-icons/hi";
import Typography from "../../common/Typography";

const UserDropdown = ({
  children,
  sameWidthAsTrigger,
  handleLogOut,
}: {
  children: React.ReactNode;
  sameWidthAsTrigger?: boolean;
  handleLogOut?: () => void;
}) => {
  const isPending = false;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        wrapperClassName=" rounded-2xl min-w-[150px]"
        className=" rounded-[14px] p-0 bg-white shadow-md overflow-hidden"
        sameWidthAsTrigger={sameWidthAsTrigger}
        align="end"
      >
        <DropdownMenuItem asChild>
          <Link
            to={"/profile"}
            className=" flex items-center space-x-2 text-xs hover:bg-light-grey  py-2 px-3"
          >
            <BsEye size={18} />
            <Typography variant={"xSmallText"}>View Profile</Typography>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center space-x-2 text-danger text-xs hover:text-red-600 hover:bg-red-50 rounded-none py-2 px-3"
          onClick={handleLogOut}
        >
          <HiOutlineLogout size={18} />
          <Typography variant={"xSmallText"}>
            {isPending ? "Logging out..." : "Logout"}
          </Typography>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
