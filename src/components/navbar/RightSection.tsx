import { useEffect, useState } from "react";
import SkeletonLoader from "../common/SkeletonLoader";
import SponsorDropdown from "./SponsorDropdown";
import { HiChevronDown } from "react-icons/hi";
import { getInitials } from "../../utils/get-initials";
import { Link } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import { buttonVariants } from "../common/Button";
import { cn } from "../../utils/class-name";
import Typography from "../common/Typography";
import UserDropdown from "./UserDropdown";
import { useSponsorStore } from "@/store/sponsor-store";
import useAuth from "@/hooks/use-auth";

const RightSection = () => {
  return (
    <div className="hidden xl:flex items-center gap-6">
      <DisplaySponsorDropdown />
      <DisplayUserDropdown />
    </div>
  );
};

export default RightSection;

const DisplaySponsorDropdown = () => {
  const [isMounted, setIsMounted] = useState(false);
  const sponsor = useSponsorStore((state) => state.sponsor);
  const changeSponsor = useSponsorStore((state) => state.changeSponsor);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted)
    return <SkeletonLoader className="h-[35px] w-[120px] rounded-full" />;

  return (
    <SponsorDropdown selectedSponsor={sponsor} changeSponsor={changeSponsor}>
      <button
        className="
          flex items-center justify-between
          gap-2 h-8 w-[110px]
          rounded-full border border-gray-300
          bg-white hover:bg-gray-50
          px-3 text-sm font-medium text-gray-800
          transition-colors
        "
      >
        <span className="flex items-center gap-2">
          <img
            src={sponsor?.flag}
            alt={sponsor?.label}
            className="w-5 h-5 rounded-sm border border-gray-200 shadow-sm"
          />
          <Typography variant={"xSmallText"} className="truncate">
            {sponsor?.id}
          </Typography>
        </span>

        <HiChevronDown
          size={14}
          className="text-gray-700 transition-transform duration-300 group-data-[state=open]:rotate-180"
        />
      </button>
    </SponsorDropdown>
  );
};

const DisplayUserDropdown = () => {
  const { authUser } = useAuth();
  const showProfileLoader = false;

  if (authUser?.user) {
    return (
      <UserDropdown>
        <button className="outline-none border-none bg-transparent w-fit shrink-0 block">
          {authUser?.user?.profilePicture && (
            <img
              src={authUser?.user?.profilePicture}
              alt={authUser?.user?.name}
              className="rounded-full size-9 shrink-0 object-cover object-center"
            />
          )}

          {!authUser?.user?.profilePicture && (
            <div className="rounded-full bg-primary text-white text-body-sm uppercase font-bold size-9 shrink-0 flex items-center justify-center cursor-pointer">
              {getInitials(authUser?.user?.name ?? "")}
            </div>
          )}
        </button>
      </UserDropdown>
    );
  }

  return showProfileLoader ? (
    <SkeletonLoader className="size-9 shrink-0 rounded-full" />
  ) : (
    <Link
      to={"/account/login"}
      className={cn(buttonVariants({ variant: "filled" }), "text-white")}
    >
      <BiLogIn size={18} />
      Login
    </Link>
  );
};
