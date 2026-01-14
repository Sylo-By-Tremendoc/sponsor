import { useEffect, useState } from "react";
import SkeletonLoader from "../../common/SkeletonLoader";
import SponsorDropdown from "./SponsorLocationDropdown";
import { getInitials } from "../../../utils/get-initials";
import { Link } from "react-router-dom";
import { BiLogIn } from "react-icons/bi";
import { buttonVariants } from "../../common/Button";
import { cn } from "../../../utils/class-name";
import Typography from "../../common/Typography";
import UserDropdown from "./UserDropdown";
import { useSponsorLocationStore } from "@/store/sponsor-location-store";
import useAuth from "@/hooks/use-auth";
import { useCurrencyStore } from "@/store/currency-store";
import CurrencyDropdown from "./CurrencyDropdown";
import { ShowLogoutModal } from "@/components/side-nav/components/navList";

const RightSection = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <div className="hidden xl:flex items-center gap-4">
      <DisplayCurrencyDropdown />
      <DisplaySponsorLocationDropdown />
      <DisplayUserDropdown handleLogOut={() => setShowLogoutModal(true)} />

      <ShowLogoutModal
        showLogoutModal={showLogoutModal}
        setShowLogoutModal={setShowLogoutModal}
      />
    </div>
  );
};

export default RightSection;

const DisplayUserDropdown = ({
  handleLogOut,
}: {
  handleLogOut?: () => void;
}) => {
  const { authUser } = useAuth();
  const showProfileLoader = false;

  if (authUser?.user) {
    return (
      <UserDropdown handleLogOut={handleLogOut}>
        <button className="outline-none border-none bg-transparent w-fit shrink-0 block">
          {authUser?.user?.profilePicture && (
            <img
              src={authUser?.user?.profilePicture}
              alt={authUser?.user?.first_name}
              className="rounded-full size-9 shrink-0 object-cover object-center"
            />
          )}

          {!authUser?.user?.profilePicture && (
            <div className="rounded-full bg-primary text-white  uppercase font-bold size-9 shrink-0 flex items-center justify-center cursor-pointer">
              {getInitials(
                authUser?.user?.first_name,
                authUser?.user?.last_name
              )}
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
      className={cn(
        buttonVariants({ variant: "filled" }),
        "px-4 py-1 h-8 text-xs text-white"
      )}
    >
      <BiLogIn size={18} />
      Login
    </Link>
  );
};

export const DisplayCurrencyDropdown = () => {
  const [isMounted, setIsMounted] = useState(false);
  const currency = useCurrencyStore((state) => state.currency);
  const changeCurrency = useCurrencyStore((state) => state.changeCurrency);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted)
    return <SkeletonLoader className="h-[40px] w-[120px] rounded-full" />;

  return (
    <CurrencyDropdown
      selectedCurrency={currency}
      changeCurrency={changeCurrency}
    >
      <button className="outline-none">
        <Typography variant={"smallText"} className="">
          {currency?.id}
        </Typography>
      </button>
    </CurrencyDropdown>
  );
};

export const DisplaySponsorLocationDropdown = () => {
  const [isMounted, setIsMounted] = useState(false);
  const sponsor = useSponsorLocationStore((state) => state.sponsor);
  const changeSponsor = useSponsorLocationStore((state) => state.changeSponsor);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted)
    return <SkeletonLoader className="h-[35px] w-[120px] rounded-full" />;

  return (
    <SponsorDropdown selectedSponsor={sponsor} changeSponsor={changeSponsor}>
      <button className="outline-none">
        <img
          src={sponsor?.flag}
          alt={sponsor?.label}
          className="w-7 h-7 rounded-full border border-gray-200 shadow-sm"
        />
      </button>
    </SponsorDropdown>
  );
};
